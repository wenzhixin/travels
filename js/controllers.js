'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {
        $scope.scenes = $rootScope.senes;

        $scope.doFilter = function(type) {
            $scope.type = type;
        };

        var counter = function() {
            var count = 0;
            for (var i = 0; i < $scope.scenes.length; i++) {
                if ($scope.scenes[i].been) {
                    count++;
                } else {
                    $scope.scenes[i].been = false;
                }
            }
            $scope.count = count;

            if (!$scope.count) {
                $timeout(counter, 500);
            }
        };

        counter();
    }
]);

controllers.controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', '$window',
    function ($scope, $rootScope, $routeParams, $window) {
        $scope.scene = $rootScope.senes[$routeParams.index];
    }
]);