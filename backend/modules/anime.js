"use strict";

const url = require('url');
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

        let token = req.headers.sessionid;
        let name = req.body.name;
        let only_user = req.body.only_user || false;

        let connection;
        mysql.createConnection(db_config)
            .then((conn)=>{
                connection = conn;
                return  connection.query("SELECT `id_user` FROM `" + db_config.database + "`.`token` `t` WHERE `t`.`token` = '" + token + "' LIMIT 1")
            })
            .then((rows)=>{
                let id_user = rows && Array.isArray(rows) && rows.length===1? rows[0].id_user : 0;

                return  connection.query(
                            "SELECT `id`, " +
                                    "`name`, " +
                                    "(SELECT `name` FROM `" + db_config.database + "`.`genre` `b` WHERE `b`.`id` = `a`.`id_genre`) AS `genre`, " +
                                    "(SELECT COUNT(*) FROM `" + db_config.database + "`.`anime` `b` WHERE `a`.`id` = `b`.`id_origin_anime` AND `b`.`only_user` = '" + id_user + "') AS `isNoAdd`, " +
                                    " `col_season`, `col_part`, " +
                                    "`url_image` " +
                            "FROM `" + db_config.database + "`.`anime` `a` " +
                            "WHERE `a`.`only_user` = '" + (only_user?id_user:0) + "' AND `a`.`name` LIKE '%" + name + "%' " + (only_user?"and `a`.`id_origin_anime` != 0":"")
                        )
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
        let url_parts = url.parse(req.url, true);
        let id_add = url_parts.query.id;

        if (!token) {
            res.status(401).send({msg: genMsg('ошибка токена')});
        } else if (!id_add) {
            res.status(500).send({msg: genMsg('ошибка выбора')});
        } else {

            let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;
                    return connection.query("SELECT COUNT(*) `c`, `id_user` FROM `" + db_config.database + "`.`token` `t` WHERE `t`.`token` = '" + token + "'");
                })
                .then((rows)=>{
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c === 1) {
                        // ничего не делаем
                        return rows;
                    } else {
                        throw 'ты кто такой?';
                    }
                })
                .then((rows)=>{
                    connection.query(
                        "INSERT INTO `" + db_config.database + "`.`anime` (`id_genre`,`name`,`col_season`,`col_part`,`url_image`,`only_user`,`id_origin_anime`) " +
                            "SELECT `a`.`id_genre`, `a`.`name`, `a`.`col_season`, `a`.`col_part`, `a`.`url_image`, '" + rows[0].id_user + "' AS `only_user`, '" + id_add + "' AS `id_origin_anime`  " +
                            "FROM `" + db_config.database + "`.`anime` `a` " +
                            "WHERE `a`.`id` = '" + id_add + "'"
                                    );
                    res.status(200).send(rows);
                    connection.end();
                })
                .catch((error)=>{
                    if (connection && connection.end) connection.end();
                    res.status(401).send({msg: genMsg(error)});
                });

        }

    });

// get: /anime/remote?id=<id_anime> => Headers { token: <token> }
// resp: status 2** или 401 или 5** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.get('/anime/remote', (req, res) => {
        let token = req.headers.sessionid;
        let url_parts = url.parse(req.url, true);
        let id_remote = url_parts.query.id;

        if (!token) {
            res.status(401).send({msg: genMsg('ошибка токена')});
        } else if (!id_remote) {
            res.status(500).send({msg: genMsg('ошибка выбора')});
        } else {

            let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;
                    return connection.query("SELECT COUNT(*) `c`, `id_user` FROM `" + db_config.database + "`.`token` `t` WHERE `t`.`token` = '" + token + "'");
                })
                .then((rows)=>{
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c === 1) {
                        // ничего не делаем
                        return rows;
                    } else {
                        throw 'ты кто такой?';
                    }
                })
                .then((rows)=>{
                    return connection.query("DELETE FROM `" + db_config.database + "`.`anime` WHERE `id` = '" + id_remote + "' AND `only_user` = '" + rows[0].id_user + "'");
                })
                .then((rows)=>{
                    res.status(200).send(rows);
                    connection.end();
                })
                .catch((error)=>{
                    if (connection && connection.end) connection.end();
                    res.status(401).send({msg: genMsg(error)});
                });

        }

    });

// get: /anime/info?id=<id_anime> => Headers { token: <token> }
// resp: status 2** или 401 или 5** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.get('/anime/info', (req, res) => {
        let token = req.headers.sessionid;
        let url_parts = url.parse(req.url, true);
        let id_info = url_parts.query.id;

        if (!token) {
            res.status(401).send({msg: genMsg('ошибка токена')});
        } else if (!id_info) {
            res.status(500).send({msg: genMsg('ошибка выбора')});
        } else {

            let connection;
            mysql.createConnection(db_config)
                .then((conn)=>{
                    connection = conn;
                    return connection.query("SELECT COUNT(*) `c`, `id_user` FROM `" + db_config.database + "`.`token` `t` WHERE `t`.`token` = '" + token + "'");
                })
                .then((rows)=>{
                    if (Array.isArray(rows) && rows.length === 1 && rows[0].c === 1) {
                        // ничего не делаем
                        return rows;
                    } else {
                        throw 'ты кто такой?';
                    }
                })
                .then((rows)=>{
                    return connection.query("SELECT * FROM `" + db_config.database + "`.`anime` `a` WHERE `a`.`id` = '" + id_info + "' AND `a`.`only_user` = '" + rows[0].id_user + "'");
                })
                .then((rows)=>{
                    res.status(200).send(rows);
                    connection.end();
                })
                .catch((error)=>{
                    if (connection && connection.end) connection.end();
                    res.status(401).send({msg: genMsg(error)});
                });

        }

    });

// post:  /anime/edit => Headers { token: <token> } { <anime> }
// resp: status 2** или 4** { msg: [{type: ‘warn’: text: ‘что то пошло не так’}] }
    app.post('/anime/edit', (req, res) => {
        res.send('123');
    });

}