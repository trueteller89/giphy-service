'use strict';
angular.module('app.components', ['ngRoute', 'app.services'])
    .component('login', {
        templateUrl: '/build/tpl/components/login.html',
        controller: function($scope, $rootScope, storageService, $location, $window, propertiesService) {
            $scope.username = "";
            $scope.active = true;
            function init() {
                if (storageService.isSet("user")) {
                    $scope.active = false;
                    propertiesService.setLogStatus(true);
                    $location.path("/general");
                };
            };
            init();
            $scope.login = function() {
                if ($scope.username) {
                    storageService.set("user", $scope.username);
                    propertiesService.setUsername($scope.username);
                    propertiesService.setLogStatus(true);
                    $scope.active = false;
                    $location.path("/general");

                }
            }

        }
    });
