/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : Activite et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon leur caractéristique (Homme, Femme, Homme 
 * mineur, Femme mineur) par le nom de l'installation et le nom de l'activite
 */

var year = 2017;

var query1 = [
	{
		$project: {
			nomInst: '$installation.nomInst',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme'
		}
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

db.fait_activites.aggregate(query1).forEach(printjson);

var query2 = [
	{
		$project: {
			libAct: '$libAct',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme'
		}
	},
	{
		$group: {
			_id: {
				libAct: '$libAct'
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
			libAct: '$libAct',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme'
		}
	},
	{
		$group: {
			_id: {
				nomInst: '$nomInst',
				libAct: '$libAct'
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
		$group: {
			_id: null,
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
