(function() {
  var app = angular.module('DND5ETools', []);

  app.controller('MainController', function($scope, $http) {
    this.__divShown = [];
    $scope.bestiary = [];

    $http.get('http://localhost:8080/bestiary').success(function(data){
      $scope.bestiary = data;
    });

    console.log($scope.bestiary);

    this.showDiv = function(name)
    {
       this.__divShown[name] = true;
      console.log(this.__divShown);
      console.log($scope.bestiary);
      console.log($scope.bestiary[0].name)
    };

    this.divShown = function(name)
    {
      console.log("Check "+name + ": " + (this.__divShown[name] === true));
      return this.__divShown[name] === true;
    };
  });
})();
