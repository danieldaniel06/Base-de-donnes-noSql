# Tutoriel pour lancer l'application

Pré-requis
==========

- Avoir nodejs sur sa machine
- Avoir mongodb sur sa machine
- Avoir la commande mongo accéssible directement en ligne de commande, pour tester : mongo --version
- Avoir commande npm accéssible directement en ligne de commande, pour tester : npm --version

Installation
============
  
- Faire un clone du projet avec la commmande git.
- Avec le terminal, placer vous dans le dossier qui vient d'être cloner.
- Executer les commandes suivantes :
    - mkdir data
    - mkdir data/db
    - mongod --dbpath data/db --logpath log.txt
- Ouvrir un autre terminal sur le repertoir courant et lancer : make
- Ouvrir un autre terminal sur le repertoir courant et placé vous dans serveur avec un "cd serveur"
    - Executer make
- Une fois les deux processus précédentes terminés, dans le deuxième terminal vous devez avoir :
    - Running on port 3000... we're connected!
- Avec le premier terminal, placez vous dans le dossier client/build avec la commande : cd client/build
    - Executer make
- Aller dans votre navigateur préféré et tapper : http://localhost:8000

- Les services disponible pour le moment au niveau du serveur sont :
    - http://localhost:3000/api/fait_activites
    - http://localhost:3000/api/fait_activites/statBudgetDepAnne/:niveau (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/statBudgetCommAnne/:niveau (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/topNSpectPart/:n/:dateDeb/:dateFin (! :n, :dateDep, :dateFin à définir)
    - http://localhost:3000/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/:niveau? (! :niveau à définir)
    - http://localhost:3000/api/fait_activites/cubeInstDate/:year? (! :year à définir)
  


Compte Rendus du Projet Base de donnée
======================================

- AHMED Daniel
- BAH Thierno

Sommaire 
========

- Introduction    
- Description des données sources    
- Extraction, Nettoyage et Transformation des données avec Talend    
- Stockage des données avec MongoDB    
- Agrégation des données avec JavaScript    
- Requêtes    
- Visualisation de notre entrepôt de données avec NodeJS et React    
- Annexe

Introduction
============

L'objectif de ce projet était de réaliser un entrepôt de données, c'est-à-dire une structure qui a pour but, contrairement aux bases de données “classique”, de regrouper les données d'une entreprise pour des fins analytiques et pour l'aide à la décision stratégique, action entreprise par les décideurs de l'entreprise qui vise à améliorer, quantitativement ou qualitativement, la performance de l'entreprise. C'est un puissant outil d'aide à la décision. 

Pour ce projet on a choisi de se mettre à la place d’une organisation qui aide l'etat à gérer sont budget pour tout ce qui concerne le sport en France, les activités sportives, les installations, les équipements.

Pour trouver des information relatives aux installations sportives dans toute la France nous sommes aller sur le site du gouvernement et nous avons sélectionné trois jeux de données qui vont nous servir à faire notre entrepôt de données. Nous allons tout d’abord décrire nos jeux de données puis expliquer comment on a fait pour construire cet entrepôt avec les outils utilisés.

Description des données sources
===============================

Sur le site du gouvernement nous avons trouvé un recensement national de l’intégralité des équipements sportifs, espaces et sites de pratiques.
Nous avons choisi trois fichiers qui nous apportait les informations nécessaires à la création de notre entrepôt de données.

La fiche “installations” nous donne toute sortes d’informations sur l’installation sportive comme son nom, son adresse complète, le nombre d'équipements qu’il y a, si il y a un gardien etc...

La fiche “équipements” nous donne des informations sur les équipements sportifs comme son nom, l’installation dans lequel on le trouve, sa matière, sa date de création etc..

La fiche “activités des fiches équipements” nous donne des informations sur les activités, leur noms, le niveau, la nature de l’activité si elle est scolaire. 

Cette dernière fiche recense les “événement sportif qui ont eu lieux dans les installations” mais pas avec beaucoup de détails comme le nombres de spectateurs, le nombres de participants, le budget alloué, le coût actuel de l'événement. Ses données étaient introuvables et pourtant elles étaient importante pour nous permettre de faire des analyses pertinente alors nous avons dû les créer nous même, ce qui sera expliquer un peu plus tard.

Extraction, Nettoyage et Transformation des données avec Talend
===============================================================

