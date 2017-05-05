(function() {
	
  var app = angular.module("myPicturesViewer", ['ngRoute', 'optimostService']);
 
  var MainController = function($scope, myPictures, myAudio, $interval, $log, $anchorScroll, $location, $route, $routeParams, $window) {

    var onUserComplete = function(data) {
		var n;
		$scope.galleryExists = false;
		$scope.waitingToLoad = false;
		$scope.user = data;
		$scope.repos = data;//28 Jan
		if($scope.myParams.myId){
			for(var n in data){
				if(data[n].id==$scope.myParams.myId){
					$scope.galleryExists = true;
					$window.document.title = data[n].name;
				}
			}
		}
		if(!$scope.galleryExists) $window.document.title= '';
    };
    var onUserCompleteAudio = function(data) {
		$scope.audioInfo = data;//28 Jan
    };
    var onError = function(reason) {
      $scope.error = "Could not find the data";

    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
		myPictures.getPhotos($scope.username).then(onUserComplete, onError);
      }
    };

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    var countdownInterval = null;
	
	$scope.search = function(username) {
		myPictures.getPhotos($scope.username).then(onUserComplete, onError);
	};
	
	$scope.audio = function() {
		myAudio.getAudio().then(onUserCompleteAudio, onError);
	};
	/*
    $scope.search = function(username) {
      //$log.info("Searching for " + username);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };*/
	
	$scope.tellMeRoute=function($route){
		//$log.info("id param is:" + $route.current.myId);
	}

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
	$scope.selectedGallery=function(myIndex){
		$log.info("index is:" + myIndex);
		$scope.indexSelected=myIndex
	}
	
    $scope.username = window.opUserName;//1 Feb
    $scope.message = "Jaime picture gallery";
    $scope.audioMessage = "Jaime Audio gallery";
    $scope.repoSortOrder = '+location';
	//$scope.indexSelected=-1;
    $scope.countdown = 1;
	$scope.galleryExists = true;
	$scope.waitingToLoad = true;
	$scope.audioGallerySelected=false;
	$scope.myParams=$route.current.params;
	$scope.myRouteParams = $routeParams;

	var _n=navigator.userAgent,m;
	var _nl=_n.toLowerCase();
	$scope._isChrome=((m=_nl.indexOf("chrome"))!=-1?(_n.charAt(m+8)!="."?_n.substring(m+7,m+9):_n.substring(m+7,m+8)):-1);
	$scope.isNotChrome=($scope._isChrome===-1?'e':'');	
	
    startCountdown();
	
  };

  app.controller("MainController", ["$scope", "myPictures", "myAudio", "$interval", 
    "$log", "$anchorScroll", "$location", "$route", "$routeParams", "$window" , MainController
  ]);

  var myPictures = function($http, $log){
    var getPhotos = function(username){
		window.opUserName=username;//1 Feb
		$log.info("Searching for " + username);
		return $http.get("/assets/json/travel.json" )
          .then(function(response){
            return response.data;
         });
    };
    
    return{
      getPhotos:getPhotos
      
    };
    
  };
  
  var myAudio = function($http, $log){
    var getAudio= function(){
		return $http.get("/assets/json/audio.json" )
          .then(function(response){
            return response.data;
         });
    };
    
    return{
      getAudio:getAudio
      
    };
    
  };
  
  app.factory("myPictures", myPictures);
  app.factory("myAudio", myAudio);
  app.config(['$routeProvider', function($routeProvider, $log, $route){
		//var num;
		  $routeProvider
			.when("/",
				{
					controller:'MainController',
					//templateUrl: 'partials/view2.html'
					templateUrl: 'partials/start.html'
				})
			.when("/view1",
				{
					controller:'MainController',
					templateUrl: 'partials/view1.html'
				})	  
			.when("/view2",
				{
					controller:'MainController',
					templateUrl: 'partials/view2.html'
				})
			.when("/audio",
				{
					controller:'MainController',
					templateUrl: 'partials/audio.html'
				})				
			.when("/gallery",
				{
					controller:'MainController',
					template: ['<h2>Gallery</h2>',
								''].join('')
				})	
			.when("/emw",
				{
					controller:'MainController',
					template: ['<h2>Words of Edward Michael Whalen, 29 Feb 2008.</h2>',
								'<audio controls="controls" preload="auto">',
									'<source src="/assets/media/emw_229.wav" type="audio/wav{{isNotChrome}}" />',
									'<source src="/assets/media/emw_229.ogg" type="audio/ogg" />',
								'</audio>',
								//'<audio controls="controls" preload="auto" src="/assets/media/emw_229.wav" type="audio/wav{{isNotChrome}}">',
								//'Not supported?',
								//'</audio>',
								'<h1>Is not Chrome is {{isNotChrome}} and the number is: {{_isChrome}}</h1>',
								''].join('')
				})					
			.when("/gallery/:myId",
				{
					controller:'MainController',
					template: ['',
								//'<h2>$route.current.params is: {{myParams}}</h2>',	
								//'<h2>$route.myRouteParams is: {{myRouteParams}}</h2>',	
								//'<h3>Gallery exists == {{galleryExists}}</h3>',
								'<a href="#/">Back to the Master Gallery</a>',
								'<table class="gallery" ng-show="galleryExists&&!waitingToLoad"><thead><tr><th>Activity</th><th>Location</th><th>Date</th></tr></thead>',
								'<tbody><tr ng-repeat="repo in repos | filter:{id:myParams.myId}" >',
								'<td class="galleryLabel">{{repo.event}}</td>',
								'<td class="galleryLabel">{{repo.location}}</td>',
								'<td class="galleryLabel" ng-click="tellMeRoute($route)">{{repo.date}}</td>',
								'<td class="galleryLabel">',
								'<div class="picContainer" ng-repeat="pics in repo.picturesObj">',
								'<div>{{pics.name}}</div>',
								'<a href="" ><img ng-src="{{pics.url}}" ng-click="popImage($event)" /></a>',
								'</div></td></tr></tbody></table>',
								'<table class="gallery" ng-show="!galleryExists&&!waitingToLoad"><thead><tr><th>The Gallery your are looking for, "{{myParams.myId}}", does not exist</th></tr></thead>',
								''].join('')
				})	
			.otherwise({redirectTo: '/meek'})
  }]);
	//This is one way of emulating Optimost making a last minute replacement of an existing template
	/*
	app.run(function($templateCache){
		$templateCache.put('partials/view2.html','<div>This is the challenger for View 2</div>');
		$templateCache.info();
		
	})*/
  
}());