var express = require('express');
var router = express.Router();

// HomePage
router.get('/home', function (req, res) {
   res.render('Dashboard/dashboard');
})

router.get('/', function (req, res) {
   res.render('SearchChampion/home');
})

router.post('/invocador/status', function (req, res) {
   console.log(req.body.fname);
})

module.exports = router;