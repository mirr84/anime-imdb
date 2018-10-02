"use strict";

const genMsg = require('./utils').genMsg;

module.exports.initAuthApi = (app, mysql, db_config) => {

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

        let name = req.body.name;

        let connection;
        mysql.createConnection(db_config)
            .then((conn)=>{
                connection = conn;
                return connection.query(
                    "SELECT `id`, " +
                            "`name`, " +
                            "(SELECT `name` FROM `" + db_config.database + "`.`genre` `b` WHERE `b`.`id` = `a`.`id_genre`) as `genre`, " +
                            "(SELECT COUNT(*) FROM `anime_user` `c` WHERE `c`.`id_anime` = `a`.id) as `isNoAdd`, " +
                            "`col_season`, `col_part`, " +
                            "`url_image` " +
                    "FROM `" + db_config.database + "`.`anime` `a` " +
                    "WHERE `a`.`only_user` = 0 AND `a`.`name` LIKE '%" + name + "%'"
                );
            })
            .then((rows)=>{
                res.status(200).send(rows);
                connection.end();
            })
            .catch((error)=>{
                if (connection && connection.end) connection.end();
                res.status(401).send({msg: genMsg(error)});
            });

    });

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
// resp: status 2** или 401 или 5** { msg: [{type: ‘warn’: text: ‘уже есть в твоём списке’}] }
    app.get('/anime/add', (req, res) => {

        let token = req.headers.sessionid;
        console.log( req.body )

        res.send('');

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