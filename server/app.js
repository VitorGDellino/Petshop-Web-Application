var express = require('express');
var path = require('path');
//var logger = require('morgan');
var mongoose = require('mongoose');
var clientRouter = require('./routes/client');
var adminRouter = require('./routes/admin');
var utilsRouter = require('./routes/utils');
mongoose.connect('mongodb://localhost:27017/petshop');
var cors = require('cors');
var app = express();

app.use(cors());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/client', clientRouter);
app.use('/admin', adminRouter);
app.use('/utils', utilsRouter);

// app.get('/utils/users', function (req, res, next) {   //NAO PRECISA DISSO APARENTEMENTE
  // res.json({msg: 'This is CORS-enabled for all origins!'})
// })

module.exports = app;
