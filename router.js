var express = require('express');
var router = express.Router();
const url = require('url');

//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');

router.get('/', function (req, res) {
   let localizado = req.query.localizado;
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

   res.render('Summoner/home', {localizado, alertTitle, alertMessage});
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado = (user) ? true : false ;

   res.redirect(url.format({
       pathname:"/",
       query: { localizado }
     }));

})

module.exports = router;