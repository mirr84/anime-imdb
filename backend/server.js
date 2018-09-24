"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const mysql = require('promise-mysql');

const auth = require('./modules/auth');
const anime = require('./modules/anime');
const autocomplete = require('./modules/autocomplete');

const app  = express();

const port = 8000;
const db_config = {
    host: '87.236.19.149',
    user: 'y913929d_anime',
    password: '123456',
    database: 'y913929d_anime'
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

auth.initAuthApi(app, mysql, db_config);
anime.initAuthApi(app, mysql, db_config);
autocomplete.initAuthApi(app, mysql, db_config);

app.listen(port, () => {
    console.log('We are live on ' + port);
});