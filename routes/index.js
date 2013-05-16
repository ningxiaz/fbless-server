
/*
 * GET home page.
 */
var mongo = require('mongodb');

exports.index = function(req, res){
	res.render('index', { title: 'FBless' });
};

exports.get_user = function(req, res){
	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	var id = req.query.fb_id;

	var query = {
		fb_id: id
	};

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Users', function(er, collection) {
	    collection.find(query).toArray(function(er, rs){
	    	res.contentType('json');
	    	res.send({results: JSON.stringify(rs)});
	    });
	  });
	});
};

exports.create_account = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	var email = req.body.email;
	var name = login.first_name+' '+login.last_name;
	var record = {
		fb_id: login.id,
		name: name,
		email: email,
		password: password
	};

	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Users', function(er, collection) {
	    collection.insert(record, {safe: true}, function(er,rs) {
	    	if( er || !rs ) console.log("Record not saved");
	    	else console.log("Record saved");
	    });
	  });
	});
	
	res.contentType('json');
	res.send({data: JSON.stringify({'id': record.name})});
};

exports.save_report = function(req, res){
	var user_id = req.query.user_id;
	var date = req.query.date;
	var fb_time = req.query.fb_time;
	var total_time = req.query.total_time;

	var report = {
		user_id: user_id,
		date: date,
		fb_time: fb_time,
		total_time: total_time
	};

	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Usage', function(er, collection) {
	    collection.insert(report, {safe: true}, function(er,rs) {
	    	if( er || !rs ) res.json("Report not saved");
	    	else res.json("Report saved");
	    });
	  });
	});

	
};

exports.simple_auth = function(req, res){
	var email = req.query.email;
	var password = req.query.password;

	var query = {
		email: email,
		password: password
	};

	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	var empty = {};

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Users', function(er, collection) {
	    collection.find(query).toArray(function(er, rs){
	    	if(rs.length!=0){
	    		res.json(rs[0]);
	    	}
	    	else{
	    		res.json(empty);
	    	}
	    });
	  });
	});

};

//GET request
exports.post_shame = function(req, res){
	var fb_id = req.query.fb_id;

	//get access token from database

	//post using Graph API with a POST request to FB
};

//POST request
exports.save_accesstoken = function(req, res){
	var fb_id = req.body.fb_id;

	//save user's accesstoken in database
	
};