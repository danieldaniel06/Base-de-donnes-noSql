import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Homme.css';

class Homme extends React.Component {
	static propTypes = {};
	render() {
		return (
			<div>
				<div class="col-sm-12">
					<div class="bs-calltoaction bs-calltoaction-default">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<h1 class="cta-title">Requête1.js</h1>
								<div class="cta-desc">
									<p>
										Cette requête est l'équivalent d’un GROUP BY CUBE. À partir de D dimensions nous
										obtenons 2^D niveaux d'agrégation. En partant des dimensions Date et
										Installation nous obtenons quatre niveaux d'agrégats. Ici, nous ajoutons tout ce
										qu'on peut calculer avec cette requête.
									</p>
									<p>
										Cette requête nous permet par exemple de savoir quelles sont les installations
										qui attirent le plus de personnes par mois. On peut avoir une vue plus détaillée
										en sélectionnant pour une année donnée.
									</p>
								</div>
							</div>
							<div class="col-md-3 cta-button">
								<a href="/cubeInsDate" class="btn btn-lg btn-block btn-default">
									Allez voir !
								</a>
							</div>
						</div>
					</div>

					<div class="bs-calltoaction bs-calltoaction-primary">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<h1 class="cta-title">BudgetAgg.js</h1>
								<div class="cta-desc">
									<p>
										Cette requête est l'équivalent d’un GROUP BY ROLLUP. À partir de D dimensions
										nous obtenons D+1 niveau d'agrégation. En partant des dimensions équipement,
										année et niveau nous obtenons quatre niveaux d'agrégats.
									</p>
									<p>
										Nous voulons savoir ici l'évolution du budget alloué pour les activités
										sportives par département, année, niveau; par département, année; par
										département et le total du budget
									</p>
								</div>
							</div>
							<div class="col-md-3 cta-button">
								<a href="/budgetDepAnneeNiveau" class="btn btn-lg btn-block btn-primary">
									Allez voir !
								</a>
							</div>
						</div>
					</div>

					<div class="bs-calltoaction bs-calltoaction-info">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<h1 class="cta-title">Requête département année</h1>
								<div class="cta-desc">
									<p>
										Cette requête est l'équivalent d’un GROUP BY ROLLUP. À partir de D dimensions
										nous obtenons D+1 niveau d'agrégation. En partant des dimensions équipement,
										année nous obtenons trois niveaux d'agrégats.
									</p>
									<p>
										Cette requête ressemble à la requête précédente sauf qu'ici, nous enlevons la
										dimension niveau. Ce qui nous permet d'avoir moins des détails.
									</p>
								</div>
							</div>
							<div class="col-md-3 cta-button">
								<a href="/budgetDepAnnee" class="btn btn-lg btn-block btn-info">
									Allez voir !
								</a>
							</div>
						</div>
					</div>

					<div class="bs-calltoaction bs-calltoaction-success">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<h1 class="cta-title">Requête commune année</h1>
								<div class="cta-desc">
									<p>
										Cette requête est l'équivalent d’un GROUP BY ROLLUP. À partir de D dimensions
										nous obtenons D+1 niveau d'agrégation. En partant des dimensions équipement,
										année nous obtenons trois niveaux d'agrégats.
									</p>
									<p>
										Cette requête ressemble à la requête précédente sauf qu'ici, nous changeons le
										département en commune. Ce qui nous permet d'avoir plus de détails sur
										l'allocation des budgets / coût généré des activités par commune.
									</p>
								</div>
							</div>
							<div class="col-md-3 cta-button">
								<a href="/budgetComAnnee" class="btn btn-lg btn-block btn-success">
									Allez voir !
								</a>
							</div>
						</div>
					</div>

					<div class="bs-calltoaction bs-calltoaction-warning">
						<div class="row">
							<div class="col-md-9 cta-contents">
								<h1 class="cta-title">Requête4.js</h1>
								<div class="cta-desc">
									<p>
										Cette requête permet de faire une analyse des top N des événements sportifs qui
										ont rassemblé le plus de spectateur sur toute la France sur une période donnée.
									</p>
								</div>
							</div>
							<div class="col-md-3 cta-button">
								<a href="/topN" class="btn btn-lg btn-block btn-warning">
									Allez voir !
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default cssModule(Homme, styles);
