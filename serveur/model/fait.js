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
	var query = {};

	obj.map = function() {
		var equipement = this.equipement;
		var date = this.date;
		if (equipement && date) {
			emit(
				{ libDep: equipement.libDep, annee: date.year },
				{ totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) }
			);
			emit(
				{ libDep: equipement.libDep },
				{ totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) }
			);
			emit(null, { totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) });
		}
	};

	obj.reduce = function(key, budgets) {
		var totalBudget = 0;
		var totalCout = 0;
		budgets.forEach(function(budget) {
			if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
			if (budget.totalCout) totalCout += parseFloat(budget.totalCout);
		});
		return {
			totalBudget: totalBudget,
			totalCout: totalCout
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
	var query = {};
	obj.map = function() {
		var date = this.date;
		var equipement = this.equipement;
		if (equipement && date) {
			emit(
				{ commune: equipement.libCom, annee: date.year },
				{ totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) }
			);
			emit(
				{ commune: equipement.libCom },
				{ totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) }
			);
			emit(null, { totalBudget: parseFloat(this.budget), totalCout: parseFloat(this.cout) });
		}
	};

	obj.reduce = function(key, budgets) {
		var totalBudget = 0;
		var totalCout = 0;
		var query = {};
		budgets.forEach(function(budget) {
			if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
			if (budget.totalCout) totalCout += parseFloat(budget.totalCout);
		});

		return {
			totalBudget: totalBudget,
			totalCout: totalCout
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
				nomInst: '$installation.nomInst',
				nbParticipantsHomme: '$nbParticipantsHomme',
				nbParticipantsFemme: '$nbParticipantsFemme',
				nbSpectateursHomme: '$nbSpectateursHomme',
				nbSpectateursFemme: '$nbSpectateursFemme',
				mois: '$date.month',
				year: '$date.year'
			}
		},
		{
			$match: { nomInst: { $ne: null } }
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
				},
				sumNbSpectateursHomme: {
					$sum: '$nbSpectateursHomme'
				},
				sumNbSpectateursFemme: {
					$sum: '$nbSpectateursFemme'
				}
			}
		},
		{
			$project: {
				totalParticipantsHomme: '$sumNbParticipantsHomme',
				totalParticipantsFemme: '$sumNbParticipantsFemme',
				totalParticipants: {
					$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
				},
				totalSpectateursHomme: '$sumNbSpectateursHomme',
				totalSpectateursFemme: '$sumNbSpectateursFemme',
				totalSpectateurs: {
					$sum: ['$sumNbSpectateursHomme', '$sumNbSpectateursFemme']
				},
				total: {
					$sum: [
						'$sumNbSpectateursHomme',
						'$sumNbSpectateursFemme',
						'$sumNbParticipantsHomme',
						'$sumNbParticipantsFemme'
					]
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
				nomInst: '$installation.nomInst',
				mois: '$date.month',
				year: '$date.year',
				nbSpectateursHomme: '$nbSpectateursHomme',
				nbSpectateursFemme: '$nbSpectateursFemme',
				nbParticipantsHomme: '$nbParticipantsHomme',
				nbParticipantsFemme: '$nbParticipantsFemme'
			}
		},
		{
			$match: { nomInst: { $ne: null } }
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
				},
				sumNbSpectateursHomme: {
					$sum: '$nbSpectateursHomme'
				},
				sumNbSpectateursFemme: {
					$sum: '$nbSpectateursFemme'
				}
			}
		},
		{
			$project: {
				totalParticipantsHomme: '$sumNbParticipantsHomme',
				totalParticipantsFemme: '$sumNbParticipantsFemme',
				totalParticipants: {
					$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
				},
				totalSpectateursHomme: '$sumNbSpectateursHomme',
				totalSpectateursFemme: '$sumNbSpectateursFemme',
				totalSpectateurs: {
					$sum: ['$sumNbSpectateursHomme', '$sumNbSpectateursFemme']
				},
				total: {
					$sum: [
						'$sumNbSpectateursHomme',
						'$sumNbSpectateursFemme',
						'$sumNbParticipantsHomme',
						'$sumNbParticipantsFemme'
					]
				},
				total: {
					$sum: [
						'$sumNbSpectateursHomme',
						'$sumNbSpectateursFemme',
						'$sumNbParticipantsHomme',
						'$sumNbParticipantsFemme'
					]
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
				nomInst: '$installation.nomInst',
				nbSpectateursHomme: '$nbSpectateursHomme',
				nbSpectateursFemme: '$nbSpectateursFemme',
				nbParticipantsHomme: '$nbParticipantsHomme',
				nbParticipantsFemme: '$nbParticipantsFemme',
				mois: '$date.month',
				year: '$date.year'
			}
		},
		{
			$match: { nomInst: { $ne: null } }
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
				},
				sumNbSpectateursHomme: {
					$sum: '$nbSpectateursHomme'
				},
				sumNbSpectateursFemme: {
					$sum: '$nbSpectateursFemme'
				}
			}
		},
		{
			$project: {
				totalParticipantsHomme: '$sumNbParticipantsHomme',
				totalParticipantsFemme: '$sumNbParticipantsFemme',
				totalParticipants: {
					$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
				},
				totalSpectateursHomme: '$sumNbSpectateursHomme',
				totalSpectateursFemme: '$sumNbSpectateursFemme',
				totalSpectateurs: {
					$sum: ['$sumNbSpectateursHomme', '$sumNbSpectateursFemme']
				},
				total: {
					$sum: [
						'$sumNbSpectateursHomme',
						'$sumNbSpectateursFemme',
						'$sumNbParticipantsHomme',
						'$sumNbParticipantsFemme'
					]
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
			$project: {
				nbParticipantsHomme: '$nbParticipantsHomme',
				nbParticipantsFemme: '$nbParticipantsFemme',
				nbSpectateursHomme: '$nbSpectateursHomme',
				nbSpectateursFemme: '$nbSpectateursFemme',
				year: '$date.year',
				inst: '$installation'
			}
		},
		{
			$match: { inst: { $ne: null } }
		},
		{
			$group: {
				_id: false,
				sumNbParticipantsHomme: {
					$sum: '$nbParticipantsHomme'
				},
				sumNbParticipantsFemme: {
					$sum: '$nbParticipantsFemme'
				},
				sumNbSpectateursHomme: {
					$sum: '$nbSpectateursHomme'
				},
				sumNbSpectateursFemme: {
					$sum: '$nbSpectateursFemme'
				}
			}
		},
		{
			$project: {
				totalParticipantsHomme: '$sumNbParticipantsHomme',
				totalParticipantsFemme: '$sumNbParticipantsFemme',
				totalParticipants: {
					$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
				},
				totalSpectateursHomme: '$sumNbSpectateursHomme',
				totalSpectateursFemme: '$sumNbSpectateursFemme',
				totalSpectateurs: {
					$sum: ['$sumNbSpectateursHomme', '$sumNbSpectateursFemme']
				},
				total: {
					$sum: [
						'$sumNbSpectateursHomme',
						'$sumNbSpectateursFemme',
						'$sumNbParticipantsHomme',
						'$sumNbParticipantsFemme'
					]
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

module.exports.budgetGroupDepAnneeNiveau = function(callback, niveau) {
	var query = [
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$date.year',
				budget: '$budget',
				niveau: '$niveau'
			}
		},
		{
			$match: { libDep: { $ne: null } }
		},
		{
			$group: {
				_id: {
					libDep: '$libDep',
					annee: '$annee',
					niveau: '$niveau'
				},
				totalBudget: {
					$sum: '$budget'
				}
			}
		}
	];

	if (niveau) {
		var copy = query;
		query = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}

	FaitActivite.aggregate(query).exec(callback);
};
module.exports.budgetGroupDepAnnee = function(callback, niveau) {
	var query = [
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$date.year',
				budget: '$budget'
			}
		},
		{
			$group: {
				_id: {
					libDep: '$libDep',
					annee: '$annee'
				},
				totalBudget: {
					$sum: '$budget'
				}
			}
		}
	];

	if (niveau) {
		var copy = query;
		query = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}

	FaitActivite.aggregate(query).exec(callback);
};
module.exports.budgetGroupDep = function(callback, niveau) {
	var query = [
		{
			$project: {
				libDep: '$equipement.libDep',
				budget: '$budget'
			}
		},
		{
			$group: {
				_id: {
					libDep: '$libDep'
				},
				totalBudget: {
					$sum: '$budget'
				}
			}
		}
	];
	if (niveau) {
		var copy = query;
		query = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}

	FaitActivite.aggregate(query).exec(callback);
};
module.exports.groupTopBudget = function(callback, niveau) {
	query = [
		{
			$project: {
				budget: '$budget'
			}
		},
		{
			$group: {
				_id: false,
				totalBudget: {
					$sum: '$budget'
				}
			}
		}
	];
	if (niveau) {
		var copy = query;
		query = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query.push(doc);
		});
	}
	FaitActivite.aggregate(query).exec(callback);
};


