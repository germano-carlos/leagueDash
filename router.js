var express = require('express');
var router = express.Router();

//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');

router.get('/', function (req, res) {
   res.render('Summoner/home', {localizado: undefined, alertTitle: "Oops!", alertMessage: "Something went wrong!"})
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado;
   let alertTitle;
   let alertMessage;

   if(user) {
      localizado = true;
      alertTitle = "Yeei!";
      alertMessage = "Usuário encontrado, você será redirecionado";
   }
   else {
      localizado = false;
      alertTitle = "Oops!";
      alertMessage = "Usuário não encontrado, favor buscar novamente";
   }

   res.render('Summoner/home', {localizado, alertTitle, alertMessage})
})

module.exports = router;