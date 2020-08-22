var express = require('express');
var router = express.Router();

//Import Controllers Here
const Usuario  = require('./controller/UsuarioController');
const UsuarioController = require('./controller/UsuarioController');

router.get('/', function (req, res) {
   res.render('SearchChampion/home');
})

router.post('/invocador/status', async function (req, res) {
   const user = await UsuarioController.store({ nomeInvocador: req.body.fname});
   res.render('SearchChampion/home');
   
})

router.get('/getInvocador', function(req, res){
   UsuarioController.getData();
})

module.exports = router;