var query = [
	{
		$project: {
			libCom: '$equipement.libCom',
			annee: '$date.year',
			budget: '$budget',
			niveau: '$niveau',
			cout: '$cout'
		}
	},
	{
		$group: {
			_id: {
				libCom: '$libCom',
				annee: '$annee'
			},
			totalBudget: {
				$sum: '$budget'
			},
			totalCout: {
				$sum: '$cout'
			}
		} 
	}
];


module.exports.groupComAnnee = function(callback, niveau){
	var query1 = query;
	query1[1].$group._id = {
		libCom: '$libCom',
		annee: '$annee'
	}
	query1.push(
		{
			$sort:{'_id.libCom':-1}
		}
	)
	
	if (niveau && !query1[0].$match) {
		var copy = query1;
		query1 = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query1.push(doc);
		});
	}else if(niveau && query1[0].$match){
		query1[0].$match.niveau = niveau;
	}
	FaitActivite.aggregate(query1).exec(callback);
}

module.exports.groupCom = function(callback, niveau){
	var query1 = query;

	delete query1[1].$group._id.annee;

	if (niveau && !query1[0].$match) {
		var copy = query1;
		query1 = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query1.push(doc);
		});
	}else if(niveau && query1[0].$match){
		query1[0].$match.niveau = niveau;
	}
	FaitActivite.aggregate(query1).exec(callback);
}

module.exports.groupComAnneeTotal = function(callback, niveau){
	var query1 = query;
	query1[1].$group._id = false;

	if (niveau && !query1[0].$match) {
		var copy = query1;
		query1 = [
			{
				$match: { niveau: niveau }
			}
		];
		copy.forEach(function(doc) {
			query1.push(doc);
		});
	}else if(niveau && query1[0].$match){
		query1[0].$match.niveau = niveau;
	}
	FaitActivite.aggregate(query1).exec(callback);
}
