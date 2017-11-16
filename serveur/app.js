var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var FaitActivite = require('./model/fait');

var global = require('./global');

// Connect to mongoose

var url = 'mongodb://localhost:27017/' + global.dbName;

mongoose.connect(url, { useMongoClient: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!");
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', function(req, res) {
	res.send({ message: 'Please use api/' });
});

app.get('/api/fait_activites/statBudgetDepAnne/:niveau?', function(req, res) {
	FaitActivite.getStatBudgetDep(function(err, dbres) {
		if (err) throw err;

		res.json(dbres.reverse());
	}, req.params.niveau);
});

app.get('/api/fait_activites/statBudgetCommAnne/:niveau?', function(req, res) {
	var myResponce = [];
	var transform = new Map();
	FaitActivite.groupCom(function(err, dbres) {
		if (err) throw err;
		dbres.forEach(element => {
			if (element._id.libCom) {
				transform.set(element._id.libCom.replace(/ /g, ''), element);
			} else {
				transform.set('undefined', element);
			}
		});
		FaitActivite.groupComAnnee(function(err, dbres) {
			if (err) throw err;
			var cle;
			dbres.forEach((element, index) => {
				myResponce.push(element);
				cle = element._id.libCom ? element._id.libCom.replace(/[" ", "-"]/g, '') : 'undefined';
				var selectedItem = transform.get(cle);
				if (index < dbres.length - 1) {
					var cleSuv = dbres[index + 1]._id.libCom
						? dbres[index + 1]._id.libCom.replace(/[" ", "-"]/g, '')
						: 'undefined';
					if (cleSuv != cle) {
						myResponce.push(selectedItem);
					}
				} else {
					myResponce.push(selectedItem);
				}
			});
			FaitActivite.groupComAnneeTotal(function(err, dbres) {
				if (err) throw err;
				dbres.forEach(element => {
					myResponce.push(element);
				});
				res.json(myResponce);
				
			}, req.params.niveau);

		}, req.params.niveau);
	}, req.params.niveau);
});


app.get('/api/fait_activites/topNSpectPart/:n/:dateDeb/:dateFin', function(req, res) {
	var dateDeb = new Date(req.params.dateDeb);
	var dateFin = new Date(req.params.dateFin);
	FaitActivite.getTopNSpectateurAct(
		function(err, fait) {
			if (err) {
				throw err;
			}
			res.json(fait);
		},
		req.params.n,
		dateDeb,
		dateFin
	);
});

app.get('/api/fait_activites', function(req, res) {
	FaitActivite.getFaitActivite(function(err, fait) {
		if (err) {
			throw err;
		}
		res.json(fait);
	});
});

app.get('/api/fait_activites/cubeBudgetCoutDepAnneeNiveau/:niveau?', function(req, res) {
	var myResponce = [];
	var niveau = req.params.niveau ? req.params.niveau : false;
	FaitActivite.budgetGroupDepAnneeNiveau(function(err, fait) {
		fait.forEach(element => {
			myResponce.push(element);
		});

		FaitActivite.budgetGroupDepAnnee(function(err, fait) {
			fait.forEach(element => {
				myResponce.push(element);
			});

			FaitActivite.budgetGroupDep(function(err, fait) {
				fait.forEach(element => {
					myResponce.push(element);
				});

				FaitActivite.groupTopBudget(function(err, fait) {
					fait.forEach(element => {
						myResponce.push(element);
					});
					var mySort = function compare(a, b) {
						if (a._id && a._id.libDep && a._id.annee && a._id.niveau) {
							if (b._id && b._id.libDep && b._id.annee && b._id.niveau) {
								if (a._id.libDep == b._id.libDep && a._id.annee == b._id.annee) {
									if (a._id.niveau > b._id.niveau) {
										return 1;
									} else {
										return -1;
									}
								} else {
									if (a._id.libDep == b._id.libDep) {
										if (a._id.annee > b._id.annee) {
											return 1;
										} else {
											return -1;
										}
									} else {
										if (a._id.libDep > b._id.libDep) {
											return 1;
										} else {
											return -1;
										}
									}
								}
							}
						}
						return 0;
					};
					myResponce.sort(mySort);
					res.json(myResponce);
				}, niveau);
			}, niveau);
		}, niveau);
	}, niveau);
});

app.get('/api/fait_activites/cubeInstDate/:year?', function(req, res) {
	var myResponce = [];
	var transform = new Map();
	var year = false;
	if (req.params.year) {
		year = req.params.year;
	}

	FaitActivite.getFaitActiviteGroupByInst(function(err, fait) {
		if (err) {
			throw err;
		}

		fait.forEach(element => {
			if (element._id.nomInst) {
				transform.set(element._id.nomInst.replace(/ /g, ''), element);
			} else {
				transform.set('undefined', element);
			}
		});

		FaitActivite.getFaitActiviteGroupByInstActivite(function(err, fait) {
			if (err) {
				throw err;
			}

			var cle;
			fait.forEach((element, index) => {
				myResponce.push(element);
				cle = element._id.nomInst ? element._id.nomInst.replace(/ /g, '') : 'undefined';
				var selectedInst = transform.get(cle);
				if (index < fait.length - 1) {
					var cleSuv = fait[index + 1]._id.nomInst
						? fait[index + 1]._id.nomInst.replace(/ /g, '')
						: 'undefined';
					if (cleSuv != cle) {
						myResponce.push(selectedInst);
					}
				} else {
					myResponce.push(selectedInst);
				}
			});

			FaitActivite.getFaitActiviteGroupByActivite(function(err, fait) {
				if (err) {
					throw err;
				}
				fait.forEach(element => {
					myResponce.push(element);
				});

				FaitActivite.getTotatGroupActInst(function(err, fait) {
					if (err) {
						throw err;
					}
					fait.forEach(element => {
						myResponce.push(element);
					});
					res.json(myResponce);
				}, year);
			}, year);
		}, year);
	}, year);
});

app.listen(3000);
console.log('Running on port 3000...');
