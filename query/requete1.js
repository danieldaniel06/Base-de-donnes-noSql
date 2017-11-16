/**
 * L'enssemble de ces requête nous permet de faire un cube OLAP sur deux dimentions qui sont : date et Installation
 * Ici nous cherchons à savoir quelle est le nombre de participant selon différentes dimension sur une année
 */

var year = 2017;

var query = [
	{
		$project: {
			nomInst: '$installation.nomInst',
			nbSpectateursHomme: '$nbSpectateursHomme',
			nbSpectateursFemme: '$nbSpectateursFemme',
			nbParticipantsHomme: '$nbParticipantsHomme',
			nbParticipantsFemme: '$nbParticipantsFemme',
			mois: '$date.month',
			year: '$date.year'
		}
	},
	{
		$match: { $and: [{ year: year }, { nomInst: { $ne: null } }] }
	},
	{
		$group: {
			_id: {
				nomInst: '$nomInst',
				mois: '$mois'
			},
			sumNbParticipantsHomme: {
				$sum: '$nbParticipantsHomme'
			},
			sumNbParticipantsFemme: {
				$sum: '$nbParticipantsFemme'
			},
			sumNbSpectateursHomme: {
				$sum: '$nbSpectateursHomme'
			},
			sumNbSpectateursFemme: {
				$sum: '$nbSpectateursFemme'
			}
		}
	},
	{
		$project: {
			totalParticipantsHomme: '$sumNbParticipantsHomme',
			totalParticipantsFemme: '$sumNbParticipantsFemme',
			totalParticipants: {
				$sum: ['$sumNbParticipantsHomme', '$sumNbParticipantsFemme']
			},
			totalSpectateursHomme: '$sumNbSpectateursHomme',
			totalSpectateursFemme: '$sumNbSpectateursFemme',
			totalSpectateurs: {
				$sum: ['$sumNbSpectateursHomme', '$sumNbSpectateursFemme']
			},
			total: {
				$sum: [
					'$sumNbSpectateursHomme',
					'$sumNbSpectateursFemme',
					'$sumNbParticipantsHomme',
					'$sumNbParticipantsFemme'
				]
			}
		}
	}
];

db.fait_activites.aggregate(query).forEach(printjson);

delete query[2].$group._id.mois;

db.fait_activites.aggregate(query).forEach(printjson);

delete query[2].$group._id.nomInst;
query[2].$group._id.mois = '$mois';

db.fait_activites.aggregate(query).forEach(printjson);

query[2].$group._id = false;

db.fait_activites.aggregate(query).forEach(printjson);
