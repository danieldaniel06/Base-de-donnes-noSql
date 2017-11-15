readFile = function(file) {
	var fs = require('fs');
	var contents = fs.readFileSync(file, 'utf8');
	return contents;
};

writeFile = function(file, data) {
	var fs = require('fs');
	fs.writeFileSync(file, data);
};
