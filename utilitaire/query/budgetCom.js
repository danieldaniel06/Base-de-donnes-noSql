/**
 * Rollup
 */

var mapComDate = function() {
	var date = this.date;
	var equipement = this.equipement;
	if (equipement && date) {
		emit({ commune: equipement.libCom, annee: date.year }, { totalBudget: this.budget });
		emit({ commune: equipement.libCom }, { totalBudget: this.budget });
		emit(null, { totalBudget: this.budget });
	}
};

var reduceComDate = function(key, budgets) {
	var totalBudget = 0;
	budgets.forEach(function(budget) {
		if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
	});

	return {
		totalBudget: totalBudget
	};
};

db.fait_activites.mapReduce(mapComDate, reduceComDate, {
	out: 'cubeBudgetComAnnee'
});

db.cubeBudgetComAnnee.find().forEach(printjson);
