'use strict';

// Declare app level module which depends on filters, and services
angular.module('lb', [
  'ngRoute',
  'lb.filters',
  'globalNav',
  'lb.services',
  'lb.directives',
  'lb.controllers'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/view1', {templateUrl: 'templates/partials/partial1.html', controller: 'MyCtrl1'})
    .when('/view2', {templateUrl: 'templates/partials/partial2.html', controller: 'MyCtrl2'})
}]).config(['$locationProvider', function($locationProvider) {
  $locationProvider
    .html5Mode(true)
    .hashPrefix('!')
}])
