/**
 * Rollup
 */

var mapDepDate = function() {
	var equipement = this.equipement;
	var date = this.date;
	if (equipement && date) {
		emit({ libDep: equipement.libDep, annee: date.year }, { totalBudget: this.budget });
		emit({ libDep: equipement.libDep }, { totalBudget: this.budget });
		emit(null, { totalBudget: this.budget });
	}
};

var reduceDepDate = function(key, budgets) {
	var totalBudget = 0;
	budgets.forEach(function(budget) {
		if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
	});
	return {
		totalBudget: totalBudget
	};
};

db.fait_activites.mapReduce(mapDepDate, reduceDepDate, {
	out: 'cubeBudgetDepAnnee',
	query: {
		niveau: 'Scolaire'
	}
});

db.cubeBudgetDepAnnee.find().forEach(printjson);
