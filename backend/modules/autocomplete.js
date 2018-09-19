"use strict";

module.exports.initAuthApi = (app) => {

// get: /autocomplete/anime?name=хвост
// resp: status 2** { anime: [<anime>, ...] }
    app.get('/autocomplete/anime', (req, res) => {

        res.send('123');
    });

// get: /autocomplete/genre?name=фэ
// resp: status 2** { genre: [<genre>, ...] }
    app.get('/autocomplete/genre', (req, res) => {
        res.send('123');
    });

}