'use strict';
angular.module('app.services', ['ngRoute'])
    .service('httpRequestsService', ['$http', function($http) {
        var globalOptions = {
            api_key: "dc6zaTOxFJmzC",
            callback: 'JSON_CALLBACK',
        };
        return {
            trending: function(obj) {
                var options = angular.extend({}, { offset: obj.offset | 0 }, globalOptions);
                return $http.get('http://api.giphy.com/v1/gifs/trending', {
                    params: options
                });
            },
            search: function(obj) {
                var options = angular.extend({}, {
                    q: obj.searchGif,
                    offset: obj.offset | 0,
                }, globalOptions);
                return $http.get('http://api.giphy.com/v1/gifs/search', {
                    params: options
                });
            },
            getGifsByIds: function(obj) {
                var options = angular.extend({}, {
                    ids: obj.ids
                }, globalOptions);
                return $http.get('http://api.giphy.com/v1/gifs', {
                    params: options
                });
            },
            upload: function(obj) {
                var options = angular.extend({}, {
                    source_image_url: obj.source_image_url
                }, globalOptions);
                return $http.post("http://upload.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&callback=JSON_CALLBACK&source_image_url=" + options.source_image_url);
            }
        };
    }])
    .service('storageService', function() {
        function _get(key) {
            return JSON.parse(localStorage.getItem(key));
        }

        function _isSet(key) {
            return localStorage.getItem(key) !== null;
        }

        function _set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        function _clear(key) {
            localStorage.removeItem(key);
        }
        return {
            clear: _clear,
            remove: _clear,
            get: _get,
            set: _set,
            isSet: _isSet
        };
    })
    .service('propertiesService', [function() {
        var self = this;
        return {
            getTitle: function() {
                return self.title;
            },
            setTitle: function(title) {
                self.title = title;
            },
            getUsername: function() {
                return self.username;
            },
            setUsername: function(username) {
                self.username = username;
            },
            getLogStatus: function() {
                return self.status;
            },
            setLogStatus: function(status) {
                self.status = status;
            },
        }

    }]);
