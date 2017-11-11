import React from 'react';
import cssModule from 'react-css-modules';
import styles from './FaitActivite.css';
import Request from 'superagent';
import _ from 'lodash';

class FaitActivite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getGroupByInst = function(year) {
		var url = 'http://localhost:3000/api/fait_activites/groupInst/' + year;
		Request.get(url).then(res => {
			this.setState({ faitActiviteGroupByInst: JSON.parse(res.text) });
			var transform = new Map();
			_.map(this.state.faitActiviteGroupByInst, activite => {
				if (activite._id.nomInstallation) {
					transform.set(activite._id.nomInstallation.replace(/ /g, ''), activite);
				} else {
					transform.set('undefined', activite);
				}
			});
			this.setState({ transform: transform });
		});
	};

	getGroupByActivite = function(year) {
		var url = 'http://localhost:3000/api/fait_activites/groupAct/' + year;
		Request.get(url).then(res => {
			this.setState({ faitActiviteGroupByAct: JSON.parse(res.text) });
		});
	};

	getGroupByActiviteInst = function(year) {
		var url = 'http://localhost:3000/api/fait_activites/groupInstAct/' + year;
		Request.get(url).then(res => {
			this.setState({ faitActiviteGroupByActInst: JSON.parse(res.text) });
		});
	};

	getTotal = function(year) {
		var url = 'http://localhost:3000/api/fait_activites/total/' + year;
		Request.get(url).then(res => {
			this.setState({ totalActiviteInst: [JSON.parse(res.text)] });
		});
	};

	componentDidMount() {
		this.getGroupByInst(2005);
		this.getGroupByActivite(2005);
		this.getGroupByActiviteInst(2005);
		this.getTotal(2005);
	}

	refresh = function(year) {
		this.getGroupByActiviteInst(year);
		this.getGroupByInst(year);
		this.getGroupByActivite(year);
		this.getTotal(year);
	};

	componentWillUnmount() {}

	render() {
		if (this.state.faitActiviteGroupByInst && this.state.faitActiviteGroupByInst.length) {
			var activites = _.map(this.state.faitActiviteGroupByInst, activite => {
				return (
					<tr>
						<td>
							{activite._id.nomInstallation}
						</td>
						<td>
							{activite._id.nomActivite}
						</td>
						<td>
							{activite.sumNbParticipantsHomme}
						</td>
						<td>
							{activite.sumNbParticipantsFemme}
						</td>
					</tr>
				);
			});

			var activitesB = _.map(this.state.faitActiviteGroupByAct, activite => {
				return (
					<tr>
						<td>
							{activite._id.nomInstallation}
						</td>
						<td>
							{activite._id.nomActivite}
						</td>
						<td>
							{activite.sumNbParticipantsHomme}
						</td>
						<td>
							{activite.sumNbParticipantsFemme}
						</td>
					</tr>
				);
			});

			var i = 0;
			var cle;
			var activitesC = _.map(this.state.faitActiviteGroupByActInst, activite => {
				cle = this.state.faitActiviteGroupByActInst[i]._id.nomInstallation
					? this.state.faitActiviteGroupByActInst[i]._id.nomInstallation.replace(/ /g, '')
					: 'undefined';

				var insert = <tr />;

				var act = this.state.transform.get(cle);
				if (i < this.state.faitActiviteGroupByActInst.length - 1) {
					var cleSuv = this.state.faitActiviteGroupByActInst[i + 1]._id.nomInstallation
						? this.state.faitActiviteGroupByActInst[i + 1]._id.nomInstallation.replace(/ /g, '')
						: 'undefined';
					if (cleSuv != cle) {
						insert = (
							<tr className="total">
								<td>
									{act._id.nomInstallation}
								</td>
								<td>
									{act._id.nomActivite}
								</td>
								<td>
									{act.sumNbParticipantsHomme}
								</td>
								<td>
									{act.sumNbParticipantsFemme}
								</td>
							</tr>
						);
					}
				} else {
					insert = (
						<tr className="total">
							<td>
								{act._id.nomInstallation}
							</td>
							<td>
								{act._id.nomActivite}
							</td>
							<td>
								{act.sumNbParticipantsHomme}
							</td>
							<td>
								{act.sumNbParticipantsFemme}
							</td>
						</tr>
					);
				}
				i++;
				return [
					<tr>
						<td>
							{activite._id.nomInstallation}
						</td>
						<td>
							{activite._id.nomActivite}
						</td>
						<td>
							{activite.sumNbParticipantsHomme}
						</td>
						<td>
							{activite.sumNbParticipantsFemme}
						</td>
					</tr>,
					insert
				];
			});

			var activitesTot = _.map(this.state.totalActiviteInst, total => {
				console.log(total);
				return (
					<tr>
						<td>null</td>
						<td>null</td>
						<td>
							{total.sumNbParticipantsHomme}
						</td>
						<td>
							{total.sumNbParticipantsFemme}
						</td>
					</tr>
				);
			});
		}

		return (
			<div>
				<label> Année </label>
				<input
					ref="query"
					onChange={e => {
						this.refresh(this.refs.query.value);
					}}
				/>
				<table className="table table-striped">
					<tbody>
						<tr>
							<th>Nom installation</th>
							<th>Nom Activite</th>
							<th>Total homme participant</th>
							<th>Total Femme participant</th>
						</tr>
						{activitesC}
						{activitesB}
						{activitesTot}
					</tbody>
				</table>
			</div>
		);
	}
}

export default cssModule(FaitActivite, styles);
