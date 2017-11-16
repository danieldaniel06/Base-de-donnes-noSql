jsonDirectory = Files/jsonFiles
dataBase = data/db
fileFaitActivite = Files/jsonFiles/fait_activites_w.json
serviceDirectory = serveur/

importFait: unzip
	echo "Importation de la table de fait dans mongodb dans testDataBase"
	mongoimport --db testDataBase --collection fait_activites --drop --file $(fileFaitActivite) --jsonArray


unzip: $(jsonDirectory)
	echo "Le fichier Files/jsonFiles exist, on continue le makefile"
	echo "Extraction du fichier zip contenant la table de fait et les dimension"
	unzip Files/jsonFile.zip -d $(jsonDirectory)
	

$(jsonDirectory):
	echo "Folder $(jsonDirectory) does not exist"
	mkdir -p $@