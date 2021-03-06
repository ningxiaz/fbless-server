
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.enable("jsonp callback");
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/get_user', routes.get_user);

app.post('/save_accesstoken', routes.save_accesstoken);

app.get('/post_shame', routes.post_shame);

app.post('/create_account', routes.create_account);

//cross-domain requests
app.get('/save_report', routes.save_report);

app.get('/simple_auth', routes.simple_auth);

app.get('/save_goal', routes.save_goal);

//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
