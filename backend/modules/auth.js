"use strict";

module.exports.initAuthApi = (app) => {

// get: /auth/check => Headers { token: <token> }
// resp: status 2** { menu: [{<menu>, ...}] } или 401 { menu: [<menu>, ...] }
    app.get('/auth/check', (req, res) => {
        res.send('123');
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