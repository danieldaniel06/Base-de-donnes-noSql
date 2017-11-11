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
  
