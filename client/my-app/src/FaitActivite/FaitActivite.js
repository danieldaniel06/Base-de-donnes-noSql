import React from 'react';
import cssModule from 'react-css-modules';
import styles from './FaitActivite.css';
import Request from 'superagent';
import _ from 'lodash';
import Pagination from '../Pagination/Pagination';

class FaitActivite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageOfItems: []
		};
	}

	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({ pageOfItems: pageOfItems });
	}

	getGroupCube = function(year) {
		var url = year
			? 'http://localhost:3001/api/fait_activites/cubeInstDate/' + year
			: 'http://localhost:3001/api/fait_activites/cubeInstDate/';
		Request.get(url).then(res => {
			this.setState({ exampleItems: JSON.parse(res.text) });
		});
		console.log(url);
	};

	componentDidMount() {
		this.getGroupCube();
		this.onChangePage = this.onChangePage.bind(this);
	}

	refresh = function(year) {
		this.getGroupCube(year);
	};

	componentWillUnmount() {}

	render() {
		var mois = [
			'Javier',
			'Fevrier',
			'Mars',
			'Avril',
			'Mais',
			'Juin',
			'Juillet',
			'Aout',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre'
		];
		var activites = _.map(this.state.pageOfItems, activite => {
			var ret;
			if (!activite._id) {
				ret = (
					<tr className="sumTotal">
						<td>null</td>
						<td>null</td>
						<td>
							{activite.totalParticipantsHomme}
						</td>
						<td>
							{activite.totalParticipantsFemme}
						</td>
						<td className="rowTot">
							{activite.totalParticipants}
						</td>
						<td>
							{activite.totalSpectateursHomme}
						</td>
						<td>
							{activite.totalSpectateursFemme}
						</td>
						<td className="rowTot">
							{activite.totalSpectateurs}
						</td>
						<td className="rowSTot">
							{activite.total}
						</td>
					</tr>
				);
			} else {
				if (!activite._id.nomInst) {
					ret = (
						<tr>
							<td>null</td>
							<td>
								{mois[activite._id.mois]}
							</td>
							<td>
								{activite.totalParticipantsHomme}
							</td>
							<td>
								{activite.totalParticipantsFemme}
							</td>
							<td className="rowTot">
								{activite.totalParticipants}
							</td>
							<td>
								{activite.totalSpectateursHomme}
							</td>
							<td>
								{activite.totalSpectateursFemme}
							</td>
							<td className="rowTot">
								{activite.totalSpectateurs}
							</td>
							<td className="rowSTot">
								{activite.total}
							</td>
						</tr>
					);
				} else if (activite._id.mois == null) {
					ret = (
						<tr className="total">
							<td>
								{activite._id.nomInst}
							</td>
							<td>null</td>
							<td>
								{activite.totalParticipantsHomme}
							</td>
							<td>
								{activite.totalParticipantsFemme}
							</td>
							<td className="rowTot">
								{activite.totalParticipants}
							</td>
							<td>
								{activite.totalSpectateursHomme}
							</td>
							<td>
								{activite.totalSpectateursFemme}
							</td>
							<td className="rowTot">
								{activite.totalSpectateurs}
							</td>
							<td className="rowSTot">
								{activite.total}
							</td>
						</tr>
					);
				} else {
					ret = (
						<tr>
							<td>
								{activite._id.nomInst}
							</td>
							<td>
								{mois[activite._id.mois]}
							</td>
							<td>
								{activite.totalParticipantsHomme}
							</td>
							<td>
								{activite.totalParticipantsFemme}
							</td>
							<td className="rowTot">
								{activite.totalParticipants}
							</td>
							<td>
								{activite.totalSpectateursHomme}
							</td>
							<td>
								{activite.totalSpectateursFemme}
							</td>
							<td className="rowTot">
								{activite.totalSpectateurs}
							</td>
							<td className="rowSTot">
								{activite.total}
							</td>
						</tr>
					);
				}
			}

			return ret;
		});

		return (
			<div>
				<div className="col-lg-12">
					<div className="input-group">
						<span className="input-group-btn">
							<button className="btn btn-secondary" type="button">
								Année!
							</button>
						</span>
						<input
							ref="query"
							onChange={e => {
								this.refresh(this.refs.query.value);
							}}
							type="text"
							class="form-control"
							placeholder="Search for..."
							aria-label="Search for..."
						/>
					</div>
					<table className="table table-striped">
						<tbody>
							<tr>
								<th>Nom installation</th>
								<th>Mois</th>
								<th>Total participants Homme</th>
								<th>Total participants Femme</th>
								<th>Total participants</th>
								<th>Total spectateurs Homme</th>
								<th>Total spectateurs Femme</th>
								<th>Total spectateurs</th>
								<th>Total</th>
							</tr>
							{activites}
						</tbody>
					</table>
				</div>
				<Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
			</div>
		);
	}
}

export default cssModule(FaitActivite, styles);
