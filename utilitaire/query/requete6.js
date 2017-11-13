/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : Activite et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon leur caractéristique (Homme, Femme, Homme 
 * mineur, Femme mineur) par le nom de l'installation et le nom de l'activite
 */

var mapGroupInst = function() {
	var inst = this.installation;
	var activite = this.activite;
	if (inst && activite) {
		emit(
			{ nomInstallation: inst.nomInstallation, nomActivite: activite.libAct },
			{ nbParticipantsHomme: this.nbParticipantsHomme }
		);
		emit(
			{ nomInstallation: inst.nomInstallation, nomActivite: 'ZZZZ' },
			{ nbParticipantsHomme: this.nbParticipantsHomme }
		);
		emit(
			{ nomInstallation: 'ZZZZ', nomActivite: activite.libAct },
			{ nbParticipantsHomme: this.nbParticipantsHomme }
		);
		emit({ nomInstallation: 'ZZZZ', nomActivite: 'ZZZZ' }, { nbParticipantsHomme: this.nbParticipantsHomme });
	}
};

var reduceGroupInst = function(keyInst, valuesnbParticipantsHomme) {
	var count = 0;
	for (var i = 0; i < valuesnbParticipantsHomme.length; i++) {
		count += valuesnbParticipantsHomme[i].nbParticipantsHomme;
	}
	return { nbParticipantsHomme: count };
};

db.fait_activite.mapReduce(mapGroupInst, reduceGroupInst, {
	out: 'cubeInstAct',
	query: {
		'date.year': 2017
	}
});

db.groupByInst.find().forEach(printjson);
