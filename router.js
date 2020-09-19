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
   const Swal = require('sweetalert2');

   const user = await UsuarioController.store({ nomeInvocador: req.body.fname });
   let localizado = false;;
   let alertTitle = "Oops!";
   let alertMessage = "Usuário não encontrado, favor buscar novamente";

   if(user) {
      localizado = true;
      alertTitle = "Yeei!";
      alertMessage = "Usuário encontrado, Deseja prosseguir?";
   }

   /*res.redirect(url.format({
       pathname:"/",
       query: {
          "a": 1,
          "b": 2,
          "valid":"your string here"
        }
     }));*/

   res.render('Summoner/home', {localizado, alertTitle, alertMessage, Swal})
})

module.exports = router;