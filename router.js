var express = require('express');
var router = express.Router();
const url = require('url');
const HandyStorage = require('handy-storage');

const storage = new HandyStorage({
   beautify: true
});

storage.connect('./information.json');
//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');
const PartidaController = require('./controller/PartidaController');

router.get('/', function (req, res) {

   let localizado = req.query.localizado;
   let id = req.query.id;
   let alertTitle = "";
   let alertMessage = "";

   if (localizado == 'true') {
      localizado = true;
      alertTitle = "Yeei!";
      alertMessage = "Usuário encontrado, Deseja prosseguir?";

      storage.setState({
         searched: true,
         id
      })

   }
   else if (localizado == 'false') {
      localizado = false;
      alertTitle = "Erro !";
      alertMessage = "Usuário não encontrado,Tente Novamente";
      storage.setState({
         searched: false,
         id: null
      })
   }

   res.render('Summoner/home', { localizado, alertTitle, alertMessage, id });
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado = (user) ? true : false;
   let id = (user) ? user.id : 0;

   res.redirect(url.format({
      pathname: "/",
      query: { localizado, id }
   }));

})

router.get('/invocador/data/:id', async function (req, res) {
   const id = req.params.id;
   const user = await UsuarioController.getUser(id);
   const Partidas = await PartidaController.store(user);

   res.render('Dashboard/dashboard', { Partidas });
})

router.get('/partida/data/:id', async function (req, res) {
   const Players = await PartidaController.Detalhes(req.params.id);
   return res.json(Players);
})

router.get('/champion/analise', async function (req, res) {
   const sessionData = {
      connected: storage.state.searched,
      id: storage.state.id ? storage.state.id : null,
   };

   const Campeoes = await CampeaoController.getAll();
   let Usuario = await UsuarioController.getUserByParametros(sessionData.id);
   const UserDetails = (typeof Usuario != 'undefined') ? await UsuarioController.getUserDetails(Usuario.id) : false;

  if(UserDetails) {
      Usuario.detalhes = UserDetails;
  }
  else {
      Usuario = {};
      Usuario.detalhes = {};
  }

   res.render('Champion/analytics', { Campeoes, sessionData, Usuario});
})

router.get('/campeao/by_id/:key', async function (req, res) {
   const Campeao = await CampeaoController.getChampionById(req.params.key);
   const Details = await CampeaoController.getRiotById(Campeao.id);

   if (Details) {
      Campeao.blurb = Object.values(Details)[0].lore;
      Campeao.dataValues.skins = Object.values(Details)[0].skins;
   }

   return res.json(Campeao);
})

module.exports = router;