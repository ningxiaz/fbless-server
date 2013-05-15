
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
	var date = req.params.date;
	var fb_time = req.query.fb_time;
	var total_time = req.params.total_time;

	res.json("yeaahhhh "+date+" "+fb_time+" "+total_time);

	// var mongoUri = process.env.MONGOLAB_URI || 
	//   process.env.MONGOHQ_URL || 
	//   'mongodb://localhost/mydb'; 

	// mongo.Db.connect(mongoUri, function (err, db) {
	//   db.collection('Usage', function(er, collection) {
	//     collection.insert(report, {safe: true}, function(er,rs) {
	//     	if( er || !rs ) console.log("Record not saved");
	//     	else console.log("Record saved");
	//     });
	//   });
	// });
};