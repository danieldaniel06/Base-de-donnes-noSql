var mongoose = require('mongoose');
mongoose.set('debug', true);

global = require('../global');

var faitActiviteSchema = mongoose.Schema({
	idEqu: {
		type: Object
	},
	activite: {
		type: Object
	},
	installation: {
		type: Object
	},
	nbParticipantsFemme: {
		type: Number
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
	date: {
		type: Object
	}
});

var FaitActivite = (module.exports = mongoose.model(global.faitCollection, faitActiviteSchema));

module.exports.getStatBudgetDep = function(callback, niveau) {
	var obj = {};

	obj.map = function() {
		var equipement = this.equipement;
		var date = this.date;
		if (equipement && date) {
			emit({ libDep: equipement.libDep, annee: date.year }, { totalBudget: parseFloat(this.budget) });
			emit({ libDep: equipement.libDep }, { totalBudget: parseFloat(this.budget) });
			emit(null, { totalBudget: parseFloat(this.budget) });
		}
	};

	obj.reduce = function(key, budgets) {
		var totalBudget = 0;
		budgets.forEach(function(budget) {
			if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
		});
		return {
			totalBudget: totalBudget
		};
	};

	if (niveau) {
		query = {
			niveau: niveau
		};
	}

	obj.query = query;

	FaitActivite.mapReduce(obj, callback);
};

module.exports.getStatBudgetCommAnne = function(callback, niveau) {
	var obj = {};

	obj.map = function() {
		var installation = this.installation;
		var date = this.date;
		var equipement = this.equipement;
		if (installation && date) {
			emit({ commune: installation.commune, annee: date.year }, { totalBudget: parseFloat(this.budget) });
			emit({ commune: installation.commune }, { totalBudget: parseFloat(this.budget) });
			emit(null, { totalBudget: parseFloat(this.budget) });
		}
	};

	obj.reduce = function(key, budgets) {
		var totalBudget = 0;
		var query = {};
		budgets.forEach(function(budget) {
			if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
		});

		return {
			totalBudget: totalBudget
		};
	};

	if (niveau) {
		query = {
			niveau: niveau
		};
	}

	obj.query = query;

	FaitActivite.mapReduce(obj, callback);
};

module.exports.getTopNSpectateurAct = function(callback, limit, dateDebut, dateFin) {
	var query = [
		{
			$project: {
				nomActivite: '$libAct',
				nomIns: '$installation.nomInst',

				month: '$date.month',
				year: '$date.year',
				specTotal: {
					$sum: ['$nbSpectateursHomme', '$nbSpectateursHomme']
				}
			}
		},
		{
			$match: {
				$and: [
					{
						month: {
							$gte: dateDebut.getMonth(),
							$lte: dateFin.getMonth()
						}
					},
					{
						year: {
							$gte: dateDebut.getFullYear(),
							$lte: dateFin.getFullYear()
						}
					}
				]
			}
		},
		{
			$group: {
				_id: {
					nomActivite: '$nomActivite'
				},
				NbSpectateursTotaux: {
					$sum: '$specTotal'
				}
			}
		},
		{
			$sort: {
				NbSpectateursTotaux: -1
			}
		},
		{
			$limit: parseInt(limit)
		}
	];

	FaitActivite.aggregate(query).exec(callback);
};

// les activites pratiquées
module.exports.getFaitActivite = function(callback, limit) {
	FaitActivite.find(callback).limit(limit);
};

// les activites pratiquées groupée par installation
module.exports.getFaitActiviteGroupByInst = function(callback, year) {
	var query = [
		{
			$project: {
				nomInstallation: '$installation.nomInst',
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
	if (year) {
		var copy = query;
		query = [
			{
				$match: { 'date.year': parseInt(year) }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaitActivite.aggregate(query).exec(callback);
};

// les activites pratiquées groupée par activite
module.exports.getFaitActiviteGroupByActivite = function(callback, year) {
	var query = [
		{
			$project: {
				nomActivite: '$libAct',
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
	if (year) {
		var copy = query;
		query = [
			{
				$match: { 'date.year': parseInt(year) }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaitActivite.aggregate(query).exec(callback);
};

// les activites pratiquées groupée par installation et activite
module.exports.getFaitActiviteGroupByInstActivite = function(callback, year) {
	var query = [
		{
			$project: {
				nomInstallation: '$installation.nomInst',
				nomActivite: '$libAct',
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
			$sort: { '_id.nomInst': -1 }
		}
	];
	if (year) {
		var copy = query;
		query = [
			{
				$match: { 'date.year': parseInt(year) }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaitActivite.aggregate(query).exec(callback);
};

module.exports.getTotatGroupActInst = function(callback, year) {
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

	FaitActivite.aggregate(query).exec(callback);
};
