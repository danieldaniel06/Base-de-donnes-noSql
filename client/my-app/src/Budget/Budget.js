import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Budget.css';
import Request from 'superagent';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';

class Budget extends React.Component {
	static propTypes = {};

	constructor(props) {
		super(props);
		this.state = {};
	}

	getGroupCube = function(niveau) {
		var url = niveau
			? 'http://localhost:3000/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/' + niveau
			: 'http://localhost:3000/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/';
		Request.get(url).then(res => {
			this.setState({ cube: JSON.parse(res.text) });
			//console.log(res.text);
		});
	};

	componentDidMount() {
		this.getGroupCube();
	}

	refresh = function(niveau) {
		this.getGroupCube(niveau);
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

		var budgets = _.map(this.state.cube, budget => {
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
							if (mapDep.has(budget._id.libDep)) {
								mapDep.get(budget._id.libDep)[budget._id.annee - 2005] = budget.totalBudget;
							} else {
								var tab = [];
								tab[budget._id.annee - 2005] = budget.totalBudget;
								mapDep.set(budget._id.libDep, tab);
							}
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

		return (
			<div>
				<div>
					<h2>Budget dépensé par département pour les événements sportifs par année</h2>
					<h3>Possibilité de filtrer par niveau</h3>
					<div className="input-group">
						<span className="input-group-btn">
							<button className="btn btn-secondary" type="button">
								Niveau!
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
					<Line data={data} />
				</div>
				<div className="col-lg-12">
					<table className="table table-striped">
						<tbody>
							<tr>
								<th>Departement</th>
								<th>Année</th>
								<th>Niveau</th>
								<th>Total budget</th>
							</tr>
							{budgets}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default cssModule(Budget, styles);
