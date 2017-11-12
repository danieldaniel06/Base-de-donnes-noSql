var query = [
	{
		$project: {
			nomActivite: '$activite.libAct',
			nomIns: '$installation.nomInstallation',

			month: '$date.month',
			year: '$date.year',
			specTotal: { $sum: ['$nbSpectateursHomme', '$nbSpectateursHomme'] }
		}
	},
	{
		$match: { $and: [{ month: { $gt: 5, $lt: 10 } }, { year: 2017 }] }
	},
	{
		$group: {
			_id: {
				nomActivite: '$nomActivite'
			},
			NbSpectateursTotaux: { $sum: '$specTotal' }
		}
	},
	{
		$sort: { NbSpectateursTotaux: -1 }
	},
	{
		$limit: 10
	}
];

db.fait_activite.aggregate(query);
