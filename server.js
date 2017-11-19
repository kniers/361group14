var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

//Create a new pool
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs340_kniers',
  password: '7685',
  database: 'cs340_kniers'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3147);

//Render home.handlebars when the user visits the page
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
/* ----------------------------------------------------------------------------------
SELECT FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This allows the user to login if the passed username and password are correct
app.get('/login', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.query.username, req.query.password] ,function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);	
		res.send(context.results); 
	});
});

/* ----------------------------------------------------------------------------------
INSERT FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This creates a new user in the users table. Rating is defaulted to 10, GPS is defaulted to false, and driver is defaulted to false
app.get('/add-user', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO users (`username`, `password`, `rating`, `GPS`, `driver`) VALUES (?, ?, 10, false, false)", [req.query.username, req.query.password], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "User Created";
		res.send(context.results);  
	});
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
