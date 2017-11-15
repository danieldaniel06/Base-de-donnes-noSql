/**
 */

var niveau = 'Scolaire';

var rollupBudgetDepAnnee = function(niveau) {
	var query1 = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$date.year',
				budget: '$budget',
				niveau: '$niveau'
			}
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

	db.fait_activites.aggregate(query1).forEach(printjson);

	var query2 = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$annee',
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

	db.fait_activites.aggregate(query2).forEach(printjson);

	var query4 = [
		{
			$match: { niveau: niveau }
		},
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

	db.fait_activites.aggregate(query4).forEach(printjson);

	query3 = [
		{
			$match: { niveau: niveau }
		},
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

	db.fait_activites.aggregate(query3).forEach(printjson);
};

var rollupBudgetCommAnnee = function(niveau) {
	var query1 = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libCom: '$equipement.libCom',
				annee: '$date.year',
				budget: '$budget'
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
				}
			}
		}
	];

	db.fait_activites.aggregate(query1).forEach(printjson);

	var query2 = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libCom: '$equipement.libCom',
				budget: '$budget'
			}
		},
		{
			$group: {
				_id: {
					libCom: '$libCom'
				},
				totalBudget: {
					$sum: '$budget'
				}
			}
		}
	];

	db.fait_activites.aggregate(query2).forEach(printjson);

	query3 = [
		{
			$match: { niveau: niveau }
		},
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

	db.fait_activites.aggregate(query3).forEach(printjson);
};
