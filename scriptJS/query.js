var mapGroupInst = function() {
	emit(this.installation, { nbParticipantsHomme: this.nbParticipantsHomme });
	emit(this.idEqu, { nbParticipantsHomme: this.nbParticipantsHomme });
	emit({ act: this.idEqu, inst: this.installation }, { nbParticipantsHomme: this.nbParticipantsHomme });
};

var reduceGroupInst = function(keyInst, valuesnbParticipantsHomme) {
	var count = 0;
	for (var i = 0; i < valuesnbParticipantsHomme.length; i++) {
		count += valuesnbParticipantsHomme[i].nbParticipantsHomme;
	}
	return { nbParticipantsHomme: count };
};

db.fait_activite.mapReduce(mapGroupInst, reduceGroupInst, {
	out: 'groupByInst',
	query: {
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
});

db.groupByInst.find();

// Group by installation et activite
var mapGroupInstAct = function() {
	emit(
		{ inst: this.idInst, act: this.idAct },
		{ nbParticipantsHomme: this.nbParticipantsHomme, nbFoisActivitePratique: 1 }
	);
};

var reduceGroupInstAct = function(key, values) {
	var count = 0;
	var countNbFoisActivitePratique = 0;
	for (var i = 0; i < values.length; i++) {
		count += values[i].nbParticipantsHomme;
		countNbFoisActivitePratique += values[i].nbFoisActivitePratique;
	}
	return { nbParticipantsHomme: count, nbFoisActivitePratique: countNbFoisActivitePratique };
};

db.fait_activites.mapReduce(mapGroupInstAct, reduceGroupInstAct, { out: 'groupByInstAct' });

db.groupByInstAct.find();

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

// Groupage par mois et activite
db.fait_activites.aggregate([
	{
		$lookup: {
			from: 'dates',
			localField: 'idDate',
			foreignField: '_id',
			as: 'date'
		}
	},
	{
		$project: {
			mois: { $arrayElemAt: ['$date.mois', 0] },
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
				mois: '$mois',
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
			mois: '$_id.mois',
			nomActivite: { $arrayElemAt: ['$activite.libelleActivite', 0] },
			sumNbParticipantsHomme: '$sumNbParticipantsHomme',
			sumNbParticipantsFemme: '$sumNbParticipantsFemme',
			sumNbParticipantsHommeMineur: '$sumNbParticipantsHommeMineur',
			sumNbParticipantsFemmeMineur: '$sumNbParticipantsFemmeMineur',
			nbFoixActivitePratiquee: '$nbFoixActivitePratiquee'
		}
	}
]);

/**
 * Somme de
 */
db.fait_activites.aggregate([
	{
		$match: { 'idDate.year': 2005 }
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
]);
