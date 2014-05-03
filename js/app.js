'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'controllers',
    'services',
    'filters',
    'directives'
]).value('$anchorScroll', angular.noop);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl',
                state: 'list'
            }).
            when('/:index', {
                templateUrl: 'partials/detail.html',
                controller: 'DetailCtrl',
                state: 'detail'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.run(['$rootScope', 'Scene', '$window',
    function($rootScope, Scene, $window) {
        $rootScope.senes = Scene.query();
    }
]);