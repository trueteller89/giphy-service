'use strict';
angular.module('app', [
        'ngRoute',
        'LocalStorageModule',
        'app.controllers',
        'app.services',
        'app.components',
        'app.directives',
        'ui.bootstrap',
        'ui.router',
        'smart-table'
    ])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('404', {

                url: '/404',
                component: 'notfound'
            })
            .state('general', {
                url: '/general',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/general.html',
                        controller: 'generalController',
                    },
                    'asideLeft@general': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@general': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('favourites', {
                url: '/favourites',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/favourites.html',
                        controller: 'favouritesController',
                    },
                    'asideLeft@favourites': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@favourites': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
                        .state('upload', {
                url: '/upload',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/upload.html',
                        controller: 'uploadController',
                    },
                    'asideLeft@upload': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@upload': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('default', {

                url: '/',
                template: ''
            });
    }]);
