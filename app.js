var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var FaitActivite = require('./model/fait');

var global = require('./global');

// Connect to mongoose

var url = 'mongodb://localhost:27017/' + global.dbName;

mongoose.connect(url, { useMongoClient: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!");
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', function(req, res) {
	res.send({ message: 'Please use api/' });
});

app.get('/api/fait_activites', function(req, res) {
	FaitActivite.getFaitActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.get('/api/fait_activites/groupInst', function(req, res) {
	FaitActivite.getFaitActiviteGroupByInst(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.get('/api/fait_activites/groupInst/:year', function(req, res) {
	FaitActivite.getFaitActiviteGroupByInst(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	}, req.params.year);
});

app.get('/api/fait_activites/groupAct', function(req, res) {
	FaitActivite.getFaitActiviteGroupByActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.get('/api/fait_activites/groupAct/:year', function(req, res) {
	FaitActivite.getFaitActiviteGroupByActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	}, req.params.year);
});

app.get('/api/fait_activites/groupInstAct', function(req, res) {
	FaitActivite.getFaitActiviteGroupByInstActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.get('/api/fait_activites/groupInstAct/:year', function(req, res) {
	FaitActivite.getFaitActiviteGroupByInstActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	}, req.params.year);
});

app.listen(3000);
console.log('Running on port 3000...');
