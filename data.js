var data = {}; 
var connection;

data.use = function(cn){
	connection = cn;
}

data.insertWord = function(req, res, next){
	var fs = require('fs');
	var file = __dirname + '/database_word.json';

	fs.readFile(file, 'utf8', function(err, data){
		if (err) throw err;

		data = JSON.parse(data);
		data.forEach(function(word){
			
			connection.query('INSERT INTO word SET ?', { id: word.Id,
														kanji: word.Word,
														mean:  word.Mean,
														level: 3,
														on:  word.Onyomi,
														kun: word.Kunyomi,
														image: word.ImagePath,
														detail: word.GiaiNghia 
													}, function(err, r) {
					 										 if (err) throw err;
					 										 else console.log(r.insertId);
			});
		});
	});

	next();
};

data.insertExample = function(req, res, next){
	var fs = require('fs');
	var file = __dirname + '/database_example.json';

	fs.readFile(file, 'utf8', function(err, data){
		if (err) throw err;

		data = JSON.parse(data);
		data.forEach(function(example){
			
			connection.query('INSERT INTO example SET ?', { id: example.Id,
															kanji_id : example.IdKanji,
															phonetic : example.PhienAm,
															mean : example.Nghia,
															word: example.HanTu,
															china: example.HanViet
			}, function(err, r) {
				 if (err) throw err;
				 else console.log(r.insertId);
			});
		});
	});
	next();
}

data.dumpWord = function(req, res, next){
	connection.query('SELECT * FROM word', function(err, docs){
		if (err) throw err;
		else res.json(docs);
	});
};
module.exports = data;