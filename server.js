var express = require('express');

var app = express();
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({extended: false }));
app.use(session({secret:'mySecretPassword'}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7364);
app.use(express.static('public'));

app.get('/',function(req,res){
	res.render('home');
});

app.get('/signup/',function(req,res){
	res.render('signup');
});

app.get('/signin/',function(req,res){
	res.render('signin');
});

app.get('/profile/', function(req,res){
	res.render('profile');
});


app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
