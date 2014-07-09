(function() {
  var app = angular.module('DND5ETools', ['ui.bootstrap']);

  app.controller('MainController', function($scope, $http) {

    $scope.tempTabs = [];

    $http.get('/bestiary/monster').success(function(data){
      $scope.bestiary = data;
    });
  });
})();
