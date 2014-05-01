'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'controllers',
    'filters'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl'
            }).
            when('/:index', {
                templateUrl: 'partials/detail.html',
                controller: 'DetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);