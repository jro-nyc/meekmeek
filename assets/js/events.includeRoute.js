(function() {
	
	//[START]Provided by Pasquini
	try {
		angular.module( 'optimostService' );
	} catch ( ex ) {
		/**
		* Optimost not yet on the page - register a fallback implementation of Optimost module
		* just to be safe.
		*/
		angular.module( 'optimostService', [] );
	}	
	//[END]Provided by Pasquini
	
  var app = angular.module("myPicturesViewer", ['ngRoute', 'optimostService']);
 
  var MainController = function($scope,  myPictures, myAudio, $interval, $log, $anchorScroll, $location, $route, $rootScope, $routeParams, $window) {

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
	/*
	//$scope.$on( "$routeChangeStart", function(event, next, current) {
	$scope.$on( "$routeChangeSuccess", function(event, current) {
		$log.info("$routeChangeSuccess firing in root scope - location is:" + $location.path()+" and hash is:"+$location.hash());
		if(optimost.lastLocation!==$location.path()){
			$log.info("AND the route changed, so we triggerted opMHInitGlobal() - "+$scope.thisLocation+";"+$location.path())
			if(typeof(opMHInitGlobal)==="function")opMHInitGlobal();
			$log.info("----------- done opMHInitGlobal()")
		}
		optimost.lastLocation=$location.path();
	});		
	*/
	$scope.$on( "$viewContentLoaded", function(event) {
		//$log.info("$viewContentLoaded firing");
		console.log("$viewContentLoaded firing");
		if(typeof(optimost.helperUtils)==="object" && typeof(optimost.helperUtils.moduleFiringCode)==="function")optimost.helperUtils.moduleFiringCode();
	});	

	
	$scope.$on('$locationChangeSuccess', function(event) {
	//$rootScope.$on('$locationChangeSuccess', function(event) {
		$log.info("$locationChangeSuccess firing in root scope - location is:" + $location.path()+" and hash is:"+$location.hash());
		if(optimost.lastLocation!==$location.path()){
			$log.info("AND the route changed, so we triggerted opMHInitGlobal() - "+$scope.thisLocation+";"+$location.path())
			if(typeof(opMHInitGlobal)==="function")opMHInitGlobal();
			$log.info("----------- done opMHInitGlobal()")
		}
		optimost.lastLocation=$location.path();
	});
	
    $scope.username = window.opUserName;//1 Feb
    $scope.message = "Jaime picture gallery";
	$scope.googleGraphs = "Google Graphs test area";
    $scope.audioMessage = "Jaime Audio gallery";
    $scope.audioMessage1 = "Jaime Audio gallery mod #1";
    $scope.audioMessage2 = "Jaime Audio gallery mod #2";
    $scope.audioMessage3 = "Jaime Audio gallery mod #3";
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
	
	//$log.info("17 Feb - location is:" + $location.path()+" and hash is:"+$location.hash());
	
  };

  app.controller("MainController", ["$scope", "myPictures", "myAudio", "$interval", 
    "$log", "$anchorScroll", "$location", "$route", "$rootScope", "$routeParams", "$window" , MainController
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
			.when("/gallery2",
				{
					controller:'MainController',
					template: ['<h2>Gallery</h2>',
								''].join('')
				})	
			.when("/gallery",
				{
					controller:'MainController',
					templateUrl: 'partials/gallery.html'
				})		
			.when("/DOMfunnelStart",
				{
					controller:'MainController',
					templateUrl: 'partials/DOMfunnelStart.html'
				})					
			.when("/DOMfunnelPage1",
				{
					controller:'MainController',
					templateUrl: 'partials/funnelPage1.html'
				})					
			.when("/DOMfunnelPage2",
				{
					controller:'MainController',
					templateUrl: 'partials/funnelPage2.html'
				})					
			.when("/DOMfunnelPage3",
				{
					controller:'MainController',
					templateUrl: 'partials/funnelPage3.html'
				})				
			.when("/cors",
				{
					controller:'MainController',
					templateUrl: 'partials/cors.html'
				})				
				
			.when("/ChoiceHotels",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/Home.html'
				})			
			.when("/ChoiceHotels/Home",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/Home.html'
				})	
			.when("/ChoiceHotels/ListView",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/ListView.html'
				})	
			.when("/ChoiceHotels/HotelInfo",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/HotelInfo.html'
				})	
			.when("/ChoiceHotels/Availability",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/Availability.html'
				})				
			.when("/ChoiceHotels/GuestData",
				{
					controller:'MainController',
					templateUrl: 'partials/ChoiceHotels/GuestData.html'
				})	
			.when("/Graphs",
				{
					controller:'MainController',
					templateUrl: 'partials/Graphs.html'
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
								'<a href="#/gallery">Back to the Gallery</a>',
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
  
	app.run(["$rootScope", "$location", "$injector", function ($rootScope, $location, $injector) {
			if (optimost && optimost.trigger) optimost.trigger("angular:startup", { injector: $injector } );
			$rootScope.$on('$locationChangeSuccess', function () {
				if (optimost.trigger) {
					optimost.trigger("angular:locationChange", {url: $location.url(), injector: $injector } );
				}
			});
	}]);
  
  
  /*
	app.run(["$rootScope", "$location", "$injector", function ($rootScope, $location, $injector) {
		if(typeof(optimost)!== "object"){
			console.log('optimost object not defined, bailing from the app.run...');
			return;
		} 
		if (optimost.trigger) {
			console.log("angular:startup in app.run");
			optimost.trigger("angular:startup", { injector: $injector } );
		}else {
			console.log("angular:startup exiting cuz optimost.trigger does not exist in app.run");
		}
		$rootScope.$on('$locationChangeSuccess', function () {
			console.log('$locationChangeSuccess being triggered in app.run');
			if (optimost.trigger) {
				optimost.trigger("angular:locationChange", {url: $location.url(), injector: $injector } );
			}
		});
	}]);
*/
 
 
	//This is one way of emulating Optimost making a last minute replacement of an existing template
	/*
	app.run(function($templateCache){
		$templateCache.put('partials/view2.html','<div>This is the challenger for View 2</div>');
		$templateCache.info();
		
	})*/
  
}());