/*les activités qui attirent le plus de spectateurs sur une periode de temps et dans un departement choisit
(Periode de temps : l'été 2016 c'est a dire de Juin a Septembre 2016)
(Departement Paris; code departement=75)
(activite : nom et niveau)*/

var query = [
	{
		$project: {
			nivActivite: '$activite.libNivAct',
			nomActivite: '$activite.libAct',
			nomIns: '$installation.nomInstallation',

			month: '$date.month',
			year: '$date.year',
			SpectateursHomme: '$nbSpectateursHomme',
			SpectateursFemme: '$nbSpectateursFemme',
			specTotal: { $sum: ['$nbSpectateursHomme', '$nbSpectateursHomme'] }
		}
	},
	{
		$match: { $and: [{ month: { $gt: 5, $lt: 10 } }, { year: 2017 }] }
	},
	{
		$group: {
			_id: {
				niveau: '$nivActivite',
				nomActivite: '$nomActivite',
				dep: '$depIns',
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
