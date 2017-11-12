/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : Activite et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon leur caractéristique (Homme, Femme, Homme 
 * mineur, Femme mineur) par le nom de l'installation et le nom de l'activite
 */

var year = 2005;

var query = [
	{
		$project: {
			nomInstallation: '$installation.nomInstallation',
			idAct: '$idAct',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			nbParticipantsHommeMineur: '$nbParticipantsHommeMineur',
			nbParticipantsFemmeMineur: '$nbParticipantsFemmeMineur'
		}
	},
	{
		$group: {
			_id: {
				nomInstallation: '$nomInstallation',
				nomActivite: 'null'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			sumNbParticipantsHommeMineur: {
				$sum: '$nbParticipantsHommeMineur'
			},
			sumNbParticipantsFemmeMineur: {
				$sum: '$nbParticipantsFemmeMineur'
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activite.aggregate(query);

var query = [
	{
		$project: {
			nomActivite: '$activite.libelleActivite',
			idAct: '$idAct',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			nbParticipantsHommeMineur: '$nbParticipantsHommeMineur',
			nbParticipantsFemmeMineur: '$nbParticipantsFemmeMineur'
		}
	},
	{
		$group: {
			_id: {
				nomInstallation: 'null',
				nomActivite: '$nomActivite'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			sumNbParticipantsHommeMineur: {
				$sum: '$nbParticipantsHommeMineur'
			},
			sumNbParticipantsFemmeMineur: {
				$sum: '$nbParticipantsFemmeMineur'
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activite.aggregate(query);

var query = [
	{
		$project: {
			nomInstallation: '$installation.nomInstallation',
			nomActivite: '$activite.libelleActivite',
			idAct: '$idAct',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			nbParticipantsHommeMineur: '$nbParticipantsHommeMineur',
			nbParticipantsFemmeMineur: '$nbParticipantsFemmeMineur'
		}
	},
	{
		$group: {
			_id: {
				nomInstallation: '$nomInstallation',
				nomActivite: '$nomActivite'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			sumNbParticipantsHommeMineur: {
				$sum: '$nbParticipantsHommeMineur'
			},
			sumNbParticipantsFemmeMineur: {
				$sum: '$nbParticipantsFemmeMineur'
			},
			nbFoixActivitePratiquee: {
				$sum: 1
			}
		}
	}
];

db.fait_activite.aggregate(query);

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
			},
			sumNbParticipantsHommeMineur: {
				$sum: '$nbParticipantsHommeMineur'
			},
			sumNbParticipantsFemmeMineur: {
				$sum: '$nbParticipantsFemmeMineur'
			}
		}
	}
];

db.fait_activite.aggregate(query);
