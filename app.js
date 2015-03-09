/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), fs = require('fs');
var studio = require('./routes/studio');
var app = express();

var fileToUpload;

global.db;

var cloudant;

var dbCredentials = {
	dbName : 'my_sample_db'
};


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

function initDBConnection() {
	dbCredentials.host = "a12f00f3-b761-4132-8873-73cfe07030b1-bluemix.cloudant.com";
	dbCredentials.port = 443;
	dbCredentials.user = "5e46515f-9d4c-47bd-921c-42c43bd062c1-bluemix";
	dbCredentials.password = "263b48931d085203288e19a801df144a749c67ca2b6839cd1533d7d09a8565af";
	dbCredentials.url = "https://5e46515f-9d4c-47bd-921c-42c43bd062c1-bluemix:263b48931d085203288e19a801df144a749c67ca2b6839cd1533d7d09a8565af@5e46515f-9d4c-47bd-921c-42c43bd062c1-bluemix.cloudant.com";

	// dbCredentials.host = "a12f00f3-b761-4132-8873-73cfe07030b1-bluemix.cloudant.com";
	// dbCredentials.port = 443;
	// dbCredentials.user = "a12f00f3-b761-4132-8873-73cfe07030b1-bluemix";
	// dbCredentials.password = "5eeef0a18c9e683959124e313b6ec9ce9facd31f539de9ad19d9c241c2d56e45";
	// dbCredentials.url = "https://a12f00f3-b761-4132-8873-73cfe07030b1-bluemix:5eeef0a18c9e683959124e313b6ec9ce9facd31f539de9ad19d9c241c2d56e45@a12f00f3-b761-4132-8873-73cfe07030b1-bluemix.cloudant.com";

	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		if(vcapServices.cloudantNoSQLDB) {
			dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
			dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
			dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
			dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
			dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;
		}
		console.log('VCAP Services: '+JSON.stringify(process.env.VCAP_SERVICES));
	}

	cloudant = require('cloudant')(dbCredentials.url);
	
	//check if DB exists if not create
	cloudant.db.create(dbCredentials.dbName, function (err, res) {
		if (err) { console.log('could not create db ', err); }
    });
	db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();


app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.post('/studio', function(req, res){
	studio.list(req, res);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

