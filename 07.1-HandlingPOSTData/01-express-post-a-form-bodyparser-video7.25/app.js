// app.js

const express = require('express');
const path = require('path');
const photos = require('./routes/photos');
const bodyparser = require('body-parser');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.end("placeholder middleware to demonstrate handling a request for the '/' root path")
});

app.use('/photos', photos);

app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
