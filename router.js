var express = require('express');
var router = express.Router();
const url = require('url');

//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');
const PartidaController = require('./controller/PartidaController');

router.get('/', function (req, res) {
   let localizado = req.query.localizado;
   let id =  req.query.id;
   let alertTitle = "";
   let alertMessage = "";

   if(localizado == 'true') {
      localizado = true;
      alertTitle = "Yeei!";
      alertMessage = "Usuário encontrado, Deseja prosseguir?";
   }
   else if (localizado == 'false'){
      localizado = false;
      alertTitle = "Erro !";
      alertMessage = "Usuário não encontrado,Tente Novamente";
   }

   res.render('Summoner/home', {localizado, alertTitle, alertMessage, id});
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado = (user) ? true : false ;
   let id = (user) ? user.id : 0;

   res.redirect(url.format({
       pathname:"/",
       query: { localizado, id }
     }));

})

router.get('/invocador/data/:id', async function (req,res) {
   const id = req.params.id;
   const user = await UsuarioController.getUser(id);
   const Partidas = await PartidaController.store(user);

   
   res.render('Dashboard/dashboard', {Partidas});
})

module.exports = router;