Pour “préparer” nos données nous avons utilisé le logiciel d'intégration de donnée Talend il est relativement simple et intuitif et grâce à lui nous avons pus mettre en entrée nos fichiers CSV et pouvoir choisir les données à extraire. Grâce à un mapping nous avons extrait les données puis nous avons changer les noms et les types de ses données pour leur donner des noms plus cohérent et plus précis. Nous avons ensuite choisi de mettre nos données dans un fichier en format JSON à la sortie. Le format JSON est assez facile à comprendre et les types de données qu'il a sont utilisées dans beaucoup de langage ce qui rendais sa manipulation beaucoup plus simple pour la suite du projet. Ce format nous était surtout très utile pour pouvoir importer nos données dans MongoDB.

Suite à cette étape d'extraction et de nettoyage nous avons quatres fichiers JSON qui vont être nos dimensions quand nous allons vouloir faire nos requêtes : Équipements, Installations, Date et Niveau.

Nous avons créé pour la dimension Date un fichier JSON qui contient les dates de tous les jours du 28/07/2005 au 28/07/2017 cette table vas nous servir lorsque nous allons créer notre table de fait et pour faire des analyses par rapport à des périodes de temps.

Voici une image pour illustrer ce processus d'extraction de nettoyage et de transformation avec Talend :

