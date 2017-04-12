'use strict';
angular.module('app.directives', ['ngRoute', 'app.services', 'ui.bootstrap'])
.directive('whenScrolled', function () {
        //directive to loadMore on scrollend
        return {
            link: function (scope, element, attr) {
                var raw = element[0];

                element.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            }
        }
})
.directive('fileModel', [
    '$parse',
    function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              if (attrs.multiple) {
                modelSetter(scope, element[0].files);
              }
              else {
                modelSetter(scope, element[0].files[0]);
              }
            });
          });
        }
      };
    }
]);