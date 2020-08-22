var express = require('express');
var router = express.Router();

//Import Controllers Here
const UsuarioController = require('./controller/UsuarioController');
const CampeaoController = require('./controller/CampeaoController');

router.get('/', function (req, res) {
   res.render('Summoner/home');
})

router.get('/champion/data', async function (req, res) {
   return res.json(await CampeaoController.store());
})

router.post('/invocador/status', async function (req, res) {
   const user = await UsuarioController.store({ nomeInvocador: req.body.fname});
   // Buscar Partidas
   // Buscar Imagens
   // Buscar Campeoes
   // Redirecionar Tela Dashboard
   return res.json(user);   
})

module.exports = router;