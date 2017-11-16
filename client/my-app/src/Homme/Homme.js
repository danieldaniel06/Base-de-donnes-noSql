import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Homme.css';

class Homme extends React.Component {
	static propTypes = {};
	render() {
		return (
			<div>
				<ul>
					<li>
						<a href="/cubeInsDate">Cube sur la dimention installation et activite par année</a>
					</li>
					<li>
						<a href="/budgetDepAnneeNiveau">Rollup la dimention equipement, date et niveau</a>
					</li>
					<li>
						<a href="/budgetDepAnnee">Rollup la dimention equipement, date</a>
					</li>
					<li>
						<a href="/budgetComAnnee">Rollup la dimention equipement, date</a>
					</li>
					<li>
						<a href="/topN">Top N des activites pratiqué durant une période</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default cssModule(Homme, styles);
