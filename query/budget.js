/**
 * Rollup
 */

var mapDepDate = function() {
	var equipement = this.equipement;
	var date = this.date;
	if (equipement && date) {
		emit(
			{ libDep: equipement.libDep, annee: date.year, niveau: this.niveau },
			{ totalBudget: this.budget, totalCoup: this.cout }
		);
		emit({ libDep: equipement.libDep, annee: date.year }, { totalBudget: this.budget, totalCoup: this.cout });
		emit({ libDep: equipement.libDep }, { totalBudget: this.budget, totalCoup: this.cout });
		emit(null, { totalBudget: this.budget, totalCoup: this.cout });
	}
};

var reduceDepDate = function(key, budgets) {
	var totalBudget = 0;
	var totalCoup = 0;
	budgets.forEach(function(budget) {
		if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
		if (budget.totalCoup) totalCoup += parseFloat(budget.totalCoup);
	});

	return {
		totalBudget: totalBudget,
		totalCoup: totalCoup
	};
};

db.fait_activites.mapReduce(mapDepDate, reduceDepDate, {
	out: { inline: 1 },
	query: {
		niveau: 'Scolaire'
	}
});

//db.cubeBudgetDepAnnee.find().forEach(printjson);
