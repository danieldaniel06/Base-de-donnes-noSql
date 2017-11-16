/**
 * Ici nous avons une requête qui est sur trois dimentions (equipement, date, niveau)
 * Cette requête représente un Rollup. C'est dans la même logique que la précedente mais ici nous faisons un drill-down
 * (nous passons de departement à commune) ce qui fait que nous avons plus de détails.
 * Nous voulons savoir ici l'évolution du budget aloué/ cout généré des activités sprtifs par commune, année, niveau;
 * par commune, année; par commune et le total du budget/cout
 * 
 * 
 * Execution sur mongo :
 * 		- Se place dans le fichier query avec le terminal
 * 		- Lancer mongo
 * 		- Se placer dans la base de données ou se trouve la collection
 * 		- Faire load('budgetCom.js')
 * 		- Pour voir le résultat, copier et coller la dernière ligne sur la console mongo et taper entrer
 * 
 * @param {*} niveau 
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
