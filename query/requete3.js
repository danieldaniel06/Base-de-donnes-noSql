/*les activités qui attirent le plus de spectateurs sur une periode de temps et dans un departement choisit
(Periode de temps : l'été 2016 c'est a dire de Juin a Septembre 2015)
(Departement Paris; code departement=75)
(activite : nom et niveau)*/

var query = [
	{
		$project: {
			nivActivite: '$niveau',
			nomActivite: '$libAct',
			codeDep: '$installation.codeDep',
			nomIns: '$installation.nomInst',

			month: '$date.month',
			year: '$date.year',
			specTotal: { $sum: ['$nbSpectateursHomme', '$nbSpectateursHomme'] }
		}
	},
	{
		$match: {
			$and: [
				{
					month: {
						$gte: 5,
						$lte: 10
					}
				},
				{
					year: 2015
				}
			]
		}
	},
	{
		$group: {
			_id: {
				niveau: '$nivActivite',
				nomActivite: '$nomActivite',
				dep: '$codeDep',
				mois: '$month',
				annee: '$year'
			},
			NbSpectateursTotaux: { $sum: '$specTotal' }
		}
	},
	{
		$sort: { NbSpectateursTotaux: -1 }
	}
];

db.fait_activites.aggregate(query);
