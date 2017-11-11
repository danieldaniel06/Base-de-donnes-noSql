var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/noSQLProject';

// Use connect method to connect to the server
var installation_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/installations.json';
var equipement_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/equipements.json';
activites_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/activites.json';

var mapGroupInst = function() {
	emit(this.idInst, { nbParticipantsHomme: this.nbParticipantsHomme });
};

var reduceGroupInst = function(keyInst, valuesnbParticipantsHomme) {
	var count = 0;
	for (var i = 0; i < valuesnbParticipantsHomme.length; i++) {
		count += valuesnbParticipantsHomme[i].nbParticipantsHomme;
	}
	return { nbParticipantsHomme: count };
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected successfully to server');

	fait_activites = db.collection('fait_activites');

	fait_activites.mapReduce(mapGroupInst, reduceGroupInst, { out: 'groupByInst' }, function(err, result) {
		assert.equal(null, err);

		if (result) {
			//console.log(result);
		}

		//db.close();
	});

	var groupByInst = db.collection('groupByInst').find();
	var index = 1;
	var size;

	groupByInst.count(function(err, count) {
		size = count;
	});

	var collection = [];
	var installations = db.collection('installations');

	groupByInst.forEach(function(doc) {
		collection.push(doc);
		if (size == index) {
			doSomething();
			//db.close();
		}
		index++;
	});

	var Tab = [];

	var doSomething = function() {
		var installations = db.collection('installations');
		index = 1;
		installations.count(function(err, count) {
			size = count;
		});
		installations.find().forEach(function(installation) {
			Tab[installation.idInstallation] = installation.nomInstallation;
			//console.log(installation.idInstallation);
			if (size == index) {
				doSomethingElse();
				//db.close();
			}
			index++;
		});
	};

	var doSomethingElse = function() {
		collection.forEach(function(doc) {
			doc.nomInstallation = Tab[doc._id];
			delete doc._id;
			console.log(doc);
		});
	};
});
