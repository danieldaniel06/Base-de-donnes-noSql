var query = {
	group: {
		ns: 'fait_activite',
		key: { 'installation.nomInstallation': 1, 'activite.libAct': 1 },
		cond: { 'installation.nomInstallation': { $ne: null } },
		$reduce: function(curr, value) {
			value.nomInstallation = value['installation.nomInstallation'];
			value.nomActivite = value['activite.libAct'];
			delete value['installation.nomInstallation'];
			delete value['activite.libAct'];
			if (curr.nbParticipantsHomme) value.tolalParticipantHomme += curr.nbParticipantsHomme;
			if (curr.nbParticipantsFemme) value.tolalParticipantFemme += curr.nbParticipantsFemme;
			value.totalPratiqueActivite += 1;
		},
		initial: { tolalParticipantHomme: 0, tolalParticipantFemme: 0, totalPratiqueActivite: 0 }
	}
};

db.runCommand(query);
