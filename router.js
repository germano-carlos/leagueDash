var express = require('express');
var router = express.Router();
const url = require('url');

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
   }
   else if (localizado == 'false') {
      localizado = false;
      alertTitle = "Erro !";
      alertMessage = "Usuário não encontrado,Tente Novamente";
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

   const Campeoes = await CampeaoController.getAll();

   res.render('Champion/analytics', { Campeoes });
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