/**
 * Top N des activités selon le nombre de spactateurs
 */

var N = 10;

var query = [
	{
		$project: {
			nomActivite: '$libAct',
			nomIns: '$installation.nomInst',
			codeDep: '$installation.codeDep',
			month: '$date.month',
			year: '$date.year',
			specTotal: {
				$sum: ['$nbSpectateursHomme', '$nbSpectateursHomme']
			}
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
					year: {
						$gte: 2005,
						$lte: 2017
					}
				}
			]
		}
	},
	{
		$group: {
			_id: {
				nomActivite: '$nomActivite',
				nomInstallation: '$nomIns',
				codeDep: '$codeDep'
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
		$limit: N
	}
];

db.fait_activites.aggregate(query);
