var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var bCrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var router = require('./router.js');

// Access public folder from root
app.use('/public', express.static(__dirname + '/public'));
app.get('/layouts/', function(req, res) {
  res.render('view');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Add Route file with app
app.use('/', router); 

http.listen(process.env.PORT || 5000, function() {
  console.log('listening on *:5000');
});
