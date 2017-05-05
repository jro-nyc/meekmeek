//////////////////////////////////////////////////////////
// Code goes here  -- this is script.js

(function() {
  var app = angular.module("githubViewer", []);

  var MainController = function($scope, github, $interval,
    $log, $anchorScroll, $location) {

    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user)
        .then(onRepos, onError);

    };
    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };
    var onError = function(reason) {
      $scope.error = "Could not find the data";

    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    var countdownInterval = null;
    $scope.search = function(username) {
      $log.info("Searching for " + username);
      github.getUser(username)
        .then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = '-stargazers_count';
    $scope.countdown = 5;
    startCountdown();
 
  };

  app.controller("MainController", ["$scope", "github", "$interval",
    "$log", "$anchorScroll", "$location", MainController
  ]);

}());
//////////////////////////////////////////////////////////
// Code goes here  -- this is github.js
(function() {
  var github = function($http){
    
    var getUser = function(username){
      return $http.get("https://api.github.com/users/" + username)
          .then(function(response){
            return response.data;
          });
    };
    
    var getRepos = function(user){
      return $http.get(user.repos_url)
        .then(function(response){
            return response.data;
          });
    };
    
    return{
      getUser:getUser,
      getRepos:getRepos
      
    };
    
  };
  
  var module = angular.module("githubViewer");
  module.factory("github", github);
  
}());