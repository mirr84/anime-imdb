"use strict";

const menuOnAuth = require('./utils').menuOnAuth;
const menuOffAuth = require('./utils').menuOffAuth;
const genMsg = require('./utils').genMsg;
const genToken = require('./utils').genToken;

const md5 = require('md5');

module.exports.initAuthApi = (app, mysql, db_config) => {

// get: /auth/check => Headers { token: <token> }
// resp: status 2** { menu: [{<menu>, ...}] } или 401 { menu: [<menu>, ...] }
    app.get('/auth/check', (req, res) => {
        let token = req.headers.sessionid;
        if (token) {

            let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;
                    var result = conn.query("SELECT count(*) as `c` FROM `" + db_config.database + "`.`token` WHERE `token` = '" + token + "' ");
                    conn.end();
                    return result;
                })
                .then((rows)=>{
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c && rows[0].c === 1) {
                       res.status(200).send(menuOnAuth); 
                    } else {
                        res.status(401).send(menuOffAuth);
                    }
                })
                .catch((error)=>{
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

        let login = req.body.login;
        let password = req.body.password;

        if (!login)  {
            res.status(401).send({msg: genMsg('логин не должен быть пустым')});
        } else
        if (!password)  {
            res.status(401).send({msg: genMsg('пароль не должен быть пустым')});
        } else {

            let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;
                    return connection.query("SELECT `id`, count(*) as `c` FROM `" + db_config.database + "`.`users` WHERE `login` = '" + login + "' AND `password` = '" + md5(password) + "' ");
                })
                .then((rows) => {
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c === 0) {
                        throw 'ошибка логина или пароля';
                    } else {
                        // ничего не делаем
                        return rows;
                    }
                })
                .then((rows)=>{
                    let token = genToken();
                    connection.query("INSERT INTO `" + db_config.database + "`.`token` (`id_user`, `token`) VALUES ('" + rows[0].id + "', '" + token + "');");
                    return token;
                })
                .then((rows)=>{
                    res.status(200).send({token: rows, menu: menuOnAuth});
                    connection.end();
                })
                .catch((error)=>{
                    if (connection && connection.end) connection.end();
                    res.status(401).send({msg: genMsg(error), menu: menuOffAuth});
                });
        }

    });

// post: /auth/reg => { <profile> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘логин не уникален’}] }
// { login: <login>, password: <password>, email: <email> }
    app.post('/auth/reg', (req, res) => {

		let login = req.body.login;
		let password = req.body.password;
        let email = req.body.email || '';

		if (!login)  {
			res.status(401).send({msg: genMsg('логин не должен быть пустым')});
		} else 
		if (!password)  {
			res.status(401).send({msg: genMsg('пароль не должен быть пустым')});
		} else {
			
			let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;                    
                    return connection.query("SELECT count(*) as `c` FROM `" + db_config.database + "`.`users` WHERE `login` = '" + login + "' ");
                })
                .then((rows) => {
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c === 1) {
                    	throw 'логин не уникален';
                    } else {
                        // ничего не делаем
                    }
                })
                .then((rows)=>{
                    return connection.query("INSERT INTO `" + db_config.database + "`.`users` (`login`, `password`) VALUES ('" + login + "', '" + md5(password) + "');");
                })
                .then((rows)=>{
                    return connection.query("INSERT INTO `profile` (`id_user`, `email`) VALUES ('" + rows.insertId + "', '" + email + "');");
                })
                .then((rows)=>{
                    res.sendStatus(200);
                    connection.end();
                })
                .catch((error)=>{
                    if (connection && connection.end) connection.end();
                    res.status(401).send({msg: genMsg(error)});
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