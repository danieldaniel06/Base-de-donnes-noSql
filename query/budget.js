/**
 * Ici nous avons une requête qui est sur trois dimentions (équipements, date, niveau), la même que le budget avec aggregate 
 * mais ici, nous utilisons mapRéduce. Le résultat est le même.
 * Cette requête représente un Rollup
 * Nous voulons savoir ici l'évolution du budget aloué/ cout généré des activités sprtifs par departement, année, niveau;
 * par departement, année; par département et le total du budget/cout
 * 
 * Execution sur mongo :
 * 		- Se place dans le fichier query avec le terminal
 * 		- Lancer mongo
 * 		- Se placer dans la base de données ou se trouve la collection
 * 		- Faire load('budget.js')
 * 		- Pour voir le résultat, copier et coller la dernière ligne sur la console mongo et taper entrer
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
