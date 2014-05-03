'use strict';

var services = angular.module('services', ['ngResource']);

services.factory('Scene', ['$resource',
    function($resource) {
        return $resource('data/data.json');
    }
]);