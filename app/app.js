var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/noSQLProject';

// Use connect method to connect to the server
var installation_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/installations.json';
var equipement_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/equipements.json';
activites_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/activites.json';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected successfully to server');

	/**
     * Installation file
     */
	var installationsData = JSON.parse(readFile(installation_file));
	var instName = 'installations';

	dropCollection(db, instName);

	if (installationsData && installationsData.installations)
		insertCollection(db, instName, installationsData.installations);

	/**
     * Equipement file
     */
	var equipementData = JSON.parse(readFile(equipement_file));
	var equName = 'equipements';
	dropCollection(db, equName);

	if (equipementData && equipementData.equipements) insertCollection(db, equName, equipementData.equipements);

	/**
     * Activite file
     */
	var activitesData = JSON.parse(readFile(activites_file));
	var actName = 'activites';
	dropCollection(db, actName);

	if (activitesData && activitesData.activites) insertCollection(db, actName, activitesData.activites);
});

dropCollection = function(db, collectionName) {
	db.dropCollection(collectionName, function(err, delOK) {
		if (err) console.log('Collection ' + collectionName + ' non trouvée');
		if (delOK) console.log('Collection ' + collectionName + ' deleted');
		//db.close();
	});
};

insertCollection = function(db, collectionName, data) {
	var collection = db.collection(collectionName);
	// Insert some collections
	collection.insertMany(data, function(err, result) {
		assert.equal(err, null);
		assert.equal(data.length, result.result.n);

		console.log('Inserted ' + collectionName + ' into the collection');

		if (collectionName == 'equipements') {
			db.close();
		}
	});
};

readFile = function(file) {
	var fs = require('fs');
	var contents = fs.readFileSync(file, 'utf8');
	return contents;
};
