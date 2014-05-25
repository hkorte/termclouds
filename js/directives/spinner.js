'use strict';

/* Directives */

app.directive('spinner', ['$window', '$timeout', function ($window, $timeout) {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			onClick: '&'
		},
		link: function (scope, ele, attrs) {

			$window.onresize = function () {
				scope.$apply();
			};

			scope.$watch(function () {
				return angular.element($window)[0].innerWidth;
			}, function () {
				scope.render();
			});

			scope.render = function () {
				var $container = jQuery(ele[0]);
				var marginTop = (Math.floor($container.width() * 0.65) - 29) / 2;
				$container.html('<div id="fountainG" style="margin: '+marginTop+'px auto;"><div id="fountainG_1" class="fountainG"></div>' +
					'<div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div>' +
					'<div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div>' +
					'<div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div>' +
					'<div id="fountainG_8" class="fountainG"></div></div>');
			};
		}}
}]);