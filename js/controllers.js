'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$rootScope', '$window',
    function ($scope, $rootScope, $window) {
        $scope.scenes = $rootScope.senes;

        var count = 0;
        for (var i = 0; i < $scope.scenes.length; i++) {
            if ($scope.scenes[i].been) {
                count++;
            }
        }
        $scope.count = count;
    }
]);

controllers.controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', '$window',
    function ($scope, $rootScope, $routeParams, $window) {
        $scope.scene = $rootScope.senes[$routeParams.index];
    }
]);