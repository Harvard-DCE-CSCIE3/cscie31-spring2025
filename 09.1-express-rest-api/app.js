// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const apiphotos = require('./routes/api/api.photos');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)  
  .catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });
// initialize express
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/photos', apiphotos);

// catch any remaining routing errors
app.use((req, res, next)=>{
  const err = new Error('Not Found' + req.url);
  err.status = 404;
  next(err);
});
module.exports = app;
