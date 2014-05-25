app.controller("MainController", function($scope, $http){
	$scope.selectedIndex = "wikipedia";
	$scope.selectedType = "page";
	$scope.selectedField = "text";
	$scope.selectedSize = 128;
	$scope.query = "{\n  \"query_string\": {\n    \"default_field\": \"text\",\n    \"query\": \"java\"\n  }\n}";
	$scope.backgroundFilterChecked = false;
	$scope.backgroundFilter = "{\n  \"term\": {\n    \"text\": \"programming\"\n  }\n}";
	$scope.results = [];
	$scope.state = 'initial';
	$scope.search = function() {
		var request = {
			size: 0,
			query: JSON.parse($scope.query),
			aggregations: {
				cloud: {
					significant_terms: {
						field: $scope.selectedField,
						size: $scope.selectedSize
					}
				}
			}
		}
		if($scope.backgroundFilterChecked) {
			request.aggregations.cloud.significant_terms.background_filter = JSON.parse($scope.backgroundFilter);
		}
		$scope.state = 'searching';
		$http.post("/"+$scope.selectedIndex+"/"+$scope.selectedType+"/_search", request).success(function(data) {
			var buckets = data.aggregations.cloud.buckets;
			var size = buckets.length;
			var results = [];
			var maxValue = 16;
			var log2 = Math.log(2);
			for(var i = 0; i < size; i++) {
				results.push( [ buckets[i].key, maxValue - Math.floor((Math.log(1 + (i/size)) / log2) * 16)] );
			}
			$scope.results = results;
			$scope.state = 'finished';
		}).error(function(data) {
			console.log("Error!");
			console.log(data);
			$scope.errorMsg = JSON.stringify(data, undefined, 2);
			$scope.state = 'error';
		});
	};
	$scope.termclick = function(item) {
		$scope.query = "{\n  \"term\": {\n    \"" + $scope.selectedField + "\": \"" + item[0] + "\"\n  }\n}";
		$scope.search();
	};
	$scope.backgroundFilterSupported = false; // ES>=1.2.0 only
	$http.get("/").success(function(data) {
		$scope.backgroundFilterSupported = data.version.number >= "1.2.0";
	}).error(function(data) {
		console.log("Error requesting root \"/\"!");
		console.log(data);
	});
});