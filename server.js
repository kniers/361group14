var express = require('express');
var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.use(session({secret: 'cs361'}));

//Create a new pool
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs340_merrillc',
  password: '2710',
  database: 'cs340_merrillc'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3142);

var sess;

//Render home.handlebars when the user visits the page
app.get('/',function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.redirect('/profile/');
	}
	else {
    	res.render('home');
	}
});

app.get('/signup/',function(req,res){
	res.render('signup');
});

app.get('/signin/',function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('signin');
	}
	else {
    	res.redirect('/');
	}
});

app.get('/profile/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('profile');
	}
	else {
    	res.redirect('/');
	}
});
app.get('/changePassword/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('changePassword');
	}
	else {
    	res.redirect('/');
	}
});

app.get('/newroute/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('newroute');
	}
	else {
    	res.redirect('/');
	}
});

app.get('/myroutes/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('myroutes');
	}
	else {
    	res.redirect('/');
	}
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
	  	if(err) {
	    	console.log(err);
	  	} else {
	    	res.redirect('/');
	  	}
	});
});

app.get('/myrides/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('myrides');
	}
	else {
    	res.redirect('/');
	}
});

app.get('/newride/', function(req,res){
	sess = req.session;
	if(sess.username) {
   		res.render('newride');
	}
	else {
    	res.redirect('/');
	}
});


app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});


/* ----------------------------------------------------------------------------------
SELECT FUNCTIONS 
---------------------------------------------------------------------------------- */ 

//This allows the user to login if the passed username and password are correct
app.get('/login', function(req, res, next) {
	
	pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.query.username, req.query.password] ,function(err, rows){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side	
		if(rows.length==1)
			sess = req.session;
			sess.username=req.query.username;
			sess.id=req.query.id;
		res.send(rows); 
	});
});

//This allows the user to view their routes on the "My Routes" page
app.get('/get-routes', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM route WHERE username = ?', [sess.username],function(err, rows){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This retrieves the distance of a given route
app.get('/get-distance', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM route WHERE username = ? AND name = ?', [sess.username, req.query.name],function(err, rows){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//This allows the user to view their routes on the "My Routes" page
app.get('/get-user', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM users WHERE username = ?', [sess.username], function(err, rows){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//Selects the comprehensive list of drivers
app.get('/get-drivers', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM users', function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//Selects the comprehensive list of drivers
app.get('/get-routes', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM route WHERE username=?', [sess.username], function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//Selects all rides for a given user
app.get('/get-rides', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM ride WHERE username=?', [sess.username], function(err, rows, fields){
		if(err) {
			next(err);
			return;
		}
		//Send the JSON results back as a string, they will be parsed and assembled client-side
		context.results = JSON.stringify(rows);		
		res.send(context.results); 
	});
});

//Gets all rides by a particular driver, used for rating calculation
app.get('/get-driver-rides', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM ride WHERE driverName=?', [req.query.name], function(err, rows, fields){
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

//This adds a new route under the user's id
app.get('/add-route', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO route (`username`, `name`, `startLocation`, `endLocation`, `startTime`, `endTime`, `distance`) VALUES (?, ?, ?, ?, ?, ?, ?)", [sess.username, req.query.name, req.query.startLocation, req.query.endLocation, req.query.startTime, req.query.endTime, req.query.distance], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Route Added";
		res.send(context.results);  
	});
});

//This adds a new ride under the user's id
app.get('/add-ride', function(req, res, next) {
	var context = {};
	pool.query("INSERT INTO ride (`routeName`, `username`, `driverName`, `mileage`, `rating`, `price`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.query.name, sess.username, req.query.driver, req.query.mileage, req.query.rating, req.query.price, req.query.date], function(err, result){
		if(err) {
			next(err);
			return;
		}
		context.results = "Ride Added";
		res.send(context.results);  
	});
});

/* ----------------------------------------------------------------------------------
UPDATE FUNCTION
---------------------------------------------------------------------------------- */ 
//This allows the user to update an existing row in the database
app.get('/update-rating',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM users WHERE username=?", [req.query.name], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("UPDATE users SET rating=?",
        [req.query.rating],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Row Updated";
        res.send(context.results); 
      });
    }
  });
});

/* ----------------------------------------------------------------------------------
MISC.
---------------------------------------------------------------------------------- */ 
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
