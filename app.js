var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

FaitActivite = require('./model/fait');

global = require('./global');

// Connect to mongoose

var url = 'mongodb://localhost:27017/' + global.dbName;

mongoose.connect(url);

var db = mongoose.connection;

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
	}, req.param('year'));
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
	}, req.param('year'));
});

app.get('/api/fait_activites/groupInstAct', function(req, res) {
	FaitActivite.getFaitActiviteGroupByInstActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
