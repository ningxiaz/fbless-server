
/*
 * GET home page.
 */
var mongo = require('mongodb');

exports.index = function(req, res){
	res.render('index', { title: 'FBless' });
};

exports.create_account = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	var name = login.first_name+' '+login.last_name;
	var record = {
		fb_id: login.id,
		name: name,
		password: password
	};

	var mongoUri = process.env.MONGOLAB_URI || 
	  process.env.MONGOHQ_URL || 
	  'mongodb://localhost/mydb'; 

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('Stars', function(er, collection) {
	    collection.insert(record, {safe: true}, function(er,rs) {
	    	if( er || !rs ) console.log("Record not saved");
	    	else console.log("Record saved");
	    });
	  });
	});
	
	res.contentType('json');
	res.send({data: JSON.stringify({'id': record.name})});
};