"use strict";

module.exports.initAuthApi = (app) => {

// get: /autocomplete/anime?name=хвост
// resp: status 2** { anime: [<anime>, ...] }
    app.get('/autocomplete/anime', (req, res) => {
        let name = req.query.name || '';

        res.send('123 ' + name);
    });

// get: /autocomplete/genre?name=фэ
// resp: status 2** { genre: [<genre>, ...] }
    app.get('/autocomplete/genre', (req, res) => {
        let name = req.query.name || '';

        res.send('123');
    });

}