var query = [{
		$project: {
			nomActivite: '$activite.libAct',
			nomIns: '$installation.nomInstallation',

			month: '$date.month',
			year: '$date.year',
			specTotal: {
				$sum: ['$nbSpectateursHomme', '$nbSpectateursHomme']
			}
		}
	},
	{
		$match: {
			$and: [{
				month: {
					$gte: 5,
					$lte: 10
				}
			}, {
				year: {
					$gte: 2017,
					$lte: 2017
				}
			}]
		}
	},
	{
		$group: {
			_id: {
				nomActivite: '$nomActivite'
			},
			NbSpectateursTotaux: {
				$sum: '$specTotal'
			}
		}
	},
	{
		$sort: {
			NbSpectateursTotaux: -1
		}
	},
	{
		$limit: 10
	}
];

db.fait_activite.aggregate(query);