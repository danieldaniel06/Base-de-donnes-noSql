# Tutoriel pour lancer l'application sur mac et linux

Pré-requis
==========

- Avoir nodejs sur sa machine : https://nodejs.org/en/
- Avoir mongodb sur sa machine : https://www.mongodb.com
- Avoir php sur sa machine : http://php.net/downloads.php
- Avoir la commande mongo accéssible directement en ligne de commande, pour tester : mongo --version
- Avoir la commande npm accéssible directement en ligne de commande, pour tester : npm --version

Installation
============
  
- Faire un clone du projet avec la commmande : 
  - git clone https://github.com/danieldaniel06/Base-de-donnes-noSql.git
- Avec le terminal, placez-vous dans le dossier qui vient d'être cloné et lancer la commande make.
- Une fois terminé vous devez avoir sur le terminal :
    - Running on port 3001... we're connected!
- Ouvrir un autre terminal sur le répertoire courant et placez-vous dans le dossier client/build avec la commande : cd client/build
    - Executer make
- Aller dans votre navigateur préféré et tapper : http://localhost:8000

- Les services disponibles pour le moment au niveau du serveur sont :
    - http://localhost:3000/api/fait_activites
    - http://localhost:3000/api/fait_activites/statBudgetDepAnne/:niveau (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/statBudgetCommAnne/:niveau (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/topNSpectPart/:n/:dateDeb/:dateFin (! :n, :dateDep, :dateFin à définir)
    - http://localhost:3000/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/:niveau? (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/cubeInstDate/:year? (! :year à définir)
  

# Tutoriel pour lancer l'application sur Windows 10

Pré-requis
==========

- Avoir nodejs sur sa machine : https://nodejs.org/en/
- Avoir mongodb sur sa machine : https://www.mongodb.com
- Avoir php sur sa machine : http://php.net/downloads.php
- Avoir cygwin pour pouvoir utiliser un terminal sous linux : https://cygwin.com/install.html

Installation
============

- Lors de la configuration de cygwin choisir l'installation des commandes : unzip, make, mkdir
- Déclarer des variables d'environnement pour pouvoir utiliser mongo et php dans le terminal:
  - Aller sur le Panneau de configuration, puis dans Système et sécurité puis dans Système
  - Cliquez sur le lien Paramètres système avancés.
  - Cliquez sur Variables d'environnement. Dans la section Variables système, recherchez la variable d'environnement PATH et sélectionnez-la. Cliquez sur Modifier. Si la variable d'environnement PATH n'existe pas, cliquez sur Nouvelle.
  - Dans la fenêtre Modifier la variable système (ou Nouvelle variable système), indiquez la valeur de la variable d'environnement PATH. Cliquez sur OK. Fermez toutes les fenêtres restantes en cliquant sur OK.
    - la valeur de la variable d'environnement pour mongo est le chemin jusqu'au fichier bin
    - la valeur de la variable d'environnement pour php est le chemin jusqu'au dossier que vous avez téléchargé
  - Tester vos commande en tapant "mongo --help" ou "php --help" dans le terminal cygwin 
- Faire un clone du projet avec la commande : 
  - git clone https://github.com/danieldaniel06/Base-de-donnes-noSql.git
- Avec le terminal cygwin, placez-vous dans le dossier qui vient d'être cloné en le faisant simplement glisser sur le terminal pour avoir son chemin.
- exécuter la commande make

- Une fois terminé vous devez avoir sur le terminal :
    - Running on port 3001... we're connected!
- Ouvrir un autre terminal cygwin sur le répertoire courant et placez-vous dans le dossier client/build avec la commande : cd client/build
    - Executer make
- Aller dans votre navigateur préféré et tapper : http://localhost:8000

# Compte Rendus du Projet Base de donnée

- AHMED Daniel
- BAH Thierno

Sommaire 
========

- Introduction    
- Description des données sources    
- Extraction, Nettoyage et Transformation des données avec Talend    
- Agrégation des données avec JavaScript   
- Stockage des données avec MongoDB     
- Requêtes    
- Visualisation de notre entrepôt de données avec NodeJS et React    
- Annexe

Introduction
============

