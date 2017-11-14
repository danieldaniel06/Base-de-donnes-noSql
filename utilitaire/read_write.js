var installation_file = require('../jsonFiles/installations.json');
var installation_file_write = '/Users/danielahmed/Desktop/jsonFiles/installations_w.json';

var equipement_file = '/Users/danielahmed/Desktop/jsonFiles/equipements.json';
var equipement_file_write = '/Users/danielahmed/Desktop/jsonFiles/equipements_w.json';

var equipement_file_bis = require('../jsonFiles/equipements.json');

var activite_file = require('../jsonFiles/activites.json');
var activite_file_write = '/Users/danielahmed/Desktop/jsonFiles/activites_w.json';

var addresses_file = require('../jsonFiles/addresses.json');

var niveau_file = require('../jsonFiles/niveau.json');

//console.log(installation_file.installations);

readFile = function(file) {
	var fs = require('fs');
	var contents = fs.readFileSync(file, 'utf8');
	return contents;
};

writeFile = function(file, data) {
	var fs = require('fs');
	fs.writeFileSync(file, data);
};

//var installation_file = JSON.parse(readFile(installation_file));
//writeFile(installation_file_write, JSON.stringify(installation_file.installations));

var dataE = JSON.parse(readFile(equipement_file));
//writeFile(equipement_file_write, JSON.stringify(dataE.equipements));

//var activite_file = JSON.parse(readFile(activite_file));
//writeFile(activite_file_write, JSON.stringify(activite_file.activites));

//var activite_fileddr = JSON.parse(readFile(addresses_file));

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

var fait_activite = {
	faitActivite: []
};

var randInst;
var randEqu;
var randAct;

var keyInst = [];

for (var i = 0; i < installation_file.installations.length; i++) {
	if (installation_file.installations[i]._id) {
		keyInst[installation_file.installations[i]._id] = installation_file.installations[i];
	} else {
		keyInst.push(installation_file.installations[i]);
	}
}

var keyAct = [];

for (var i = 0; i < activite_file.activites.length; i++) {
	if (activite_file.activites[i]._id) {
		keyAct[activite_file.activites[i]._id] = activite_file.activites[i];
	} else {
		keyAct.push(activite_file.activites[i]);
	}
}

var keyEqu = [];

for (var i = 0; i < dataE.equipements.length; i++) {
	if (dataE.equipements[i]._id) {
		keyEqu[dataE.equipements[i]._id] = dataE.equipements[i];
	} else {
		keyEqu.push(dataE.equipements[i]);
	}
}

//console.log(keyEqu);

for (var i = 0; i < 20000; i++) {
	randDate = Math.floor(Math.random() * daysOfYear.length);
	randEqu = Math.floor(Math.random() * (dataE.equipements.length - (dataE.equipements.length - 2000)) + 100);
	randNiv = Math.floor(Math.random() * niveau_file.niveaux.length);
	//randAddr = Math.floor(Math.random() * activite_fileddr.addresses.length);
	console.log(randEqu);
	while (
		!dataE.equipements[randEqu].InsNumeroInstall ||
		(keyInst[dataE.equipements[randEqu].InsNumeroInstall] &&
			!keyInst[dataE.equipements[randEqu].InsNumeroInstall].codePostal)
	) {
		randEqu = Math.floor(Math.random() * (dataE.equipements.length - (dataE.equipements.length - 2000)) + 100);
	}

	//console.log(keyInst);

	nbParticipantsFemme = Math.floor(Math.random() * 50 + 1);
	nbParticipantsFemmeMineur = Math.floor(Math.random() * nbParticipantsFemme);
	nbParticipantsFemmeAgee = Math.floor(Math.random() * Math.abs(nbParticipantsFemme - nbParticipantsFemmeMineur));
	nbParticipantsHomme = Math.floor(Math.random() * 50 + 1);
	nbParticipantsHommeMineur = Math.floor(Math.random() * nbParticipantsHomme);
	nbParticipantsHommeAgee = Math.floor(Math.random() * Math.abs(nbParticipantsHomme - nbParticipantsHommeMineur));
	nbSpectateursHomme = Math.floor(Math.random() * 1000 + 1);
	nbSpectateursFemme = Math.floor(Math.random() * 1000 + 1);

	if (i % 2 == 0) {
		fait_activite.faitActivite.push({
			_id:
				dataE.equipements[randEqu].idEquipement +
				dataE.equipements[randEqu].InsNumeroInstall +
				dataE.equipements[randEqu].idActivite +
				daysOfYear[randDate]._id,
			equipement: keyEqu[dataE.equipements[randEqu].idEquipement],
			activite: keyAct[dataE.equipements[randEqu].idActivite],
			installation: keyInst[dataE.equipements[randEqu].InsNumeroInstall],
			nbParticipantsHomme: nbParticipantsHomme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			date: daysOfYear[randDate],
			niveau: niveau_file.niveaux[randNiv].niveau
		});
	} else if (i % 3) {
		fait_activite.faitActivite.push({
			_id:
				dataE.equipements[randEqu].idEquipement +
				dataE.equipements[randEqu].InsNumeroInstall +
				dataE.equipements[randEqu].idActivite +
				daysOfYear[randDate]._id,
			equipement: keyEqu[dataE.equipements[randEqu].idEquipement],
			activite: keyAct[dataE.equipements[randEqu].idActivite],
			installation: keyInst[dataE.equipements[randEqu].InsNumeroInstall],
			nbParticipantsFemmeMineur: nbParticipantsFemmeMineur,
			nbParticipantsHommeMineur: nbParticipantsHommeMineur,
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			date: daysOfYear[randDate],
			niveau: niveau_file.niveaux[randNiv].niveau
		});
	} else if (i % 7) {
		fait_activite.faitActivite.push({
			_id:
				dataE.equipements[randEqu].idEquipement +
				dataE.equipements[randEqu].InsNumeroInstall +
				dataE.equipements[randEqu].idActivite +
				daysOfYear[randDate]._id,
			equipement: keyEqu[dataE.equipements[randEqu].idEquipement],
			activite: keyAct[dataE.equipements[randEqu].idActivite],
			installation: keyInst[dataE.equipements[randEqu].InsNumeroInstall],
			nbParticipantsFemmeMineur: nbParticipantsFemmeMineur,
			nbParticipantsHommeMineur: nbParticipantsHommeMineur,
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			nbParticipantsHommeAgee: nbParticipantsHommeAgee,
			nbParticipantsFemmeAgee: nbParticipantsFemmeAgee,
			date: daysOfYear[randDate],
			niveau: niveau_file.niveaux[randNiv].niveau
		});
	} else {
		fait_activite.faitActivite.push({
			_id:
				dataE.equipements[randEqu].idEquipement +
				dataE.equipements[randEqu].InsNumeroInstall +
				dataE.equipements[randEqu].idActivite +
				daysOfYear[randDate]._id,
			equipement: keyEqu[dataE.equipements[randEqu].idEquipement],
			activite: keyAct[dataE.equipements[randEqu].idActivite],
			installation: keyInst[dataE.equipements[randEqu].InsNumeroInstall],
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			date: daysOfYear[randDate],
			niveau: niveau_file.niveaux[randNiv].niveau
		});
	}
}

var fait_activite_file_write = '/Users/danielahmed/Desktop/jsonFiles/fait_activites_w.json';

writeFile(fait_activite_file_write, JSON.stringify(fait_activite.faitActivite));

var date_write = '/Users/danielahmed/Desktop/jsonFiles/date_w.json';

writeFile(date_write, JSON.stringify(daysOfYear));
