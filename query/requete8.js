var query = [
	{
		$group: {
			_id: {
				libDep: '$equipement.libDep'
			},
			toTatalActivite: {
				$sum: 1
			}
		}
	}
];

db.fait_activites.aggregate(query);
