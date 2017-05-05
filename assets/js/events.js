(function() {
  var app = angular.module("myPicturesViewer", []);

  var MainController = function($scope, myPictures, $interval, $log, $anchorScroll, $location) {

    var onUserComplete = function(data) {
      $scope.user = data;
	  $scope.repos = data;//28 Jan

    };

    var onError = function(reason) {
      $scope.error = "Could not find the data";

    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
		myPictures.getPhotos().then(onUserComplete, onError);
      }
    };

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    var countdownInterval = null;
    $scope.search = function(username) {
      $log.info("Searching for " + username);
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
	
    $scope.username = "Birthday";
    $scope.message = "Jaime picture gallery";
    $scope.repoSortOrder = '+location';
    $scope.countdown = 2;
    startCountdown();
 
  };

  app.controller("MainController", ["$scope", "myPictures", "$interval",
    "$log", "$anchorScroll", "$location", MainController
  ]);

  var myPictures = function($http){
    var getPhotos = function(username){
      return $http.get("/assets/json/travel.json" )
          .then(function(response){
            return response.data;
          });
    };
    
    return{
      getPhotos:getPhotos
      
    };
    
  };
  
  app.factory("myPictures", myPictures);
  
}());