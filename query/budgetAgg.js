var niveau = 'Scolaire';

/**
 * Ici nous avons une requête qui est sur trois dimentions (équipements, date, niveau)
 * Cette requête représente un Rollup
 * Nous voulons savoir ici l'évolution du budget aloué/ cout généré des activités sprtifs par departement, année, niveau;
 * par departement, année; par département et le total du budget/cout
 * 
 * Execution sur mongo :
 * 		- Se place dans le fichier query avec le terminal
 * 		- Lancer mongo
 * 		- Se placer dans la base de données ou se trouve la collection
 * 		- Faire load('budgetAgg.js')
 * 		- Faire rollupBudgetDepAnneeNiveau(niveau) niveau étatant un paramètre
 * 
 * @param {*} niveau 
 */

var rollupBudgetDepAnneeNiveau = function(niveau) {
	var query = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$date.year',
				budget: '$budget',
				niveau: '$niveau',
				cout: '$cout'
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
				},
				totalCout: {
					$sum: '$cout'
				}
			}
		}
	];

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.niveau;

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.annee;

	db.fait_activites.aggregate(query).forEach(printjson);

	query[2].$group._id = false;

	db.fait_activites.aggregate(query).forEach(printjson);
};

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
 * 		- Faire load('budgetAgg.js')
 * 		- Faire rollupBudgetCommAnneeNiveau(niveau) niveau étatant un paramètre
 * 
 * @param {*} niveau 
 */

var rollupBudgetCommAnneeNiveau = function(niveau) {
	var query = [
		{
			$match: { niveau: niveau }
		},
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
					annee: '$annee',
					niveau: '$niveau'
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

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.niveau;

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.annee;

	db.fait_activites.aggregate(query).forEach(printjson);

	query[2].$group._id = false;

	db.fait_activites.aggregate(query).forEach(printjson);
};
