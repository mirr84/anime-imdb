"use strict";

module.exports.initAuthApi = (app) => {

    // get:  /anime/top100
// resp: status 2** { anime: [<anime>, ...] }
    app.get('/anime/top100', (req, res) => {
        res.send('123');
    });

// post:  /anime/list => { <filter> }
// resp: status 2** { anime: [<anime>, ...] }
// post:  /anime/list => Headers { token: <token> } { <filter> }
// resp: status 2** { anime: [<anime>, ...] } или 401
    app.post('/anime/list', (req, res) => {
        res.send('123');
    });

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
// resp: status 2** или 401 или 5** { msg: [{type: ‘warn’: text: ‘уже есть в твоём списке’}] }
    app.get('/anime/add', (req, res) => {
        res.send('123');
    });

// get: /anime/remote?id=<id_anime> => Headers { token: <token> }
// resp: status 2** или 401 или 5** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.get('/anime/remote', (req, res) => {
        res.send('123');
    });

// post:  /anime/edit => Headers { token: <token> } { <anime> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.post('/anime/edit', (req, res) => {
        res.send('123');
    });

}