"use strict";

const menuOffAuth = { login: true, reg: true, profile: false, list: true, my_list: false, chatRoom: false };
const menuOnAuth = { login: false, reg: false, profile: true, list: true, my_list: true, chatRoom: true };

module.exports.initAuthApi = (app, mysql, db_config) => {

// get: /auth/check => Headers { token: <token> }
// resp: status 2** { menu: [{<menu>, ...}] } или 401 { menu: [<menu>, ...] }
    app.get('/auth/check', (req, res) => {
        let token = req.headers.token;
        if (token) {

            let connection;
            mysql.createConnection(db_config)
                .then(function(conn){
                    connection = conn;
                    var result = conn.query("SELECT count(*) as `c` FROM `" + db_config.database + "`.`token` WHERE `token` = '" + token + "' ");
                    conn.end();
                    return result;
                })
                .then(function(rows){
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c && rows[0].c === 1) {
                       res.status(200).send(menuOnAuth); 
                    } else {
                        res.status(401).send(menuOffAuth);
                    }
                })
                .catch(function(error){
                    if (connection && connection.end) connection.end();
                    res.status(401).send(menuOffAuth);
                });

        } else {
            res.status(401).send(menuOffAuth);
        }        
    });

// post: /auth/login => { login: <login>, password: <password> }
// resp: status 2** { token: <token> } или 401
    app.post('/auth/login', (req, res) => {
        res.send('123');
    });

// post: /auth/reg => { <profile> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘логин не уникален’}] }
// { login: <login>, password: <password>, email: <email> }
    app.post('/auth/reg', (req, res) => {

		let login = req.body.login;
		let password = req.body.password;

		if (!login)  {
			res.status(401).send({ msg: [{type: 'warn', text: 'логин не должен быть пустым'}] });
		} else 
		if (!password)  {
			res.status(401).send({ msg: [{type: 'warn', text: 'пароль не должен быть пустым'}] });
		} else {
			
			let connection;
            mysql.createConnection(db_config)
                .then(function(conn){
                    connection = conn;                    
                    return conn.query("SELECT count(*) as `c` FROM `" + db_config.database + "`.`users` WHERE `login` = '" + login + "' ");
                })
                .then(function(rows){
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c && rows[0].c === 1) {
                    	// ничего не делаем
                    } else {
						res.status(401).send({ msg: [{type: 'warn', text: 'логин не уникален'}] });
						throw 'логин не уникален';
                    }
                })
                .then(function(rows){
					res.send('регим => ' + login + ' ' + password);
					conn.end();
                })
                .catch(function(error){
                    if (connection && connection.end) connection.end();
                    res.status(401).send({ msg: [{type: 'warn', text: error || 'что то пошло не так'}] });
                });

		}        
    });

// get: /auth/profile => Headers { token: <token> }
// resp: status 2** { <profile> } или 401
    app.get('/auth/profile', (req, res) => {
        res.send('123');
    });

// post:  /auth/profile => Headers { token: <token> } + { <profile> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.post('/auth/profile', (req, res) => {
        res.send('123');
    });

}