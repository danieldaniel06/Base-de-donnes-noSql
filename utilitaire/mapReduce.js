db.fait_activites.aggregate([
	{
		$match: {
			idInst: {
				$ne: null
			}
		}
	},
	{
		$group: {
			_id: {
				idAct: '$idAct'
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
				$sum: NumberInt('1')
			}
		}
	},
	{
		$lookup: {
			from: 'activites',
			localField: '_id.idAct',
			foreignField: 'idActivite',
			as: 'activite'
		}
	},

	{
		$project: {
			nomInstallation: 'null',
			nomActivite: { $arrayElemAt: ['$activite.libelleActivite', 0] },
			sumNbParticipantsHomme: '$sumNbParticipantsHomme',
			sumNbParticipantsFemme: '$sumNbParticipantsFemme',
			sumNbParticipantsHommeMineur: '$sumNbParticipantsHommeMineur',
			sumNbParticipantsFemmeMineur: '$sumNbParticipantsFemmeMineur',
			nbFoixActivitePratiquee: '$nbFoixActivitePratiquee'
		}
	}
]);

db.fait_activites.aggregate([
	{
		$match: {
			idInst: {
				$ne: null
			}
		}
	},
	{
		$group: {
			_id: {
				idInst: '$idInst'
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
				$sum: NumberInt('1')
			}
		}
	},
	{
		$lookup: {
			from: 'installations',
			localField: '_id.idInst',
			foreignField: 'idInstallation',
			as: 'installation'
		}
	},
	{
		$project: {
			nomInstallation: { $arrayElemAt: ['$installation.nomInstallation', 0] },
			nomActivite: 'null',
			sumNbParticipantsHomme: '$sumNbParticipantsHomme',
			sumNbParticipantsFemme: '$sumNbParticipantsFemme',
			sumNbParticipantsHommeMineur: '$sumNbParticipantsHommeMineur',
			sumNbParticipantsFemmeMineur: '$sumNbParticipantsFemmeMineur',
			nbFoixActivitePratiquee: '$nbFoixActivitePratiquee'
		}
	}
]);

db.fait_activites.aggregate([
	{
		$match: {
			idInst: {
				$ne: null
			}
		}
	},
	{
		$group: {
			_id: {
				idInst: '$idInst',
				idAct: '$idAct'
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
				$sum: NumberInt('1')
			}
		}
	},
	{
		$lookup: {
			from: 'installations',
			localField: '_id.idInst',
			foreignField: 'idInstallation',
			as: 'installation'
		}
	},
	{
		$lookup: {
			from: 'activites',
			localField: '_id.idAct',
			foreignField: 'idActivite',
			as: 'activite'
		}
	},
	{
		$project: {
			nomInstallation: { $arrayElemAt: ['$installation.nomInstallation', 0] },
			nomActivite: { $arrayElemAt: ['$activite.libelleActivite', 0] },
			sumNbParticipantsHomme: '$sumNbParticipantsHomme',
			sumNbParticipantsFemme: '$sumNbParticipantsFemme',
			sumNbParticipantsHommeMineur: '$sumNbParticipantsHommeMineur',
			sumNbParticipantsFemmeMineur: '$sumNbParticipantsFemmeMineur',
			nbFoixActivitePratiquee: '$nbFoixActivitePratiquee'
		}
	}
]);
