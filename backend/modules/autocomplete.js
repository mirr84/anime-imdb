"use strict";

module.exports.initAuthApi = (app, mysql, db_config) => {

// get: /autocomplete/anime?name=хвост
// resp: status 2** { anime: [<anime>, ...] }
    app.get('/autocomplete/anime', (req, res) => {
        let name = req.query.name || '';

        var connection;
        mysql.createConnection(db_config)
	        .then(function(conn){
	        	connection = conn;
			    var result = conn.query("SELECT * FROM `" + db_config.database + "`.`anime` WHERE `name` LIKE '%" + name + "%'");
			    conn.end();
			    return result;
			})
			.then(function(rows){
			    res.send(rows);
			})
			.catch(function(error){
			    if (connection && connection.end) connection.end();
				res.send(error);
			});

    });

// get: /autocomplete/genre?name=фэ
// resp: status 2** { genre: [<genre>, ...] }
    app.get('/autocomplete/genre', (req, res) => {
        let name = req.query.name || '';

		var connection;
        mysql.createConnection(db_config)
	        .then(function(conn){
	        	connection = conn;
			    var result = conn.query("SELECT * FROM `" + db_config.database + "`.`genre` WHERE `name` LIKE '%" + name + "%'");
			    conn.end();
			    return result;
			})
			.then(function(rows){
			    res.send(rows);
			})
			.catch(function(error){
			    if (connection && connection.end) connection.end();
				res.send(error);
			});
        
    });

}