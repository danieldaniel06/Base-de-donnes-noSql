/**
 * Rollup
 */

var mapComDate = function() {
	var date = this.date;
	var equipement = this.equipement;
	if (equipement && date) {
		emit(
			{ commune: equipement.libCom, annee: date.year, niveau: this.niveau },
			{ totalBudget: this.budget, totalCoup: this.cout }
		);
		emit({ commune: equipement.libCom, annee: date.year }, { totalBudget: this.budget, totalCoup: this.cout });
		emit({ commune: equipement.libCom }, { totalBudget: this.budget, totalCoup: this.cout });
		emit(null, { totalBudget: this.budget, totalCoup: this.cout });
	}
};

var reduceComDate = function(key, budgets) {
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

db.fait_activites.mapReduce(mapComDate, reduceComDate, {
	out: { inline: 1 },
	query: {
		niveau: 'Scolaire'
	}
});

db.cubeBudgetComAnnee.find().forEach(printjson);
