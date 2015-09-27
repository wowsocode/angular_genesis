'use strict';

var Hapi = require('hapi'),
  Inert = require('inert'),
  Path = require('path'),
  dbOpts,
  server = new Hapi.Server(),
  redirect = function(request, reply) {
    reply().redirect('/')
  };
server.register(Inert, function() {});
server.register({
  register: require('hapi-mongodb'),
  options: dbOpts
}, function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
});

server.connection({
  port: 1337
});

dbOpts = {
  'url': 'mongodb://localhost:27017/test',
  'settings': {
    'db': {
      'native_parse': false
    }
  }
};

server.pack.require('hapi-mongodb', dbOpts, function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
});

server.route([
  //home
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.file('./public/index.html')
    }
  }, {
    method: 'GET',
    path: '/users/{id}',
    handler: usersHandler
  }

  //static js
  , {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: Path.normalize('./public/js'),
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

function usersHandler (request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
    var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
 
    db.collection('users').findOne({  "_id" : new ObjectID(request.params.id) }, function(err, result) {
        if (err) return reply(Boom.internal('Internal MongoDB error', err));
        reply(result);
    });
}

module.exports = server