![alt tag](https://user-images.githubusercontent.com/16761554/32853119-8e302bf0-ca3a-11e7-942c-c8ba1465b943.png)

Stockage des données avec MongoDB
=================================

Pour stocker notre entrepôts de données nous avons choisi d’utiliser la technologie MongoDB. MongoDB est une base de données NoSQL, nous avons choisit de l’utiliser car c'est une technologie simple d’utilisation, qui propose un modèle de donnée flexible, qui a été conçu pour la performance et la disponibilité et que nous voulions faire quelque chose de performant. De plus MongoDB implémente le Map Reduce qui vas être utile pour nos requêtes.

Après avoir créé notre tables de fait grâce à JavaScript nous l’avons importé dans une collection dans une base de donnée de MongoDB grâce à la commande mongoimport qui nous permet d’importer un fichier JSON en une collection dans MongoDB, ensuite il ne nous restait plus qu’à faire des requêtes sur cette collection de Fait.

Agrégation des données avec JavaScript
======================================

Comme nous n’avions pas assez d’informations sur les événements sportifs qui ont eu lieux dans les installations il a fallu ajouter ses informations nous même, des informations comme le nombres de participants à cet événement, le nombre de spectateurs qui sont aller voir cet événement, le budget alloué pour l'événement, le coût de l’événement …

Grâce à un script JavaScript nous avons mis en relations ses données avec nos autres tables pour donner plus d’informations sur l'évènement sportif: l'activité pratiqué, la date et l’installation dans laquelle a eu lieux cet événement.
En combinant ses informations avec les faits numériques qu'on a rajouté on peut créer une ligne de notre table de fait.

Le processus d’entreprise qu’on a choisi de modéliser est : La gestion des événements sportifs  en france.
On peut étudier des phénomène comme la fréquentation d’une installation qui se traduit par les activités qu’il y a eu dans une installations et par le nombre de personnes qui sont venu y participer ou la regarder. On peux aussi regarder à quelle fréquence ont lieux ces événements sportifs et surtout où ont ils lieux, on peut regarder comment est repartis le budget pour les événements sportifs un peu partout et voir si il est utile ou pas de le redistribuer autrement, grâce à ça l'Etat peut faire des analyses de ce genre pour prendre une décision importante.

Une ligne de notre table de fait représente donc un événement sportif, on a des informations comme la date, l’activité pratiqué, l’installation utilisé, le nombre de participant homme,femme, le nombre de spectateur homme, femme, le budget, le coût. C’est le grain du processus que nous avons décidé de prendre.

Les dimensions que nous utilisons sont: Installations, Équipement, Date. 
Les faits numériques qui renseigne notre table de fait sont le nombre de spectateurs, le nombre de participants, le coût d’un événement sportif et le budget prévus pour cet événement.

![alt tag](https://user-images.githubusercontent.com/16761554/32834842-4ff89538-ca04-11e7-8d76-a48fac7cd451.png)

Nous obtenons le schéma ci-dessus.

Sur mongodb, il y a deux manière de représenter un document “Embedded Documents” qui consiste à tout mettre dans un seul document ou “Database References” qui consiste a faire une séparation des tables en utilisant leurs clé pour les référencer comme dans les bases de données relationnelle. Nous avons choisis “Embedded Document” pour une question de performance car il n'y pas besoin de faire une jointure entre deux document, elle est déjà faite en quelque sorte grâce à la façon dont nous avons construit notre table de faits.

La table de fait généré comporte : 383 723 documents.

Un exemple d'un document dans notre table de fait :

![alt tag](https://user-images.githubusercontent.com/16761554/32835132-437ad158-ca05-11e7-9f0b-b8a31b615d53.png)

Requêtes
========

Les requêtes sont toute dans le fichier "query" du git.

  - budget.js 

Cette requête est l'équivalent d’un GROUP BY ROLLUP, à partir de D dimensions nous obtenons D+1 niveaux d'agrégation, pour cette requête nos dimensions sont Departement, Date, et Niveau, l'information relative au niveau est dans le document de fait et celle relative au département est dans le document Equipement. 

Nous obtenons quatres niveaux d'agrégats: le département, l'année, le niveau de l'événement et budget total. Cette requête permet de savoir le budget dépensé par année pour chaque département pour l'organisation des événements sportifs a tout niveau. On peut augmenter la granularité en effectuant un slice, de cette façon on peut avoir cette information que pour les activités de niveau "Scolaire" par exemple.

  - budgetCom

Cette requête présente la même logique que la précédente, mais ici nous avons éffectué un drill-down qui nous permet d'avoir plus de détail sur la répartition des budgets non plus par département mais par commune.
  
  - budgetAgg

Ici nous avons repris les deux requettes précédentes en utilisant l'opérateur agréggate. Le but étant des faire des tests de perfomance comme on à un jeux de données assez importante. En effet dans notre table de fait, nous avons 383 723 documents dont chaque document représente une ligne de notre table de fait sous la forme d'agrégat.
  
  - requetes1.js
  
Cette requête est l'équivalent d’un GROUP BY CUBE, à partir de D dimensions nous obtenons 2^D niveaux d'agrégation. En partant des dimensions Date et Installation nous obtenons quatres niveaux d'agrégats.

Ici selon l’activité et l’installation nous cherchons a avoir des informations sur les participants, leur nombres et leur profil, si c'est des hommes, des femmes etc...

Cette requête peut aider à savoir comment adapter les installations par rapport aux personnes qui la fréquente par exemple.

  - requete2.js
  
Cette requête est la même que la précédente. MongoDB nous donne deux façons de faire cette requête une en utilisant d’enorme suite de query pour faire un groupage ou une plus sobre qui passe par l’utilisation d’un MapReduce, nous avons pu observer une différence de performance.

Map traverse tous les documents de notre table de fait et va pousser des informations à reduce selon une clé définie cette opération mets plus de temps que la première version de cette requête. 

  - requetes3.js
  
Nous avons fait une requête qui nous donne les activités qui attire le plus de spectateurs en les filtrant par département et sur une période de temps, on fait un groupage par activité par date et par département. Nous pouvons voir par exemple lors de l’été 2015 c'est à dire de Juin à Septembre 2015, quelles sont les activités qui ont eu le plus de spectateur à Nantes et dans quelles installations. Cette requête est intéressante pour choisir par exemple quelles activités mettre en avant au fil des saisons et savoir quelle sont les installations où les gens vont le plus et ainsi décider de les améliorer, et mieux répartir le budget entre les installations du département.

  - requetes4.js
  
Cette requête est une généralisation de la précédente, on veut avoir une analyse sur toute la France et non sur un seul département, ici on ne fait plus le filtrage par rapport au département et on peux faire une analyse sur un top 10 des événements sportifs qui ont rassemblés le plus de spectateur sur toute la France. Si on veut savoir qu’elle sont les installations les plus fréquentés dans la France lors de l'été 2015 ou de n'importe quelle autre période de temps entre 2005 et 2017.

  - requete5.js
  
 Cette requête nous donne le nombre total d'évènement sportif par département. Cette requête peut nous renseigner sur les département qui pratique le plus de sport et ceux qui en pratique le moins. Elle peut aider l’etat à prendre des décisions comme par exemple dans quel département faire des campagnes pour les bien fait du sport. 
  

Visualisation de notre entrepôt de données avec NodeJS et React
===============================================================

Grâce à NodeJS, React et MongoDB nous avons pu générer une application web qui nous fournis un rendus html de notre entrepôt de donnée et des résultats de nos requêtes, les résultats sont ainsi plus agréable à parcourir, et sont mieux adapter a de l'analyse. 

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
