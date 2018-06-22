var express = require('express');
var path = require('path');
var logger = require('morgan');

var clientRouter = require('./routes/client');
var adminRouter = require('./routes/admin');
var utilsRouter = require('./routes/utils');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/client', clientRouter);
app.use('/admin', adminRouter);
app.use('/utils', utilsRouter);

module.exports = app;
