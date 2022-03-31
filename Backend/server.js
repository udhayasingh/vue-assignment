const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require('./Routes');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = 8000;

const db = require('./models/connection');
global.db = db;
const models = require('./models');
global.models = models;

app.listen(port);

console.log('API server started on: ' + port);



routes(app);