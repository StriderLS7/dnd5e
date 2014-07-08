(function() {
  var app = angular.module('DND5ETools', ['ui.bootstrap']);

  app.controller('MainController', function($scope, $http) {
    $scope.bestiary = [];

    $http.get('http://localhost:8080/bestiary/monster').success(function(data){
      $scope.bestiary = data;
    });
  });
})();
