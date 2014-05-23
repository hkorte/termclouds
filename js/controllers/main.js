app.controller("MainController", function($scope, $http){
	$scope.selectedIndex = "wikipedia";
	$scope.selectedType = "page";
	$scope.selectedField = "text";
	$scope.selectedSize = 128;
	$scope.query = "{\n\t\"query_string\": {\n\t\t\"default_field\": \"text\",\n\t\t\"query\": \"programming\"\n\t}\n}";
	$scope.results = [];
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
		}).error(function(data) {
			console.log("Error!");
			console.log(data);
		});
	};
	$scope.termclick = function(item) {
		$scope.query = "{\n\t\"query_string\": {\n\t\t\"default_field\": \"" + $scope.selectedField + "\",\n\t\t\"query\": \"" + item[0] + "\"\n\t}\n}";
		$scope.search();
	}
});