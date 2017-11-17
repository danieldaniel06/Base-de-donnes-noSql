import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Budget.css';
import Request from 'superagent';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import Pagination from '../Pagination/Pagination';

class Budget extends React.Component {
	static propTypes = {};

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

	getGroupCube = function(niveau) {
		var url = niveau
			? 'http://localhost:3001/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/' + niveau
			: 'http://localhost:3001/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/';
		Request.get(url).then(res => {
			this.setState({ cube: JSON.parse(res.text), exampleItems: JSON.parse(res.text) });
			//console.log(res.text);
		});
	};

	componentDidMount() {
		this.getGroupCube();
		this.onChangePage = this.onChangePage.bind(this);
	}

	refresh = function(event) {
		this.getGroupCube(event.target.value);
	};

	render() {
		var labels = [];
		for (var i = 2005; i < 2018; i++) {
			labels.push(i);
		}
		var mapDep = new Map();

		var data = {
			labels: labels,
			datasets: []
		};

		_.map(this.state.cube, budget => {
			if (budget._id.libDep) {
				if (budget._id.annee) {
					if (mapDep.has(budget._id.libDep)) {
						mapDep.get(budget._id.libDep)[budget._id.annee - 2005] = budget.totalBudget;
					} else {
						var tab = [];
						tab[budget._id.annee - 2005] = budget.totalBudget;
						mapDep.set(budget._id.libDep, tab);
					}
				}
			}
		});

		var budgets = _.map(this.state.pageOfItems, budget => {
			var ret;
			if (!budget._id) {
				ret = (
					<tr className="sumTotal">
						<td>null</td>
						<td>null</td>
						<td>null</td>
						<td>
							{budget.totalBudget}
						</td>
					</tr>
				);
			} else {
				if (budget._id.libDep) {
					if (budget._id.annee) {
						if (budget._id.niveau) {
							ret = (
								<tr>
									<td>
										{budget._id.libDep}
									</td>
									<td>
										{budget._id.annee}
									</td>
									<td>
										{budget._id.niveau}
									</td>
									<td>
										{budget.totalBudget}
									</td>
								</tr>
							);
						} else {
							ret = (
								<tr className="sousTotal">
									<td>
										{budget._id.libDep}
									</td>
									<td>
										{budget._id.annee}
									</td>
									<td>null</td>
									<td>
										{budget.totalBudget}
									</td>
								</tr>
							);
						}
					} else {
						ret = (
							<tr className="total">
								<td>
									{budget._id.libDep}
								</td>
								<td>null</td>
								<td>null</td>
								<td>
									{budget.totalBudget}
								</td>
							</tr>
						);
					}
				}
			}

			return ret;
		});

		if (mapDep.size > 0) {
			mapDep.forEach((value, key) => {
				var r = Math.round(Math.random() * 256);
				var v = Math.round(Math.random() * 256);
				var b = Math.round(Math.random() * 256);
				data.datasets.push({
					label: key,
					fill: false,
					data: value,
					backgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.4 + ')',
					borderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.4 + ')',
					hidden: true
				});
			});
		}

		var niveauSelect = [
			{ niveau: '' },
			{ niveau: 'Compétition départementale' },
			{ niveau: 'Loisir - Entretien - Remise en forme' },
			{ niveau: 'Entrainement' },
			{ niveau: 'Scolaire' },
			{ niveau: 'Compétition régionale' },
			{ niveau: 'Compétition nationale' },
			{ niveau: 'Non défini' },
			{ niveau: 'Compétition internationale' }
		];

		return (
			<div>
				<div>
					<h2>Budget dépensé par département pour les événements sportifs par année</h2>
					<div class="form-group">
						<label for="sel1">Sélectionner un niveau:</label>
						<select
							onChange={e => {
								this.refresh(e);
							}}
							class="form-control"
						>
							{niveauSelect.map((value, index) => {
								return (
									<option value={value.niveau}>
										{value.niveau}
									</option>
								);
							})}
						</select>
					</div>
					<Line data={data} />
				</div>
				<div className="col-lg-12">
					<table className="table table-striped">
						<tbody>
							<tr>
								<th>Département</th>
								<th>Année</th>
								<th>Niveau</th>
								<th>Budget total</th>
							</tr>
							{budgets}
						</tbody>
					</table>
					<Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
				</div>
			</div>
		);
	}
}

export default cssModule(Budget, styles);
