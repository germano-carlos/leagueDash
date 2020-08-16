var express = require('express');
var router = express.Router();

//Import Controllers Here
const Usuario  = require('./controller/UsuarioController');
const UsuarioController = require('./controller/UsuarioController');

router.get('/', function (req, res) {
   res.render('SearchChampion/home');
})

router.post('/invocador/status', function (req, res) {
   UsuarioController.store(teste);
})

router.get('/getInvocador', function(req, res){
   UsuarioController.getData();
})

module.exports = router;