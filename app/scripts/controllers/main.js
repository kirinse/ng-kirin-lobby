'use strict';

/**
 * @ngdoc function
 * @name kirinLobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kirinLobbyApp
 */
angular.module('kirinLobbyApp')
  .controller('MainCtrl', function ($scope, $modal, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.open = function(size) {
    	var modalInstance = $modal.open({
    		templateUrl: 'myModalContent.html',
    		controller: 'ModalInstanceCtrl',
    		size: size,
    		resolve: {
    			items: function () {
    				return $scope.awesomeThings;
    			}
    		}
    	});
    	modalInstance.result.then(function (selectedItem) {
    		$scope.selected = selectedItem;
    	}, function() {
    		$log.info('Modal dismissed at: ' + new Date());
    	});
    };
  })
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  	$scope.items = items;
	$scope.selected = {
	    item: $scope.items[0]
	};
	$scope.ok = function () {
	    $modalInstance.close($scope.selected.item);
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
