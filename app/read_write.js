var installation_file = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/installations.json';
var installation_file_write = '/Users/danielahmed/Desktop/noSQLProject/app/jsonFiles/installations_w.json';

readFile = function(file) {
	var fs = require('fs');
	var contents = fs.readFileSync(file, 'utf8');
	return contents;
};

writeFile = function(file, data) {
	var fs = require('fs');
	fs.writeFileSync(file, data);
};

var data = JSON.parse(readFile(installation_file));
writeFile(installation_file_write, JSON.stringify(data.installations));
