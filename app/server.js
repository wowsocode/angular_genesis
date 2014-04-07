'use strict';

var Hapi = require('hapi')
  , server = new Hapi.Server('localhost'
    , 1337
    , {
      cors: false
    })
  , redirect = function(req, resp){
    resp().redirect('/')
  }

server.route([
  //home
  {
    method: 'GET'
    , path: '/'
    , handler: function(req, resp){
      resp.file('./public/index.html')
    }
  }

  //static js
  , {
    method: 'GET'
    , path: '/js/{param*}'
    , handler: {
      directory: {
        path: './public/js'
        , listing: false
        , index: false
      }
    }
  }

  //static templates
  , {
    method: 'GET'
    , path: '/templates/{param*}'
    , handler: {
      directory: {
        path: './public/templates'
        , listing: false
        , index: false
      }
    }
  }

  //static imgs
  , {
    method: 'GET'
    , path: '/img/{param*}'
    , handler: {
      directory: {
        path: './public/img'
        , listing: false
        , index: false
      }
    }
  }

  //static css
  , {
    method: 'GET'
    , path: '/css/{param*}'
    , handler: {
      directory: {
        path: './public/css'
        , listing: false
        , index: false
      }
    }
  }

  //view1
  , {
    method: 'GET'
    , path: '/view1'
    , handler: function(req, resp){
      resp.file('./public/index.html')
    }
  }

  //view2
  , {
    method: 'GET'
    , path: '/view2'
    , handler: function(req, resp){
      resp.file('./public/index.html')
    }
  }

  //catchall
  , {
    method: '*'
    , path: '/{p*}'
    , handler: redirect
  }
])

module.exports = server
