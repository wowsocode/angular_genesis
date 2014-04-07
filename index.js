'use strict';

var app = require('./app/server.js')

app.start(function() {
    console.log('App started!')
})

module.exports = app
