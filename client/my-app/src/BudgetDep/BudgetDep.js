import React from 'react';
import cssModule from 'react-css-modules';
import styles from './BudgetDep.css';
import Request from 'superagent';
import _ from 'lodash';
import Pagination from '../Pagination/Pagination';
import { Bar } from 'react-chartjs-2';

class BudgetDep extends React.Component {
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

	getGroupRollup = function(niveau) {
		var url = niveau
			? 'http://localhost:3001/api/fait_activites/statBudgetDepAnne/' + niveau
			: 'http://localhost:3001/api/fait_activites/statBudgetDepAnne/';
		Request.get(url).then(res => {
			this.setState({ rollup: JSON.parse(res.text), exampleItems: JSON.parse(res.text) });
		});
	};

	componentDidMount() {
		this.getGroupRollup();
		this.onChangePage = this.onChangePage.bind(this);
	}

	refresh = function(event) {
		this.getGroupRollup(event.target.value);
	};

	render() {
		var mapDep = new Map();

		_.map(this.state.rollup, budget => {
			if (budget._id && budget._id.libDep) {
				if (budget._id.annee) {
					if (mapDep.has(budget._id.libDep)) {
						mapDep.get(budget._id.libDep).dataBudget[budget._id.annee - 2005] = budget.value.totalBudget;
						mapDep.get(budget._id.libDep).dataCout[budget._id.annee - 2005] = budget.value.totalCout;
					} else {
						var tab = {
							dataBudget: [],
							dataCout: []
						};
						tab.dataBudget[budget._id.annee - 2005] = budget.value.totalBudget;
						tab.dataCout[budget._id.annee - 2005] = budget.value.totalCout;
						mapDep.set(budget._id.libDep, tab);
					}
				}
			}
		});

		const options = {
			responsive: true,
			tooltips: {
			  mode: 'label'
			},
			scales: {
				yAxes: [
					{
						id: 'y-axis-2',
						type: 'linear',
						position: 'left',
						labels: {
							show: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: "Prix en €",
							fontColor: "black",
						}
					},
					{
						id: 'y-axis-1',
						type: 'linear',
						position: 'right',
						labels: {
							show: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: "Prix en €",
							fontColor: "black",
						}
					}
				]
			}
		};

		const plugins = [
			{
				afterDraw: (chartInstance, easing) => {
					const ctx = chartInstance.chart.ctx;
					ctx.fillText('Pix en €', 0, 90);
				}
			}
		];

		var labels = [];
		for (var i = 2005; i < 2018; i++) {
			labels.push(i);
		}

		var graphs = [];

		var data = {
			labels: labels,
			datasets: []
		};

		//var keys = mapDep.keys();

		mapDep.forEach((element, key) => {
			var r = Math.round(Math.random() * 256);
			var v = Math.round(Math.random() * 256);
			var b = Math.round(Math.random() * 256);
			var newData = data;
			newData.datasets = [];
			newData.datasets.push({
				label: 'Budget',
				type: 'line',
				data: element.dataBudget,
				fill: false,
				borderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				backgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				pointBorderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				pointBackgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				pointHoverBackgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				pointHoverBorderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				yAxisID: 'y-axis-2'
			});
			r = Math.round(Math.random() * 256);
			v = Math.round(Math.random() * 256);
			b = Math.round(Math.random() * 256);
			newData.datasets.push({
				type: 'bar',
				label: 'Coût',
				data: element.dataCout,
				fill: false,
				backgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				borderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				hoverBackgroundColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				hoverBorderColor: 'rgba(' + r + ',' + v + ',' + b + ',' + 0.9 + ')',
				yAxisID: 'y-axis-1'
			});
			graphs.push(
				JSON.stringify({
					dep: key,
					data: newData
				})
			);
		});

		var draw = graphs.map((element, index) => {
			var object = JSON.parse(element);
			//console.log(object);

			return (
				<div className="col-md-4">
					<h3>
						{object.dep}
					</h3>
					<Bar data={object.data} options={options} />
				</div>
			);
		});

		var budgets = _.map(this.state.pageOfItems, budget => {
			var ret;
			if (!budget._id) {
				ret = (
					<tr className="sumTotal">
						<td>null</td>
						<td>null</td>
						<td>
							{budget.value.totalBudget}
						</td>
						<td>
							{budget.value.totalCout}
						</td>
					</tr>
				);
			} else {
				if (budget._id.libDep) {
					if (budget._id.annee) {
						ret = (
							<tr>
								<td>
									{budget._id.libDep}
								</td>
								<td>
									{budget._id.annee}
								</td>
								<td>
									{budget.value.totalBudget}
								</td>
								<td>
									{budget.value.totalCout}
								</td>
							</tr>
						);
					} else {
						ret = (
							<tr className="total">
								<td>
									{budget._id.libDep}
								</td>
								<td>null</td>
								<td>
									{budget.value.totalBudget}
								</td>
								<td>
									{budget.value.totalCout}
								</td>
							</tr>
						);
					}
				}
			}

			return ret;
		});

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
					<h2>
						Budget dépensé par département pour les événements sportifs par année et le coût associé au
						événements
					</h2>
					<div class="form-group">
						<label for="sel1">Selectioner un niveau:</label>
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
				</div>
				{draw}
				<div className="col-lg-12">
					<table className="table table-striped">
						<tbody>
							<tr>
								<th>Département</th>
								<th>Année</th>
								<th>Total budget</th>
								<th>Total cout</th>
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

export default cssModule(BudgetDep, styles);
