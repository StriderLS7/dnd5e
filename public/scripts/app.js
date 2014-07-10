(function() {
  var app = angular.module('DND5ETools', ['ui.bootstrap', 'customFilters']);

  app.controller('MainController', function($scope, $http) {

    $scope.tempTabs = [];

    console.log("Loading bestiary...");
    $http.get('/bestiary/monster').success(function(data){
      $scope.bestiary = data;
      console.log($scope.bestiary.length + " monsters loaded.")
    });


    console.log("Loading spellbook...");
    $http.get('/spellbook/spell').success(function(data){
        $scope.spellbook = data;
        console.log($scope.spellbook.length + " spells loaded.")
    });

  });
})();