L'objectif de ce projet était de réaliser un entrepôt de données, c'est-à-dire une structure qui a pour but, contrairement aux bases de données “classique”, de regrouper les données d'une entreprise pour des fins analytiques et pour l'aide à la décision stratégique, action entreprise par les décideurs de l'entreprise qui vise à améliorer, quantitativement ou qualitativement, la performance de l'entreprise. C'est un puissant outil d'aide à la décision. 

Pour ce projet on a choisi de se mettre à la place d’une organisation qui aide l'état à gérer son budget pour tout ce qui concerne le sport en France, les activités sportives, les installations, les équipements.

Pour trouver des informations relatives aux installations sportives dans toute la France nous sommes allés sur le site du gouvernement et nous avons sélectionné trois jeux de données qui vont nous servir à faire notre entrepôt de données. Nous allons tout d’abord décrire nos jeux de données puis expliquer comment on a fait pour construire cet entrepôt avec les outils utilisés.

Description des données sources
===============================

Sur le site du gouvernement nous avons trouvé un recensement national de l’intégralité des équipements sportifs, espaces et sites de pratiques. Nous avons choisi trois fichiers qui nous apportaient les informations nécessaires à la création de notre entrepôt de données.

La fiche “installations” nous donne toute sortes d’informations sur l’installation sportive comme son nom, son adresse complète, le nombre d'équipements qu’il y a, si il y a un gardien etc...

La fiche “installations” nous donne toutes sortes d’informations sur l’installation sportive comme son nom, son adresse complète, le nombre d'équipements qu’il y a, s'il y a un gardien etc.

La fiche “activités des fiches équipements” nous donne des informations sur les activités, leurs noms, le niveau, la nature de l’activité si elle est scolaire.

Cette dernière fiche recense les évènements sportifs qui ont eu lieu dans des équipements qui se trouve (oui/non) dans des installations mais pas avec beaucoup de détails comme le nombre de spectateurs, le nombre de participants, le budget alloué, le coût actuel de l'événement. Ses données étaient introuvables et pourtant elles étaient importantes pour nous permettre de faire des analyses pertinentes alors nous avons dû les créer nous-même, ce qui sera expliquer un peu plus tard.

Extraction, Nettoyage et Transformation des données avec Talend
===============================================================

Pour “préparer” nos données nous avons utilisé le logiciel d'intégration de données Talend, il est relativement simple et intuitif et grâce à lui nous avons pu mettre en entrée nos fichiers CSV et pouvoir choisir les données à extraire. Grâce à un mapping nous avons extrait les données puis nous avons changé les noms et les types de ses données pour leur donner des noms plus cohérents et plus précis. Nous avons ensuite choisi de mettre nos données dans un fichier en format JSON à la sortie. Le format JSON est assez facile à comprendre et les types de données qu'il a sont utilisées dans beaucoup de langages ce qui rendait sa manipulation beaucoup plus simple pour la suite du projet. Ce format nous était surtout très utile pour pouvoir importer nos données dans MongoDb.

Suite à cette étape d'extraction et de nettoyage nous avons quatre fichiers JSON qui vont être nos dimensions quand nous allons vouloir faire nos requêtes : Équipements, Installations, Date et Niveau.

Nous avons créé pour la dimension Date un fichier JSON qui contient les dates de tous les jours du 28/07/2005 au 28/07/2017 cette table va nous servir lorsque nous allons créer notre table de fait et pour faire des analyses par rapport à des périodes de temps.

Voici une image pour illustrer ce processus d'extraction de nettoyage et de transformation avec Talend :

