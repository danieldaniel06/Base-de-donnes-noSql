var activites = require('../jsonFiles/p/activites.json');
var installation = require('../jsonFiles/p/installations.json');
var equipements = require('../jsonFiles/p/equipements.json');

writeFile = function(file, data) {
	var fs = require('fs');
	fs.writeFileSync(file, data);
};

var daysOfYear = [];
var dateInit = new Date(2005, 7, 28, 0, 0, 0);
var dateFin = new Date(2017, 7, 28, 0, 0, 0);

var now = new Date();

for (var d = dateInit; d <= now; d.setDate(d.getDate() + 1)) {
	var date = new Date(d);
	(year = date.getFullYear()), daysOfYear.push({
		_id: date.toISOString(),
		month: date.getMonth(),
		year: date.getFullYear(),
		day: date.getDate()
	});
}

var keyInst = [];

for (var i = 0; i < installation.installations.length; i++) {
	if (installation.installations[i]._id) {
		keyInst[installation.installations[i]._id] = installation.installations[i];
	} else {
		keyInst.push(installation.installations[i]);
	}
}

var keyEqu = [];

for (var i = 0; i < equipements.equipements.length; i++) {
	if (equipements.equipements[i]._id) {
		keyEqu[equipements.equipements[i]._id] = equipements.equipements[i];
	} else {
		keyEqu.push(equipements.equipements[i]);
	}
}

var activitesDansInst = 0;
var activitesDansInstTrouve = 0;
var activitesDansEqu = 0;
var activitesDansEquTrouve = 0;

var k = 0;

for (var i = 0; i < activites.activites.length - 200000; i++) {
	var coutNumber = Math.random() * 2000;
	var coutBudget = Math.random() * 3000;
	activites.activites[i].cout = coutNumber.toPrecision(6);
	activites.activites[i].budget = coutBudget.toPrecision(6);
	randDate = Math.floor(Math.random() * daysOfYear.length);
	activites.activites[i].date = daysOfYear[randDate];

	activites.activites[i]._id =
		JSON.stringify(activites.activites[i].idAct) +
		JSON.stringify(activites.activites[i].idEqu) +
		daysOfYear[randDate]._id;

	if (activites.activites[i].idInst) {
		activitesDansInst++;
		if (keyInst[activites.activites[i].idInst]) {
			k = i;
			activitesDansInstTrouve++;
			activites.activites[i].installation = keyInst[activites.activites[i].idInst];
		}
	}
	if (activites.activites[i].idEqu) {
		activitesDansEqu++;
		if (keyEqu[activites.activites[i].idEqu]) {
			activites.activites[i].equipement = keyEqu[activites.activites[i].idEqu];
			activitesDansEquTrouve++;
		} else {
			activites.activites[i] = {};
		}
	}
	delete activites.activites[i].idInst;
	delete activites.activites[i].idAct;
	delete activites.activites[i].idEqu;
}

console.log(activitesDansInst, activitesDansInstTrouve);
console.log(activitesDansEqu, activitesDansEquTrouve);
console.log(activites.activites[k]);

var selected = [];
for (var i = 1000; i < activites.activites.length - 100000; i++) {
	if (activites.activites[i] != {}) selected[i - 1000] = activites.activites[i];
}

var fait_activite_file_write = '/Users/danielahmed/Desktop/noSQLProject/jsonFiles/p/fait_activites_w.json';

writeFile(fait_activite_file_write, JSON.stringify(selected));
