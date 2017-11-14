/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : Activite et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon leur caractéristique (Homme, Femme, Homme 
 * mineur, Femme mineur) par le nom de l'installation et le nom de l'activite
 */

var year = 2005;

var query = [
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
				nomInst: '$nomInst',
				libAct: 'null'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activites.aggregate(query);

var query = [
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
				nomInst: 'null',
				libAct: '$libAct'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activites.aggregate(query);

var query = [
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
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activites.aggregate(query);

query = [
	{
		$match: { 'date.year': parseInt(year) }
	},
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
	}
];

db.fait_activites.aggregate(query);

query = [
	{
		$match: { installation: { $ne: null } }
	},
	{
		$group: {
			_id: null,
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			count: {
				$sum: 1
			}
		}
	}
];

db.fait_activites.aggregate(query);
