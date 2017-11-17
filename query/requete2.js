/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : Activite et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon leur caractéristique (Homme, Femme, Homme 
 * mineur, Femme mineur) par le nom de l'installation et le nom de l'activite
 */

var mapGroupInst = function() {
	var inst = this.installation;
	var date = this.date;
	if (inst && date) {
		emit(
			{ nomInst: inst.nomInst, month: date.month },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);
		emit(
			{ nomInst: inst.nomInst },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);
		emit(
			{ month: date.month },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);

		emit(null, {
			totalParticipantsHomme: this.nbParticipantsHomme,
			totalParticipantsFemme: this.nbParticipantsFemme
		});
	}
};

var reduceGroupInst = function(key, values) {
	var reducedVal = { totalParticipants: 0 };
	var totalParticipantsHomme = 0;
	var totalParticipantsFemme = 0;

	values.forEach(function(value) {
		if (value.totalParticipantsHomme) totalParticipantsHomme += parseInt(value.totalParticipantsHomme);
		if (value.totalParticipantsFemme) totalParticipantsFemme += parseInt(value.totalParticipantsFemme);
	});
	reducedVal.totalParticipants += totalParticipantsHomme + totalParticipantsFemme;
	return reducedVal;
};

db.fait_activites.mapReduce(mapGroupInst, reduceGroupInst, {
	out: { inline: 1 },
	query: {
		'date.year': 2010
	}
});
