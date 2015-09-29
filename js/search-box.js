'use strict';

/* Directives */


angular.module('lb.directives')
// .config(function (uiGmapGoogleMapApiProvider) {
// 	uiGmapGoogleMapApiProvider.configure({
// 		key: 'AIzaSyBoIhmdzSJQcKUBgmF5V2EUFD4Dgngptls',
// 		v: '3.20',
// 		libraries: 'places'
// 	});
// })
.directive('searchBox', function () {
    return {
    	restrict: 'E',
    	bindToController: true,
    	controller: 'searchBoxController',
    	controllerAs: 'searchBoxCtrl',
    	scope: {},
    	replace: true,
    	templateUrl: 'templates/forms-ui/search-box.tpl.html'
    }
  })
  .controller('searchBoxController', ['$window', function ($window) {
  	var self = this;
  	console.log(self);
  }]);