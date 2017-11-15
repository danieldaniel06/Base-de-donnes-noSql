/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : date et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon différentes dimension sur une année
 */

var year = 2010;

var query1 = [
	{
		$project: {
			nomInst: '$installation.nomInst',
			mois: '$date.month',
			year: '$date.year',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme'
		}
	},
	{
		$match: { $and: [{ year: year }, { nomInst: { $ne: null } }] }
	},
	{
		$group: {
			_id: {
				mois: '$mois'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			}
		}
	},
	{
		$project: {
			totalParticipants: {
				$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
			}
		}
	}
];

db.fait_activites.aggregate(query1).forEach(printjson);

var query2 = [
	{
		$project: {
			nomInst: '$installation.nomInst',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			mois: '$date.month',
			year: '$date.year'
		}
	},
	{
		$match: { $and: [{ year: year }, { nomInst: { $ne: null } }] }
	},
	{
		$group: {
			_id: {
				nomInst: '$nomInst',
				mois: '$mois'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			}
		}
	},
	{
		$project: {
			totalParticipants: {
				$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
			}
		}
	}
];

db.fait_activites.aggregate(query2).forEach(printjson);

var query3 = [
	{
		$project: {
			nomInst: '$installation.nomInst',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			mois: '$date.month',
			year: '$date.year'
		}
	},
	{
		$match: { $and: [{ year: year }, { nomInst: { $ne: null } }] }
	},
	{
		$group: {
			_id: {
				nomInst: '$nomInst'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			}
		}
	},
	{
		$project: {
			totalParticipants: {
				$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
			}
		}
	}
];

db.fait_activites.aggregate(query3).forEach(printjson);

query4 = [
	{
		$project: {
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			year: '$date.year',
			inst: '$installation'
		}
	},
	{
		$match: { $and: [{ year: year }, { inst: { $ne: null } }] }
	},
	{
		$group: {
			_id: false,
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			}
		}
	},
	{
		$project: {
			totalParticipants: {
				$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
			}
		}
	}
];

db.fait_activites.aggregate(query4).forEach(printjson);
