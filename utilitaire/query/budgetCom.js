/**
 * Rollup
 */

var mapComDate = function() {
	var installation = this.installation;
	var date = this.date;
	var equipement = this.equipement;
	if (installation && date) {
		emit({ commune: installation.commune, annee: date.year }, { totalBudget: this.budget });
		emit({ commune: installation.commune }, { totalBudget: this.budget });
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
	out: 'cubeBudgetComAnnee',
	query: {
		niveau: 'Scolaire'
	}
});

db.cubeBudgetComAnnee.find().forEach(printjson);
