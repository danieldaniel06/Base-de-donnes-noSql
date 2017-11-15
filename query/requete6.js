/**
 * Nombre d'évenement sportif par departement
 */

var mapNbActDep = function() {
	var equipement = this.equipement;
	if (equipement) {
		emit({ libDep: equipement.libDep }, { nbActivite: 1 });
		emit(null, { nbActivite: 1 });
	}
};

var reduceNbActDep = function(keyInst, values) {
	var count = 0;
	values.forEach(function(value) {
		count += value.nbActivite;
	});
	return { nbActivite: count };
};

var query = {};

db.fait_activites.mapReduce(mapNbActDep, reduceNbActDep, {
	out: { inline: 1 },
	query: query
});

db.statNbActDep.find().forEach(printjson);
