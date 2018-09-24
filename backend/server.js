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
const cors = require('cors');

const app  = express();

const port = 8000;
const db_config = {
    host: '87.236.19.149',
    user: 'y913929d_anime',
    password: '123456',
    database: 'y913929d_anime'
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

auth.initAuthApi(app, mysql, db_config);
anime.initAuthApi(app, mysql, db_config);
autocomplete.initAuthApi(app, mysql, db_config);

app.listen(port, () => {
    console.log('We are live on ' + port);
});