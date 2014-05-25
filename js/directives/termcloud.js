'use strict';

/* Directives */

app.directive('termcloud', ['$window', '$timeout', function ($window, $timeout) {
	return {
		restrict: 'A',
		scope: {
			data: '=',
			termclick: '=',
			label: '@',
			onClick: '&'
		},
		link: function (scope, ele, attrs) {

			var renderTimeout;

			$window.onresize = function () {
				scope.$apply();
			};

			scope.$watch(function () {
				return angular.element($window)[0].innerWidth;
			}, function () {
				scope.render(scope.data);
			});

			scope.$watch('data', function (newData) {
				scope.render(newData);
			}, true);

			scope.render = function (data) {

				if (!data) {
					return;
				}
				if (renderTimeout) {
					clearTimeout(renderTimeout);
				}

				var $canvas = jQuery(ele[0]);
				$canvas.attr('width', Math.floor($canvas.width()));
				$canvas.attr('height', Math.floor($canvas.width() * 0.65));

				renderTimeout = $timeout(function () {
					var options = {
						gridSize: Math.round(16 * $canvas.innerWidth() / 1024),
						weightFactor: Math.round(4 * $canvas.innerWidth() / 1024),
						fontFamily: 'Gibson-Regular, Times, sans-serif',
						color: function (word, weight) {
							return 'rgba(116,183,48,'+(weight/16)+')';
						},
						click: scope.termclick,
						rotateRatio: 0.5,
						backgroundColor: 'transparent',
						list: data
					};
					console.log(options);
					WordCloud(ele[0], options);
				}, 200);
			};

		}}
}]);