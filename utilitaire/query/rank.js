var query = [
	{
		$sort: {
			cout: -1
		}
	},
	{
		$group: {
			_id: false,
			totalCout: { $sum: 'cout' },
			activites: {
				$push: {
					_id: '$_id',
					cout: '$cout'
				}
			}
		}
	}
];

db.fait_activites.aggregate(query);
