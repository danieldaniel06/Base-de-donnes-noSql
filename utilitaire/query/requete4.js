/**
 * les activités qui attirent le plus de spectateurs sur une periode de temps et dans un departement choisit
 *(ici on a choisit une saison : l'été 2016 c'est a dire de Juin a Septembre 2016)
 *(ici Paris; code departement=75)
 */

var query = [
	{
		$project: {
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
