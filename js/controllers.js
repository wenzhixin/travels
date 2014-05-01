'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/data.json').success(function(list) {
            $scope.scenes = list;

            var count = 0;
            for (var i = 0; i < list.length; i++) {
                if (list[i].been) {
                    count++;
                }
            }
            $scope.count = count;
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