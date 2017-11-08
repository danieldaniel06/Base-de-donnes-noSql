var installation_file = '/Users/danielahmed/Desktop/jsonFiles/installations.json';
var installation_file_write = '/Users/danielahmed/Desktop/jsonFiles/installations_w.json';

var equipement_file = '/Users/danielahmed/Desktop/jsonFiles/equipements.json';
var equipement_file_write = '/Users/danielahmed/Desktop/jsonFiles/equipements_w.json';

var activite_file = '/Users/danielahmed/Desktop/jsonFiles/activites.json';
var activite_file_write = '/Users/danielahmed/Desktop/jsonFiles/activites_w.json';

readFile = function(file) {
	var fs = require('fs');
	var contents = fs.readFileSync(file, 'utf8');
	return contents;
};

writeFile = function(file, data) {
	var fs = require('fs');
	fs.writeFileSync(file, data);
};

var dataI = JSON.parse(readFile(installation_file));
//writeFile(installation_file_write, JSON.stringify(dataI.installations));

var dataE = JSON.parse(readFile(equipement_file));
//writeFile(equipement_file_write, JSON.stringify(dataE.equipements));

var dataA = JSON.parse(readFile(activite_file));
//writeFile(activite_file_write, JSON.stringify(dataA.activites));

var daysOfYear = [];
var dateInit = new Date(2005, 07, 28, 00, 00, 00);
var dateFin = new Date(2017, 07, 28, 00, 00, 00);

var now = new Date();

for (var d = dateInit; d <= now; d.setDate(d.getDate() + 1)) {
	var date = new Date(d);
	(year = date.getFullYear()), daysOfYear.push({
		_id: date,
		mois: date.getMonth(),
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

for (var i = 0; i < 10000; i++) {
	randDate = Math.floor(Math.random() * daysOfYear.length);
	randInst = Math.floor(Math.random() * dataI.installations.length);
	randEqu = Math.floor(Math.random() * dataE.equipements.length);
	randAct = Math.floor(Math.random() * dataA.activites.length);

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
			idInst: dataI.installations[randInst].idInstallation,
			idEqu: dataE.equipements[randEqu].idEquipement,
			idAct: dataA.activites[randAct].idActivite,
			nbParticipantsHomme: nbParticipantsHomme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			dateActivite: daysOfYear[randDate]._id
		});
	} else if (i % 3) {
		fait_activite.faitActivite.push({
			idInst: dataI.installations[randInst].idInstallation,
			idEqu: dataE.equipements[randEqu].idEquipement,
			idAct: dataA.activites[randAct].idActivite,
			nbParticipantsFemmeMineur: nbParticipantsFemmeMineur,
			nbParticipantsHommeMineur: nbParticipantsHommeMineur,
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			dateActivite: daysOfYear[randDate]._id
		});
	} else if (i % 7) {
		fait_activite.faitActivite.push({
			idInst: dataI.installations[randInst].idInstallation,
			idEqu: dataE.equipements[randEqu].idEquipement,
			idAct: dataA.activites[randAct].idActivite,
			nbParticipantsFemmeMineur: nbParticipantsFemmeMineur,
			nbParticipantsHommeMineur: nbParticipantsHommeMineur,
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			nbParticipantsHommeAgee: nbParticipantsHommeAgee,
			nbParticipantsFemmeAgee: nbParticipantsFemmeAgee,
			dateActivite: daysOfYear[randDate]._id
		});
	} else {
		fait_activite.faitActivite.push({
			idInst: dataI.installations[randInst].idInstallation,
			idEqu: dataE.equipements[randEqu].idEquipement,
			idAct: dataA.activites[randAct].idActivite,
			nbParticipantsHomme: nbParticipantsHomme,
			nbParticipantsFemme: nbParticipantsFemme,
			nbSpectateursHomme: nbSpectateursHomme,
			nbSpectateursFemme: nbSpectateursFemme,
			idDate: daysOfYear[randDate]._id
		});
	}
}

var fait_activite_file_write = '/Users/danielahmed/Desktop/jsonFiles/fait_activites_w.json';

writeFile(fait_activite_file_write, JSON.stringify(fait_activite.faitActivite));

var date_write = '/Users/danielahmed/Desktop/jsonFiles/date_w.json';

writeFile(date_write, JSON.stringify(daysOfYear));
