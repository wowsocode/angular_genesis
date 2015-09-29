'use strict';

var Hapi = require('hapi'),
  Inert = require('inert'),
  Path = require('path'),
  mysql = require('./sqlUtil'),
  server = new Hapi.Server(),
  redirect = function(request, reply) {
    reply().redirect('/');
  };
server.register(Inert, function() {});
server.connection({
  port: 1337
});

server.route([
  //home
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.file('./public/index.html')
    }
  }

  //static js
  , {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: Path.normalize('./public/js'),
        listing: false,
        index: false
      }
    }
  }

  //static templates
  , {
    method: 'GET',
    path: '/templates/{param*}',
    handler: {
      directory: {
        path: Path.normalize('./public/templates'),
        index: false
      }
    }
  }

  //static imgs
  , {
    method: 'GET',
    path: '/img/{param*}',
    handler: {
      directory: {
        path: Path.normalize('./public/img'),
        listing: false,
        index: false
      }
    }
  }

  //static css
  , {
    method: 'GET',
    path: '/css/{param*}',
    handler: {
      directory: {
        path: Path.normalize('./public/css'),
        listing: false,
        index: false
      }
    }
  }

  //view1
  , {
    method: 'GET',
    path: '/view1',
    handler: function(request, reply) {
      reply.file('./public/index.html')
    }
  }

  //view2
  , {
    method: 'GET',
    path: '/view2',
    handler: function(request, reply) {
      reply.file('./public/index.html')
    }
  }

  //catchall
  , {
    method: '*',
    path: '/{p*}',
    handler: redirect
  }
]);

module.exports = server
