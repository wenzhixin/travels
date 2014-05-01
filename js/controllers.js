'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/data.json').success(function(list) {
            $scope.scenes = list;
        });
    }
]);

controllers.controller('DetailCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('data/data.json').success(function(list) {
            $scope.scene = list[$routeParams.index];
        });
    }
]);