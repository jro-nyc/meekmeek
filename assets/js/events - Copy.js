//////////////////////////////////////////////////////////
// Code goes here  -- this is script.js

(function() {
  var app = angular.module("myPicturesViewer", []);

  var MainController = function($scope, myPictures, $interval,
    $log, $anchorScroll, $location) {

    var onUserComplete = function(data) {
      $scope.user = data;
	  $scope.repos = data;//28 Jan
	  /*
      myPictures.getRepos($scope.user)
        .then(onRepos, onError);*/

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
      myPictures.getUser(username)
        .then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

	$scope.popImage=function($event){
		var mySrc=$event.currentTarget.src;
		var generator=window.open('','name','height=800,width=800');
		  
		  generator.document.write('<html><head><title>New Image<\/title>');
		  generator.document.write('<\/head><body>');
		  generator.document.write('<p><a href="javascript:self.close()"> Close<\/a> the popup.<\/p>');
		  generator.document.write(['<DIV STYLE="width:100&#37;">',
								'<img src="'+mySrc+'" width="780"/>',
								'<\/DIV>'].join(''));
		  generator.document.write('<\/body><\/html>');
		  generator.document.close();
		  $event.preventDefault();
		
	}
	
    $scope.username = "Jaime stuff";
    $scope.message = "Event Viewer";
    $scope.repoSortOrder = '-stargazers_count';
    $scope.countdown = 5;
    startCountdown();
 
  };

  app.controller("MainController", ["$scope", "myPictures", "$interval",
    "$log", "$anchorScroll", "$location", MainController
  ]);

}());

(function() {
  var myPictures = function($http){
    
    var getUser = function(username){
      return $http.get("/assets/json/travel.json" )
      //return $http.get("/assets/json/travel.orig.json" )
          .then(function(response){
            return response.data;
          });
    };
    
    var getRepos = function(user){
      //turn $http.get(user.repos_url)
	  return $http.get("/assets/json/travel.json" )
	  //return $http.get("/assets/json/travel.orig.json" )
        .then(function(response){
            return response.data;
          });
    };
    
    return{
      getUser:getUser,
      getRepos:getRepos
      
    };
    
  };
  
  var module = angular.module("myPicturesViewer");
  module.factory("myPictures", myPictures);
  
}());