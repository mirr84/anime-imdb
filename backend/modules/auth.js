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
                    // res.send(menuOnAuth);
                    res.send(rows);
                })
                .catch(function(error){
                    if (connection && connection.end) connection.end();
                    res.send(menuOffAuth);
                });


        } else {
            res.send(menuOffAuth);
        }
        
    });

// post: /auth/login => { login: <login>, password: <password> }
// resp: status 2** { token: <token> } или 401
    app.post('/auth/login', (req, res) => {
        res.send('123');
    });

// post: /auth/reg => { <profile> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘логин не уникален’}] }
    app.post('/auth/reg', (req, res) => {
        res.send('123');
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