var express = require('express');
var router = express.Router();

// HomePage
router.get('/', function (req, res) {
   res.render('Dashboard/dashboard');
})

module.exports = router;