![alt tag](https://user-images.githubusercontent.com/16761554/32853119-8e302bf0-ca3a-11e7-942c-c8ba1465b943.png)


![alt tag](https://user-images.githubusercontent.com/11199130/32940417-e512d7c6-cb82-11e7-9c72-e9648e257e78.png)

Comme nous n’avions pas assez d’informations sur les événements sportifs qui ont eu lieu dans les installations il a fallu ajouter ses informations nous-même, des informations comme le nombre de participants à cet événement, le nombre de spectateurs qui sont allé voir cet événement, le budget alloué pour l'événement, le coût de l’événement etc.

![alt tag](https://user-images.githubusercontent.com/11199130/32940669-99f54eb2-cb83-11e7-98fb-7ca146d2fe7d.png)

Agrégation des données avec JavaScript
======================================

Comme nous voulons des événements historisés, nous avons généré un document date qui contient toutes les dates de 2005 jusqu'en 2017. Le choix de ces dates nous semble pertinent car elles sont cohérentes avec nos jeux de données puisque le recensement a commencé depuis 2005.

Grâce à un script Javascript nous avons mis en relation ces données avec nos autres tables pour donner plus d’informations sur l'évènement sportif: l'activité pratiquée, la date et l’installation dans laquelle a eu lieu cet événement.
En combinant ses informations avec les faits numériques qu'on a rajoutés on peut créer une ligne de notre table de fait.

Le processus d’entreprise qu’on a choisi de modéliser est :
- la gestion des événements sportifs en France.

On peut étudier des phénomènes comme la fréquentation d’une installation qui se traduit par les activités qu’il y a eu dans une installation et par le nombre de personnes qui sont venu y participer ou la regarder. On peut aussi regarder à quelle fréquence a lieu ces événements sportifs et surtout où ont-ils lieux, on peut regarder comment est repartis le budget pour les événements sportifs un peu partout et voir s'il est utile ou pas de le redistribuer autrement, grâce à ça l'État peut faire des analyses de ce genre pour prendre une décision importante.

Une ligne de notre table de fait représenter donc un événement sportif, on a des informations comme la date, l'activité pratiquée, l'installation utilisée, le nombre de participants hommes, femme, le nombre de spectateurs homme, femme, le budget, le coût. C’est le ***grain du processus*** que nous avons décidé de prendre.

Les dimensions que nous utilisons sont: Installations, Équipement, Date et Niveau. 
Les faits numériques qui renseigne notre table de fait sont le nombre de spectateurs, le nombre de participants, le coût d’un événement sportif et le budget prévus pour cet événement.

![alt tag](https://user-images.githubusercontent.com/11199130/32941497-46cef456-cb86-11e7-9775-f6455bf51540.png)

***Nous obtenons le schéma ci-dessus.***

Sur mongodb, il y a deux manières de représenter un document “Embedded Documents” qui consiste à tout mettre dans un seul document ou “Database Références” qui consiste à faire une séparation des tables en utilisant leurs clés pour les référencer comme dans les bases de données relationnelles. Nous avons choisi “Embedded Document” pour une question de performance car il n'y a pas besoin de faire une jointure entre deux documents, elle est déjà faite en quelque sorte grâce à la façon dont nous avons construit notre table de faits.

La table de fait généré comporte : ***383 723*** documents.

***Un exemple d'un document dans notre table de fait :***

![alt tag](https://user-images.githubusercontent.com/16761554/32835132-437ad158-ca05-11e7-9f0b-b8a31b615d53.png)

Stockage des données avec MongoDB
=================================

Pour stocker notre entrepôt de données nous avons choisi d’utiliser la technologie MongoDB. MongoDB est une base de données NoSQL, nous avons choisi de l’utiliser car c'est une technologie simple d’utilisation, qui propose un modèle de données flexibles, qui a été conçu pour la performance et la disponibilité et que nous voulions faire quelque chose de performant. De plus MongoDB implémente le Map Reduce qui va être utile pour nos requêtes.

Après avoir créé notre table de fait grâce à JavaScript nous l’avons importé dans une collection dans une base de données de MongoDB grâce à la commande mongoimport qui nous permet d’importer un fichier JSON en une collection dans MongoDB, ensuite il ne nous restait plus qu’à faire des requêtes sur cette collection de Fait.


Requêtes
========

Les requêtes sont toute dans le fichier "query" du git.

  - budget.js 

Cette requête est l'équivalent d’un GROUP BY ROLLUP, à partir de D dimensions nous obtenons D+1 niveau d'agrégation, pour cette requête nos dimensions sont : 
- Département, Date, et Niveau

L'information relative au niveau est dans le document de fait et celle relative au département est dans le document Équipement.

Nous obtenons quatre niveaux d'agrégats: le département, l'année, le niveau de l'événement et budget total. Cette requête permet de savoir le budget dépensé par année pour chaque département pour l'organisation des événements sportifs à tout niveau. On peut augmenter la granularité en effectuant un slice, de cette façon on peut avoir cette information que pour les activités de niveau "Scolaire" par exemple.

```javascript

var mapDepDate = function() {
	var equipement = this.equipement;
	var date = this.date;
	if (equipement && date) {
		emit(
			{ libDep: equipement.libDep, annee: date.year, niveau: this.niveau },
			{ totalBudget: this.budget, totalCoup: this.cout }
		);
		emit({ libDep: equipement.libDep, annee: date.year }, { totalBudget: this.budget, totalCoup: this.cout });
		emit({ libDep: equipement.libDep }, { totalBudget: this.budget, totalCoup: this.cout });
		emit(null, { totalBudget: this.budget, totalCoup: this.cout });
	}
};

var reduceDepDate = function(key, budgets) {
	var totalBudget = 0;
	var totalCoup = 0;
	budgets.forEach(function(budget) {
		if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
		if (budget.totalCoup) totalCoup += parseFloat(budget.totalCoup);
	});

	return {
		totalBudget: totalBudget,
		totalCoup: totalCoup
	};
};

db.fait_activites.mapReduce(mapDepDate, reduceDepDate, {
	out: { inline: 1 },
	query: {
		niveau: 'Scolaire'
	}
});


```

  - budgetCom

Cette requête présente la même logique que la précédente, mais ici nous avons effectué un drill down qui nous permet d'avoir plus de détails sur la répartition des budgets non plus par département mais par commune.

```javascript
var mapComDate = function() {
	var date = this.date;
	var equipement = this.equipement;
	if (equipement && date) {
		emit(
			{ commune: equipement.libCom, annee: date.year, niveau: this.niveau },
			{ totalBudget: this.budget, totalCoup: this.cout }
		);
		emit({ commune: equipement.libCom, annee: date.year }, { totalBudget: this.budget, totalCoup: this.cout });
		emit({ commune: equipement.libCom }, { totalBudget: this.budget, totalCoup: this.cout });
		emit(null, { totalBudget: this.budget, totalCoup: this.cout });
	}
};

var reduceComDate = function(key, budgets) {
	var totalBudget = 0;
	var totalCoup = 0;
	budgets.forEach(function(budget) {
		if (budget.totalBudget) totalBudget += parseFloat(budget.totalBudget);
		if (budget.totalCoup) totalCoup += parseFloat(budget.totalCoup);
	});

	return {
		totalBudget: totalBudget,
		totalCoup: totalCoup
	};
};

db.fait_activites.mapReduce(mapComDate, reduceComDate, {
	out: { inline: 1 },
	query: {
		niveau: 'Scolaire'
	}
});
```
  - budgetAgg

Ici nous avons repris les deux requêtes précédentes en utilisant l'opérateur agrégat. Le but était de faire des tests de performance comme on a un jeu de données assez importantes. En effet dans notre table de fait, nous avons 383 723 documents dont chaque document représente une ligne de notre table de fait sous la forme d'agrégat.

```javascript
var rollupBudgetDepAnneeNiveau = function(niveau) {
	var query = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libDep: '$equipement.libDep',
				annee: '$date.year',
				budget: '$budget',
				niveau: '$niveau',
				cout: '$cout'
			}
		},
		{
			$group: {
				_id: {
					libDep: '$libDep',
					annee: '$annee',
					niveau: '$niveau'
				},
				totalBudget: {
					$sum: '$budget'
				},
				totalCout: {
					$sum: '$cout'
				}
			}
		}
	];

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.niveau;

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.annee;

	db.fait_activites.aggregate(query).forEach(printjson);

	query[2].$group._id = false;

	db.fait_activites.aggregate(query).forEach(printjson);
};



var rollupBudgetCommAnneeNiveau = function(niveau) {
	var query = [
		{
			$match: { niveau: niveau }
		},
		{
			$project: {
				libCom: '$equipement.libCom',
				annee: '$date.year',
				budget: '$budget',
				niveau: '$niveau',
				cout: '$cout'
			}
		},
		{
			$group: {
				_id: {
					libCom: '$libCom',
					annee: '$annee',
					niveau: '$niveau'
				},
				totalBudget: {
					$sum: '$budget'
				},
				totalCout: {
					$sum: '$cout'
				}
			}
		}
	];

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.niveau;

	db.fait_activites.aggregate(query).forEach(printjson);

	delete query[2].$group._id.annee;

	db.fait_activites.aggregate(query).forEach(printjson);

	query[2].$group._id = false;

	db.fait_activites.aggregate(query).forEach(printjson);
};
```

  - requetes1.js
  
Cette requête est l'équivalent d’un GROUP BY CUBE, à partir de D dimensions nous obtenons 2^D niveaux d'agrégation. En partant des dimensions Date et Installation nous obtenons quatre niveaux d'agrégats.

Ici selon l’activité et l’installation nous cherchons à avoir des informations sur les participants, leur nombre et leur profil, si c'est des hommes, des femmes etc.
Cette requête peut aider à savoir comment adapter les installations par rapport aux personnes qui la fréquentent par exemple.

```javascript
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
```

  - requete2.js
  
Cette requête est la même que la précédente. MongoDB nous donne deux façons de faire cette requête une en utilisant d’énormes suites de query pour faire un groupage ou une plus sobre qui passe par l’utilisation d’un Map Reduce, nous avons pu observer une différence de performance.

Map traverse tous les documents de notre table de fait et va pousser des informations à reduce selon une clé définit cette opération met plus de temps que la première version de cette requête.

```javascript

var mapGroupInst = function() {
	var inst = this.installation;
	var date = this.date;
	if (inst && date) {
		emit(
			{ nomInst: inst.nomInst, month: date.month },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);
		emit(
			{ nomInst: inst.nomInst },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);
		emit(
			{ month: date.month },
			{
				totalParticipantsHomme: this.nbParticipantsHomme,
				totalParticipantsFemme: this.nbParticipantsFemme
			}
		);

		emit(null, {
			totalParticipantsHomme: this.nbParticipantsHomme,
			totalParticipantsFemme: this.nbParticipantsFemme
		});
	}
};

var reduceGroupInst = function(key, values) {
	var reducedVal = { totalParticipants: 0 };
	var totalParticipantsHomme = 0;
	var totalParticipantsFemme = 0;

	values.forEach(function(value) {
		if (value.totalParticipantsHomme) totalParticipantsHomme += parseInt(value.totalParticipantsHomme);
		if (value.totalParticipantsFemme) totalParticipantsFemme += parseInt(value.totalParticipantsFemme);
	});
	reducedVal.totalParticipants += totalParticipantsHomme + totalParticipantsFemme;
	return reducedVal;
};

db.fait_activites.mapReduce(mapGroupInst, reduceGroupInst, {
	out: { inline: 1 },
	query: {
		'date.year': 2010
	}
});

```

  - requetes3.js
  
Nous avons fait une requête qui nous donne les activités qui attirent le plus de spectateurs en les filtrant par département et sur une période de temps, on fait un groupage par activité par date et par département. Nous pouvons voir par exemple lors de l’été 2015 c'est-à-dire de Juin à septembre 2015, quelles sont les activités qui ont eu le plus de spectateur à Nantes et dans quelles installations. Cette requête est intéressante pour choisir par exemple quelles activités mettre en avant au fil des saisons et savoir quelle est les installations où les gens vont le plus et ainsi décider de les améliorer, et mieux répartir le budget entre les installations du département.

```javascript

var query = [
	{
		$project: {
			nivActivite: '$niveau',
			nomActivite: '$libAct',
			codeDep: '$installation.codeDep',
			nomIns: '$installation.nomInst',

			month: '$date.month',
			year: '$date.year',
			specTotal: { $sum: ['$nbSpectateursHomme', '$nbSpectateursHomme'] }
		}
	},
	{
		$match: {
			$and: [
				{
					month: {
						$gte: 5,
						$lte: 10
					}
				},
				{
					year: 2015
				}
			]
		}
	},
	{
		$group: {
			_id: {
				niveau: '$nivActivite',
				nomActivite: '$nomActivite',
				dep: '$codeDep',
				mois: '$month',
				annee: '$year'
			},
			NbSpectateursTotaux: { $sum: '$specTotal' }
		}
	},
	{
		$sort: { NbSpectateursTotaux: -1 }
	}
];

db.fait_activites.aggregate(query);

```

  - requetes4.js
  
Cette requête est une généralisation de la précédente, on veut avoir une analyse sur toute la France et non sur un seul département, ici on ne fait plus le filtrage par rapport au département et on peut faire une analyse sur un top 10 des événements sportifs qui ont rassemblé le plus de spectateur sur toute la France. Si on veut savoir qu’elles sont les installations les plus fréquentées dans la France lors de l'été 2015 ou de n'importe quelle autre période de temps entre 2005 et 2017.

```javascript

var N = 10;

var query = [
	{
		$project: {
			nomActivite: '$libAct',
			nomIns: '$installation.nomInst',
			codeDep: '$installation.codeDep',
			month: '$date.month',
			year: '$date.year',
			specTotal: {
				$sum: ['$nbSpectateursHomme', '$nbSpectateursHomme']
			}
		}
	},
	{
		$match: {
			$and: [
				{
					month: {
						$gte: 5,
						$lte: 10
					}
				},
				{
					year: {
						$gte: 2005,
						$lte: 2017
					}
				}
			]
		}
	},
	{
		$group: {
			_id: {
				nomActivite: '$nomActivite',
				nomInstallation: '$nomIns',
				codeDep: '$codeDep'
			},
			NbSpectateursTotaux: {
				$sum: '$specTotal'
			}
		}
	},
	{
		$sort: {
			NbSpectateursTotaux: -1
		}
	},
	{
		$limit: N
	}
];

db.fait_activites.aggregate(query);

```

  - requete5.js
  
 Cette requête nous donne le nombre total d'évènement sportif par département. Cette requête peut nous renseigner sur les départements qui pratiquent le plus de sport et ceux qui en pratique le moins. Elle peut aider l’état à prendre des décisions comme par exemple dans quel département faire des campagnes pour les bien faits du sport. 
  
```javascript
var mapNbActDep = function() {
	var equipement = this.equipement;
	if (equipement) {
		emit({ libDep: equipement.libDep }, { nbActivite: 1 });
		emit(null, { nbActivite: 1 });
	}
};

var reduceNbActDep = function(keyInst, values) {
	var count = 0;
	values.forEach(function(value) {
		count += value.nbActivite;
	});
	return { nbActivite: count };
};

var query = {};

db.fait_activites.mapReduce(mapNbActDep, reduceNbActDep, {
	out: { inline: 1 },
	query: query
});

```

Visualisation de notre entrepôt de données avec NodeJS et React
===============================================================

Grâce à Node Js, React et MongoDB nous avons pu générer une application web qui nous fournis un rendu HTML de notre entrepôt de données et des résultats de nos requêtes, les résultats sont ainsi plus agréable à parcourir, et sont mieux adaptés à de l'analyse. 

***Aperçu de ce qu'on peut visualiser***

![alt tag](https://user-images.githubusercontent.com/11199130/32943949-1fbc539c-cb8e-11e7-8bdc-a5b58cc8b93e.png
)

Annexe
======

- Site du gouvernement https://www.data.gouv.fr/fr/datasets/recensement-des-equipements-sportifs-espaces-et-sites-de-pratiques/

- CSV
  - fiches Installations: https://www.data.gouv.fr/s/resources/recensement-des-equipements-sportifs-espaces-et-sites-de-pratiques/20170817-165143/20170817_RES_FichesInstallations.zip

  - fiches Equipements: https://www.data.gouv.fr/s/resources/recensement-des-equipements-sportifs-espaces-et-sites-de-pratiques/20170817-170027/20170817_RES_FichesEquipements.zip

  - fiches Activités: https://www.data.gouv.fr/s/resources/recensement-des-equipements-sportifs-espaces-et-sites-de-pratiques/20170817-170202/20170817_RES_FichesEquipementsActivites.zip


- JSON

- Logiciel
  - Talend : https://www.talend.com/products/data-integration/data-integration-open-studio/
  - MongoDB: https://www.mongodb.com/fr
  - MongoDB documentation : https://docs.mongodb.com/manual/
  - NodeJS: https://nodejs.org/en/
  - ReactJS: https://reactjs.org/

- NOSQL.zip

Le fichier NOSQL.zip contient le projet talend
Importer le projet dans talend et ne pas oublier des redéfinir tous les chemins des fichiers, en entrée et en sortie.
