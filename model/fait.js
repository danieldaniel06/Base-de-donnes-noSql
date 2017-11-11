var mongoose = require('mongoose');
global = require('../global');

var faitActiviteSchema = mongoose.Schema({
	idEqu: {
		type: Number
	},
	idAct: {
		type: Number
	},
	idInst: {
		type: String
	},
	nbParticipantsHomme: {
		type: Number
	},
	nbSpectateursHomme: {
		type: Number
	},
	nbSpectateursFemme: {
		type: Number
	},
	idDate: {
		type: String
	}
});

var FaiActivite = (module.exports = mongoose.model(global.faitCollection, faitActiviteSchema));

// les activites pratiquées
module.exports.getFaitActivite = function(callback, limit) {
	FaiActivite.find(callback).limit(limit);
};

// les activites pratiquées groupée par installation
module.exports.getFaitActiviteGroupByInst = function(callback, year) {
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
					nomInstallation: '$nomInstallation'
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
	if (year) {
		var copy = query;
		query = [
			{
				$match: { 'idDate.year': parseInt(year) }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaiActivite.aggregate(query).exec(callback);
};

// les activites pratiquées groupée par activite
module.exports.getFaitActiviteGroupByActivite = function(callback, year) {
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
	if (year) {
		var copy = query;
		query = [
			{
				$match: { 'idDate.year': parseInt(year) }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaiActivite.aggregate(query).exec(callback);
};

// les activites pratiquées groupée par installation et activite
module.exports.getFaitActiviteGroupByInstActivite = function(callback) {
	FaiActivite.aggregate([
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
		},
		{
			$sort: { nbFoixActivitePratiquee: -1 }
		}
	]).exec(callback);
};
