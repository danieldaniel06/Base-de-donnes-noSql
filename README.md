# Base-de-donnes-noSql
Le fichier NOSQL.zip contient le projet talend => à ouvrir avec talend et ne pas oublier des redéfinir tous les chemins dans le job.

Pré-requis
==========
- Avoir nodejs sur sa machine
- Avoir mongodb sur sa machine

Installation
============
  
- Faire un clone du projet avec la commmande git.
- Placer vous dans le dossier qui vient d'être cloner.
- Taper la commande suivantes :
    - npm install
- Une fois les dépendances installées, importer la base des faits avec la commande suivante :
    - mongoimport --db \<nom base de donnees\> --collection \<nom de la collection\> --drop --file jsonFiles/fait_activites_w.json --jsonArray
    - Ouvrir le fichier global.js et modifier les paramètres 
        - dbName : \<nom base de donnees\>
        - faitCollection : \<nom de la collection\>
- Tapper les commandes suivantes :
    - npm install -g nodemon
    - Une fois nodemon installé, taper : nodemon app
- Aller dans votre navigateur préféré et tapper : http://localhost:3000
- Les services disponible pour le moment sont :
    - http://localhost:3000/api/fait_activites
    - http://localhost:3000/api/fait_activites/groupInst
    - http://localhost:3000/api/fait_activites/groupInst/:year , remplacer :year par une annee
    - http://localhost:3000/api/fait_activites/groupAct
    - http://localhost:3000/api/fait_activites/groupAct/:year, remplacer :year par une annee
    - http://localhost:3000/api/fait_activites/groupInstAct
  


Compte Rendus du Projet Base de donnée
======================================

AHMED Daniel
BAH Thierno

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

L'objectif de ce projet était de réaliser un entrepôt de données, c’est à dire une structure qui a pour but, contrairement aux bases de données “classique”, de regrouper les données d’une entreprise pour des fins analytiques et pour aider à la décision stratégique, action entreprise par les décideurs de l'entreprise qui vise à améliorer, quantitativement ou qualitativement, la performance de l'entreprise. C’est un puissant outil d’aide à la décision.
Pour ce projet on a choisi de se mettre à la place d’une organisation bénévole qui aide l'etat à gérer les activités sportives, les installations et les équipements en termes de budget dans toute la France.
Pour trouver des information relatives aux installations sportives dans toute la France nous sommes aller sur le site du gouvernement et nous avons sélectionné trois jeux de données qui vont nous servir à faire notre entrepôt de données. Nous allons tout d’abord décrire nos jeux de données puis expliquer comment a fait pour construire cet entrepôt avec les outils utilisés et les difficultés rencontré.

Description des données sources
===============================

Sur le site du gouvernement nous avons trouvé un recensement national de l’intégralité des équipements sportifs, espaces et sites de pratiques.
Nous avons choisi trois fichiers qui nous apportait les informations nécessaires à la création de notre entrepôt de données.
La fiche “installations” nous donne toute sortes d’informations sur l’installation sportive comme son nom, son adresse complète, le nombre d'équipements qu’il y a, si il y a un gardien etc...
La fiche “équipements” nous donne des informations sur les équipements sportifs comme son nom, l’installation dans lequel on le trouve, sa matière, sa date de création etc..
La fiche “activités des fiches équipements” nous donne des informations sur les activités, leur noms, le niveau, la nature de l’activité si elle est scolaire ou pas par exemple. 
Cette dernière fiche recense les “événement sportif qui ont eu lieux dans les installations” mais pas avec beaucoup de détails comme le nombres de spectateurs, le nombres de participants, budget alloué. Mais comme ses données étaient introuvables nous avons dû les créer nous même ce qui sera expliquer un peu plus tard.

Extraction, Nettoyage et Transformation des données avec Talend
===============================================================

Pour “préparer” nos données nous avons utilisé le logiciel d'intégration de donnée Talend il est relativement simple et intuitif et grâce à lui nous avons pus mettre en entrée nos fichiers CSV et pouvoir choisir les données à extraire. Grâce à un mapping nous avons extrait les données puis nous avons changer les noms de ses données pour leur donner des noms plus cohérent et plus précis. Nous avons ensuite choisi de mettre nos données dans un fichier en format JSON à la sortie. Le format JSON est assez simple facile à comprendre et les types de données sont utilisées dans beaucoup de langage et surtout ce format nous était très utile pour pouvoir importer nos données dans MongoDB.
Suite à cette étape nous avons quatres fichiers JSON qui vont être nos dimensions quand nous allons vouloir faire nos requêtes : Équipements, Installations, Date et Niveau. Nous avons créé pour la dimension Date aussi un fichier JSON qui contient les dates de tous les jours du 28/07/2005 au 28/07/2017 cette table vas nous être utiles lorsque nous allons créer notre table de fait et pour faire des analyses par rapport à des périodes de temps.

Stockage des données avec MongoDB
=================================

Pour stocker notre entrepôts de données nous avons choisi d’utiliser la technologie MongoDB. MongoDB est une base de données NoSQL, nous avons choisit de l’utiliser car il est simple d’utilisation, qu’il propose un modèle de donnée flexible, qu’il a été conçu pour la performance et la disponibilité et que nous voulions faire quelque chose de performant. De plus MongoDB implémente le Map Reduce, fonction qui vas nous être très utiles quand nous allons faire nos requêtes
Après avoir créé notre tables de fait grâce à JavaScript nous l’avons importé dans une collection dans une base de donné de MongoDB grâce à la commande mongoimport qui nous permet d’importer un fichier json sous forme de collection dans MongoDB et ensuite il ne nous restait plus qu’à faire des requêtes sur cette collection de Fait.

Agrégation des données avec JavaScript
======================================

Comme nous n’avions pas assez d’informations sur les événements sportifs qui ont eu lieux dans les installations il a fallu ajouter ses informations nous même, des informations comme le nombres de participants à cet événement, le nombre de spectateurs qui sont aller voir cet événement, le budget alloué pour l'événement, le coût de l’événement …
On a mis en relations ses données avec nos autres tables pour donner plus d’informations sur l’activité de l'évènement, la date et l’installation dans laquelle a eu lieux cet événement.
Le processus d’entreprise qu’on a choisi de modéliser est : Les événements sportifs réalisés avec un équipement en france.
La fréquentation d’une installation se traduit par les activités qu’il y a eu dans une installations et par le nombre de personnes qui sont venu y participer ou la regarder. On peux aussi regarder à quelle fréquence ont lieux ces événements sportifs, si il y a en beaucoup en peu de temps dans notre installation ou si il y en a très peu ou pas du tout sur une énorme période de temps, grâce à cette informations nous pouvons prendre nos décisions.
Une ligne de notre table de fait représente donc un événement sportif, on a des informations comme la date, l’activité pratiqué, l’installation utilisé, le nombre de participant homme,femme, le nombre de spectateur homme, femme, le budget, le coût. C’est le grain du processus que nous avons décidé de prendre.
Les dimensions que nous utilisons sont: Installations, Équipement, Date. 
Les faits numériques qui renseigne notre table de fait sont le nombre de spectateurs, le nombre de participants, le coût d’un événement sportif et le budget prévus pour cet événement.

![alt tag](https://user-images.githubusercontent.com/16761554/32834842-4ff89538-ca04-11e7-8d76-a48fac7cd451.png)

