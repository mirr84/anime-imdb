"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const query = require('url');

const auth = require('./modules/auth');
const anime = require('./modules/anime');
const autocomplete = require('./modules/autocomplete');

const app  = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

auth.initAuthApi(app);
anime.initAuthApi(app);
autocomplete.initAuthApi(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});