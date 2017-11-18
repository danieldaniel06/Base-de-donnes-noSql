jsonDirectory = Files/jsonFiles
dataBase = data/db
fileFaitActivite = Files/jsonFiles/fait_activites_w.json
serviceDirectory = api/

serveApi : importFait
	$(MAKE) -C $(serviceDirectory) serve

importFait: unzip serveMongo
	echo "Importation de la table de fait dans mongodb dans testDataBase"
	mongoimport --db testDataBase --collection fait_activites --drop --file $(fileFaitActivite) --jsonArray
	rm -R $(jsonDirectory)


unzip: $(jsonDirectory)
	echo "Le fichier Files/jsonFiles exist, on continue le makefile"
	echo "Extraction du fichier zip contenant la table de fait et les dimension"
	unzip Files/jsonFile.zip -d $(jsonDirectory)

$(jsonDirectory):
	echo "Folder $(jsonDirectory) does not exist"
	mkdir -p $@

serveMongo: $(dataBase)
	echo "Lancement du serveur mongo"
	mongod --dbpath $(dataBase) --logpath log.txt &

$(dataBase):
	echo "Folder $(dataBase) does not exist"
	mkdir -p $@



