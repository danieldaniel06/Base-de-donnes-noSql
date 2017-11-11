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
		});
	};

	componentDidMount() {
		this.getGroupByInst(2005);
	}

	componentWillUnmount() {}

	render() {
		console.log(this.state.faitActiviteGroupByInst);
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

		return (
			<div>
				<label> Année </label>
				<input
					ref="query"
					onChange={e => {
						this.getGroupByInst(this.refs.query.value);
					}}
				/>
				<table border="1">
					<tr>
						<th>Nom installation</th>
						<th>Nom Activite</th>
						<th>Total homme participant</th>
						<th>Total Femme participant</th>
					</tr>
					{activites}
				</table>
			</div>
		);
	}
}

export default cssModule(FaitActivite, styles);
