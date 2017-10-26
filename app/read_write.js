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
writeFile(installation_file_write, JSON.stringify(dataI.installations));

var dataE = JSON.parse(readFile(equipement_file));
writeFile(equipement_file_write, JSON.stringify(dataE.equipements));

var dataA = JSON.parse(readFile(activite_file));
writeFile(activite_file_write, JSON.stringify(dataA.activites));
