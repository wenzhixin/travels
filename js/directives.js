var directives = angular.module('directives', []);

directives.directive('srollRestoreDirective', ['$window',
    function($window) {
        return function(scope, element, attrs) {
            if (scope.$last) {
                $('body').scrollTop(store.get('list.scroll.top'));
                angular.element($window).on('scroll', function() {
                    store.set('list.scroll.top', $('body').scrollTop());
                });
            }
        };
    }
]);

directives.directive('srollTopDirective', ['$window',
    function($window) {
        return function(scope, element, attrs) {
            angular.element($window).off('scroll');
            $('body').scrollTop(0);
        };
    }
]);

