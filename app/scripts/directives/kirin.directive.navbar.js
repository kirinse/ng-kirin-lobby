'use strict';
var kn = angular.module('kirin.navbar', ['ngSanitize']);

kn
.directive('kirinNavbar', function () {
		return {
				restrict: 'AE',
				scope: {
						brand: '=',
						menus: '=',
						affixed: '=',
						search: '=',
						searchfn: '&',
						navfn: '&',
						inverse: '='
				},
				templateUrl: 'views/navbar.html',
				controller: function ($scope, $element, $attrs) {
						$scope.defaults = {
								brand: '<span class="glyphicon glyphicon-user"></span>',
								menus: [],
								search: { show: false }
						};
						if (angular.isUndefined($attrs.navfn)) {
								$scope.navfn = function (action) {
										if (angular.isObject(action)) {
											$scope.$emit('nav.menu', action);
										}
										else {
											$scope.$emit('nav.menu', { 'action': action });
										}
								};
						}
						if (angular.isUndefined($attrs.searchfn)) {
								$scope.searchfn = function () {
										$scope.$emit('nav.search.execute');
								};
						}
						$scope.$watch('affixed', function (val, old) {
							var b = angular.element(angular.element(window.document)[0].body);
							if (angular.equals(val, 'top') && !b.hasClass('navbar-affixed-top')) {
								if (b.hasClass('navbar-affixed-bottom')) {
									b.removeClass('navbar-affixed-bottom');
								}
								b.addClass('navbar-affixed-top');
							} else if (angular.equals(val, 'bottom') && !b.hasClass('navbar-affixed-bottom')) {
								if (b.hasClass('navbar-affixed-top')){
									b.removeClass('navbar-affixed-top');
								}
								b.addClass('navbar-affixed-bottom');
							} else {
								if (b.hasClass('navbar-affixed-top')) {
									b.removeClass('navbar-affixed-top');
								}
								if (b.hasClass('navbar-affixed-bottom')) {
									b.removeClass('navbar-affixed-bottom');
								}
							}
						});
						$scope.noop = function () {
								angular.noop();
						};
						$scope.navAction = function (action) {
								$scope.navfn({ 'action': action });
						};
						$scope.haveBranding = function () {
								return angular.isDefined($attrs.brand) ? $scope.brand : $scope.defaults.brand;
						};
						$scope.hasMenus = function () {
								return angular.isDefined($attrs.menus);
						};
						$scope.hasDropdownMenu = function (menu) {
								return angular.isDefined(menu.menu) && angular.isArray(menu.menu);
						};
						$scope.isDivider = function (item) {
								return angular.isDefined(item.divider) && angular.equals(item.divider, true);
						};
				}
		};
});
