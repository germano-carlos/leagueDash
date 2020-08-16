var express = require('express');
var router = express.Router();

//Import Controllers Here
const Usuario  = require('./controller/UsuarioController');

router.get('/', function (req, res) {
   res.render('SearchChampion/home');
})

router.post('/invocador/status', function (req, res) {
  
})

module.exports = router;