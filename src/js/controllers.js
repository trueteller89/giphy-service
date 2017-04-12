'use strict';
angular.module('app.controllers', ['ngRoute', 'app.services'])
    .controller('asideController', ["$scope", "propertiesService", function($scope, propertiesService) {}])
    .controller('headerController', ["$scope", "propertiesService", function($scope, propertiesService) {
        $scope.title = propertiesService.getTitle();
    }])
    .controller('favouritesController', ["$scope", "propertiesService", "httpRequestsService", "storageService", function($scope, propertiesService, httpRequestsService, storageService) {
        if (!storageService.isSet("user")) { $location.path("/") } else {
            var self = this;
            propertiesService.setTitle('Giphy > Favourites');

            function chunk(arr, size) {
                var newArr = [];
                for (var i = 0; i < arr.length; i += size) {
                    newArr.push(arr.slice(i, i + size));
                }
                return newArr;
            }
            if (storageService.isSet("myCollection")) {
                $scope.gifs = storageService.get("myCollection");
                $scope.chunkedData = chunk($scope.gifs, 4);
            }
        }
    }])
    .controller('generalController', ["$scope", "propertiesService", 'httpRequestsService', '$uibModal', '$window', "storageService", "$location",
        function($scope, propertiesService, httpRequestsService, $modal, $window, storageService, $location) {
            if (!storageService.isSet("user")) { $location.path("/") } else if (storageService.isSet("user")) {
                var self = this,
                    defaultOffset = 25,
                    offset = 0;
                propertiesService.setTitle('Giphy > General');

                function chunk(arr, size) {
                    var newArr = [];
                    for (var i = 0; i < arr.length; i += size) {
                        newArr.push(arr.slice(i, i + size));
                    }
                    return newArr;
                }
                $scope.mouseOver = false;
                $scope.searchGif = "";
                $scope.gifs = [];


                $scope.showPopup = function(gif) {
                    $modal.open({
                        templateUrl: "/build/tpl/components/modal-image.html",
                        resolve: {
                            gifToUse: function() {
                                return gif;
                            }
                        },
                        controller: [
                            "$scope", "gifToUse",
                            function($scope, gifToUse) {
                                return $scope.gif = gifToUse;
                            }
                        ]
                    });
                };
                $scope.addToStorage = function(gif) {
                    var collectionArray = [];

                    function isEqual(id) {
                        return id === gif.id;
                    };
                    if (storageService.isSet("myCollection")) {
                        collectionArray = storageService.get("myCollection");
                    }
                    if (!collectionArray.some(isEqual)) {
                        collectionArray.push(gif.id);
                    }
                    gif.status = true;
                    storageService.set("myCollection", collectionArray);
                };
                $scope.removeFromStorage = function(gif) {
                    var collectionArray = [];
                    if (storageService.isSet("myCollection")) {
                        collectionArray = storageService.get("myCollection");
                    }
                    var index = collectionArray.indexOf(gif.id);
                    if (index > -1) {
                        collectionArray.splice(index, 1);
                    };
                    gif.status = false;
                    storageService.set("myCollection", collectionArray);
                };
                $scope.addGiphy = function() {
                    $modal.open({
                        templateUrl: "partials/add-image.html",
                        controller: 'addGiphyController',
                        size: 'lg',
                    });
                }
                $scope.loadMore = function() {
                    offset = offset + defaultOffset;
                    if ($scope.searchGif) {
                        httpRequestsService.search({ searchGif: $scope.searchGif, offset: offset }).then(function(response) {
                            $scope.gifs = $scope.gifs.concat(response.data.data);
                            $scope.chunkedData = chunk($scope.gifs, 4);
                            init();
                        });
                    } else {
                        httpRequestsService.trending({ offset: offset }).then(function(response) {
                            $scope.gifs = $scope.gifs.concat(response.data.data);
                            $scope.chunkedData = chunk($scope.gifs, 4);
                            init();
                        });
                    }

                };
                $scope.searchFunc = function() {
                    if ($scope.searchGif) {
                        httpRequestsService.search({ searchGif: $scope.searchGif }).then(function(response) {
                            $scope.gifs = response.data.data;
                            $scope.chunkedData = chunk($scope.gifs, 4);
                            init();
                        });
                    } else {
                        httpRequestsService.trending({}).then(function(response) {
                            $scope.gifs = response.data.data;
                            $scope.chunkedData = chunk($scope.gifs, 4);
                            init();
                        });
                    }
                };
                $scope.searchFunc();
                //
                $scope.loadMore();

                function init() {
                    if (storageService.isSet("myCollection")) {
                        var myCollect = storageService.get("myCollection");
                        $scope.gifs.forEach(function(elem, index) {
                            for (let i = 0; i < myCollect.length; i++) {
                                if (elem.id == myCollect[i]) { elem.status = true; }
                            }
                        })
                    }
                }
            }
        }
    ]);
