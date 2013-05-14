
/*
 * GET home page.
 */
var mongo = require('mongodb');

exports.index = function(req, res){
	res.render('index', { title: 'FBless' });
};

exports.get_user = function(req, res){
	var fb_id = req.body.fb_id;
	console.log("here "+fb_id);

	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Users', function(er, collection) {
	    collection.find({'fb_id': fb_id}).toArray(function(er, rs){
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