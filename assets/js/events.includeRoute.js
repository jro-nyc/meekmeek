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
 
 
 //Main Controller [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START]
  var MainController = function($scope,  myPictures, myAudio, myAirportSearch, myAirportSearchV2, myAirportSearchUSA, myNBAscheduleSearch,  
  myMLBscheduleSearch, myNHLscheduleSearch, myNFLscheduleSearch,   $interval, $log, $anchorScroll, $location, $route, $rootScope, $routeParams, $window) {

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
    var onUserCompleteAirport = function(data) {
		var i, len, j, len2;
		$scope.airport=$scope.airport.toUpperCase();
		$scope.airportToSportsInfo = data;//28 Jan
		$scope.nbaSchedule=null;
		$scope.mlbSchedule=null;
		$scope.nhlSchedule=null;
		$scope.clearLoadingIcon();
		$scope.noAirportMatchesReturned=true;
		for(i=0,len=data.length;i<len;i+=1){
			for(j=0,len2=data[i].location.length;j<len2;j+=1){
				if(data[i].location[j]===$scope.airport){
					$scope.noAirportMatchesReturned=false;
				}
			}
		}
		//$scope.noAirportMatchesReturned
    };	
	
    var onUserCompleteAirportV2 = function(data) {
		var i, len, j, len2;
		$scope.airport=$scope.airport.toUpperCase();
		//$scope.sportsInfoToAirports = data;//28 Jan
		$scope.sportsInfoToAirports = [];//28 Jan
		$scope.nbaSchedule=null;
		$scope.mlbSchedule=null;
		$scope.nhlSchedule=null;
		$scope.nflSchedule=null;
		$scope.clearLoadingIcon();
		$scope.noAirportMatchesReturned=true;
		for(i=0,len=data.length;i<len;i+=1){
			for(j=0,len2=data[i].location.length;j<len2;j+=1){
				if(data[i].location[j]===$scope.airport){
					$scope.noAirportMatchesReturned=false;
					$scope.sportsInfoToAirports.push(data[i]);
				}
			}
		}
		//$scope.noAirportMatchesReturned
    };		
	
    var onUserCompleteAirportListOnly = function(data, parsed) {
		var i, len, j, len2, res, num, arp, prefix, match, suffix;
		if(!parsed){
			$scope.airportToSportsInfo = data;//28 Jan
			$scope.autocompleteResults=[];
			for(i=0,len=data.length;i<len;i+=1){
				for(j=0,len2=data[i].location.length;j<len2;j+=1){
					$scope.autocompleteResults.push(data[i].location[j])
				}
			}
			//$scope.noAirportMatchesReturned
		}
		else {
			$scope.autocompleteResults=data;
		}
		$scope.filteredResults=[];
		for(i=0,len=$scope.autocompleteResults.length;i<len;i+=1){
			arp=$scope.autocompleteResults[i];
			if((num=arp.indexOf($scope.airport))!==-1){
				//res=arp.substring(0,num)+'<span class="bold">'+$scope.airport+'</span>'+arp.substring(num+$scope.airport.length,arp.length+1)
				//$scope.filteredResults.push(res);
				////$scope.filteredResults.push($scope.autocompleteResults[i]);
				prefix=arp.substring(0,num),
				match=$scope.airport,
				suffix=arp.substring(num+$scope.airport.length,arp.length+1);
				$scope.filteredResults.push({"value":arp,"prefix":prefix,"match":match,"suffix":suffix});
			}
			
		}
		if($scope.filteredResults.length)$scope.showDropdown=true;
		else $scope.showDropdown=false;
		$scope.clearLoadingIcon();	
    };	

    var onUserCompleteAirportListOnlyUSA = function(data, parsed) {
		var i, len, j, len2, res, num, arp, prefix, match, suffix, airportName;
		if(!parsed){
			$scope.airportToSportsInfo = data;//28 Jan
			$scope.autocompleteResults=[];
			for(i=0,len=data.length;i<len;i+=1){
				
				//$scope.autocompleteResults.push(data[i].iata);
				$scope.autocompleteResults.push({"code":data[i].iata,"airportName":data[i].name});
				
			}
			//$scope.noAirportMatchesReturned
		}
		else {
			$scope.autocompleteResults=data;
		}
		$scope.filteredResults=[];
		for(i=0,len=$scope.autocompleteResults.length;i<len;i+=1){
			arp=$scope.autocompleteResults[i].code,airportName=$scope.autocompleteResults[i].airportName;
			if((num=arp.indexOf($scope.airport))!==-1){
				//res=arp.substring(0,num)+'<span class="bold">'+$scope.airport+'</span>'+arp.substring(num+$scope.airport.length,arp.length+1)
				//$scope.filteredResults.push(res);
				////$scope.filteredResults.push($scope.autocompleteResults[i]);
				prefix=arp.substring(0,num),
				match=$scope.airport,
				suffix=arp.substring(num+$scope.airport.length,arp.length+1);
				$scope.filteredResults.push({"value":arp,"prefix":prefix,"match":match,"suffix":suffix,"airportName":airportName});
			}
			
		}
		if($scope.filteredResults.length)$scope.showDropdown=true;
		else $scope.showDropdown=false;
		$scope.clearLoadingIcon();	
    };	
	
    var onUserCompleteNBAschedule = function(data) {
		$scope.mlbSchedule=null;
		$scope.nhlSchedule=null;
		$scope.nflSchedule=null;
		$scope.nbaSchedule = data;//20 Oct 17 Jan
		$scope.opponents={};
		$scope.opponentsList=[{"team":"","value":""}];
		for(var i=0,len=data.length;i<len;i++){
			var tm;
			if(data[i].visiting!==$scope.myTeam)tm=data[i].visiting;
			else if(data[i].home!==$scope.myTeam)tm=data[i].home;
			
			if(tm){
				if($scope.opponents[tm])$scope.opponents[tm]+=1;
				else {
					$scope.opponents[tm]=1;
					$scope.opponentsList.push({"team":tm,"value":tm});
				}
			}
		}
		$scope.clearLoadingIcon();//24 Oct
    };		
	
    var onUserCompleteMLBschedule = function(data) {
		//$scope.mlbSchedule = data;//20 Oct 17 Jan
		$scope.nbaSchedule=null;
		$scope.nhlSchedule=null;
		$scope.nflSchedule=null;
		$scope.mlbSchedule = [];//20 Oct 17 Jan
		$scope.opponents={};
		$scope.opponentsList=[{"team":"","value":""}];
		for(var i=0,len=data.length;i<len;i++){
			var tm,home=(data[i].homeTeam.City+' '+data[i].homeTeam.Name),
			away=(data[i].awayTeam.City+' '+data[i].awayTeam.Name);
			if(away!==$scope.myTeam)tm=away;
			else if(home!==$scope.myTeam)tm=home;
			$scope.mlbSchedule.push({"visiting":away,"home":home,"arena":data[i].location,"location":data[i].homeTeam.City,"date":data[i].date,"time":data[i].time})
			if(tm){
				if($scope.opponents[tm])$scope.opponents[tm]+=1;
				else {
					$scope.opponents[tm]=1;
					$scope.opponentsList.push({"team":tm,"value":tm});
				}
			}
		}
		$scope.clearLoadingIcon();//24 Oct
    };		
	
    var onUserCompleteNHLschedule = function(data) {
		//$scope.mlbSchedule = data;//20 Oct 17 Jan
		$scope.nbaSchedule=null;
		$scope.mlbSchedule=null;	
		$scope.nflSchedule=null;		
		$scope.nhlSchedule = [];//20 Oct 17 Jan
		$scope.opponents={};
		$scope.opponentsList=[{"team":"","value":""}];
		for(var i=0,len=data.length;i<len;i++){
			var tm,home=(data[i].teams.home.team.name),
			away=(data[i].teams.away.team.name), dateTime, dt, date, time;
			if(away!==$scope.myTeam)tm=away;
			else if(home!==$scope.myTeam)tm=home;
			dateTime=data[i].gameDate.split("T");
			date=dateTime[0],time=dateTime[1];
			$scope.nhlSchedule.push({"visiting":away,"home":home,"arena":data[i].venue.name,"date":date+' at '+time})
			if(tm){
				if($scope.opponents[tm])$scope.opponents[tm]+=1;
				else {
					$scope.opponents[tm]=1;
					$scope.opponentsList.push({"team":tm,"value":tm});
				}
			}
		}
		$scope.clearLoadingIcon();//24 Oct
    };		
	
    var onUserCompleteNFLschedule = function(data) {
		//$scope.mlbSchedule = data;//20 Oct 17 Jan
		$scope.nbaSchedule=null;
		$scope.mlbSchedule=null;	
		$scope.nhlSchedule=null;		
		$scope.nflSchedule = [];//20 Oct 17 Jan
		$scope.opponents={};
		$scope.opponentsList=[{"team":"","value":""}];
		for(var i=0,len=data.length;i<len;i++){
			var tm,home=(data[i].homeTeam.teamFull),
			away=(data[i].awayTeam.teamFull), dateTime, dt, date, time, teamStadium;
			if(away!==$scope.myTeam)tm=away;
			else if(home!==$scope.myTeam)tm=home;
			dateTime=data[i].startTime;
			teamStadium=data[i].homeTeam.teamStadium;
			//date=dateTime[0],time=dateTime[1];
			$scope.nflSchedule.push({"visiting":away,"home":home,"arena":teamStadium,"date":dateTime})
			if(tm){
				if($scope.opponents[tm])$scope.opponents[tm]+=1;
				else {
					$scope.opponents[tm]=1;
					$scope.opponentsList.push({"team":tm,"value":tm});
				}
			}
		}
		$scope.clearLoadingIcon();//24 Oct
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
	
	$scope.toUC = function() {
		$scope.nbaSchedule=null;
		$scope.mlbSchedule=null;
		$scope.nhlSchedule=null;		
		$scope.nflSchedule=null;
		$scope.airportToSportsInfo=null;
		$scope.sportsInfoToAirports=null;
		$scope.autocompleteResults=[];
		$scope.showDropdown=false;
	//Convert lowercase to uppercasee
		$scope.airport=$scope.airport.toUpperCase();		
		if(!$scope.fullAirportList.length)
			//myAirportSearch.getTeams($scope.airport).then(onUserCompleteAirportListOnly, onError);
			myAirportSearchUSA.getTeams($scope.airport).then(onUserCompleteAirportListOnlyUSA, onError);
		else 
			//onUserCompleteAirportListOnly($scope.fullAirportList, true);
			onUserCompleteAirportListOnlyUSA($scope.fullAirportList, true);
		

	};
	
	//$scope.teamFilterFunction = function() {
	//	return $scope.myTeam.match(/^Full\sSchedule/) ? true : false;
	//};
	/*
	$scope.autoCompleteFocus = function(val) {
		$scope.setAutoFocus=val;
	}*/
	
	$scope.selectResult = function(val) {
		$scope.airport=val;
		$scope.filteredResults=[];
		//$scope.airportSearch(val);
		$scope.airportSearchV2(val);
		
	};
	
	$scope.search = function(username) {
		myPictures.getPhotos($scope.username).then(onUserComplete, onError);
	};
	
	$scope.audio = function() {
		myAudio.getAudio().then(onUserCompleteAudio, onError);
	};
	
	$scope.airportSearch = function(airport) {//20 Oct 17, Airport to Sports teams
		myAirportSearch.getTeams($scope.airport).then(onUserCompleteAirport, onError);
	};
	
	$scope.airportSearchV2 = function(airport) {//20 Oct 17, Airport to Sports teams
		myAirportSearchV2.getTeams($scope.airport).then(onUserCompleteAirportV2, onError);
	};	
	$scope.scheduleSearch = function(team, entity) {	
		if(entity==="NBA")$scope.nbaScheduleSearch(team);
		else if(entity==="MLB")$scope.mlbScheduleSearch(team);
		else if(entity==="NHL")$scope.nhlScheduleSearch(team);
		else if(entity==="NFL")$scope.nflScheduleSearch(team);
		
	};
	$scope.nbaScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
		myNBAscheduleSearch.getSchedule(team).then(onUserCompleteNBAschedule, onError);
		$scope.myTeam=team;
	};	
	$scope.updateTeamNBA = function(obj){
		$scope.myTeam=obj.myNBAopponent.value;
		//$scope.myTeam=$scope.myNBAopponent.value;
	}
	$scope.mlbScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
		myMLBscheduleSearch.getSchedule(team).then(onUserCompleteMLBschedule, onError);
		$scope.myTeam=team;
	};	
	$scope.updateTeamMLB = function(obj){
		$scope.myTeam=obj.myMLBopponent.value;
		//$scope.myTeam=$scope.myNBAopponent.value;
	}
	$scope.nhlScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
		myNHLscheduleSearch.getSchedule(team).then(onUserCompleteNHLschedule, onError);
		$scope.myTeam=team;
	};	
	$scope.nflScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
		myNFLscheduleSearch.getSchedule(team).then(onUserCompleteNFLschedule, onError);
		$scope.myTeam=team;
	};	
	$scope.updateTeamNHL = function(obj){
		$scope.myTeam=obj.myNHLopponent.value;
		//$scope.myTeam=$scope.myNBAopponent.value;
	}
	$scope.updateTeamNFL = function(obj){
		$scope.myTeam=obj.myNFLopponent.value;
		//$scope.myTeam=$scope.myNBAopponent.value;
	}
	
	$scope.displayLoadingIcon=function(){
		var nDiv=document.createElement("div");
		nDiv.className="se-pre-con";
		document.body.insertBefore(nDiv,document.body.firstChild);
	}
	$scope.clearLoadingIcon=function(){
		$(".se-pre-con").fadeOut("slow");
	}
	
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

	$scope.$on( "$viewContentLoaded", function(event) {
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
	$scope.enterLocation = "Enter your airport location here";
    $scope.audioMessage = "Jaime Audio gallery";
    $scope.audioMessage1 = "Jaime Audio gallery mod #1";
    $scope.audioMessage2 = "Jaime Audio gallery mod #2";
    $scope.audioMessage3 = "Jaime Audio gallery mod #3";
    $scope.repoSortOrder = '+location';
	$scope.showDropdown=false;
	
	//$scope.indexSelected=-1;
    $scope.countdown = 1;
	$scope.teamSelectedNBA=false;
	$scope.myNBAopponent=null;
	$scope.teamSelectedMLB=false;
	$scope.myMLBopponent=null;
	$scope.teamSelectedNHL=false;
	$scope.myNHLopponent=null;	
	$scope.noAirportMatchesReturned=false;
	$scope.fullAirportList=[];
	$scope.setAutoFocus=false;
	
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
 
  app.controller("MainController", ["$scope", "myPictures", "myAudio", "myAirportSearch", "myAirportSearchV2", "myAirportSearchUSA",
  "myNBAscheduleSearch", "myMLBscheduleSearch", "myNHLscheduleSearch", "myNFLscheduleSearch", "$interval", "$log", "$anchorScroll", "$location", 
  "$route", "$rootScope", "$routeParams", "$window" , MainController
  ]);
//Main Controller [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END]
 
//DIRECTIVES - [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START]
//They have been created as purely HTML "widgets" with the variables being defined in the controller

//FIRST, the PROGESS BAR DIRECTIVE is used on all 3 pages. This one does contain a controller that defines the ng-click function 
	app.directive('myProgressBarLink', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {
			$scope.goToViewDRC = function(url) {
				var funnel={"/sportsAffiliationDRC":1,"/teamSelectDRC":2,"/teamScheduleDRC":3,
			"/sportsAffiliationDRC_link":1,"/teamSelectDRC_link":2,"/teamScheduleDRC_link":3},		
				myPage=$location.path(), myPageIndex, goingToIndex;
				goingToIndex=funnel[url], myPageIndex=funnel[myPage];
				//if(!!goingToIndex.match(/\d/)&&!!myPageIndex.match(/\d/)){
				if(typeof(goingToIndex)==="number" && typeof(myPageIndex)==="number"){				
					if(goingToIndex<myPageIndex)$location.path(url);
				}
			};
		},
		templateUrl:"partials/myProgressBar.html"
	  };
	}]);	

	app.directive('myProgressBar', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {
			var progBar={}, n;
			for(n in $rootScope.$progressbar){
				progBar[n]=$rootScope.$progressbar[n];
			}		
			$scope.goToViewDRC = function(url) {
				var funnel={"/sportsAffiliationDRC":1,"/teamSelectDRC":2,"/teamScheduleDRC":3,
			"/sportsAffiliationDRC_link":1,"/teamSelectDRC_link":2,"/teamScheduleDRC_link":3},		
				myPage=$location.path(), myPageIndex, goingToIndex;
				goingToIndex=funnel[url], myPageIndex=funnel[myPage];
				//if(!!goingToIndex.match(/\d/)&&!!myPageIndex.match(/\d/)){
				if(typeof(goingToIndex)==="number" && typeof(myPageIndex)==="number"){				
					if(goingToIndex<myPageIndex)$location.path(url);
				}
			};
		},
		template: ['',
	'	<ul class="step-progress-bar">',
	'		<li ng-class="{\'active\':(1 == $progressbar.activeItem), \'processed\':(1 < $progressbar.activeItem )}" ',
	'			_title="Pick an Airport" ng-href="#/sportsAffiliationDRC" class="" ng-click="goToViewDRC(\'/sportsAffiliationDRC\')">',
	'			<div class="progressbarcont">',
	'				<span class="step-number">1</span> ',
	'				<span class="step-title">Pick an Airport</span>',
	'				<a ng-click="doInfoToggle(1);" ng-href="" ng-class="{\'opShow\':(1 == $progressbar.activeItem), \'opHide\':(1 != $progressbar.activeItem )}" ',
	'				ng-mouseover="pageInfo(1, true)" ng-mouseleave="pageInfo(1, false)">&nbsp;&nbsp;&nbsp;',
	'				<span ng-class="{\'showArrow\':(true == pickAirportHover),\'hideArrow\':(false == pickAirportHover)}" class=\"opT3Triangle\"></span>',
	'				<span ng-class="{\'showHover\':(true == pickAirportHover),\'hideHover\':(false == pickAirportHover)}" >',
	'				We have a list of the 141 largest airports in the USA, ',
	'				and the professional teams that are most popular at that location.  ',
	'				Enter the airport code, we will use auto-complete to expedite the process.',
	'				</span></a>',
	'			</div>',
	'		</li>',
	'		<li ng-class="{\'active\':(2 == $progressbar.activeItem), \'processed\':(2 < $progressbar.activeItem )}" ',
	'			_title="Pick an Team" ng-href="#/teamSelectDRC" class="" ng-click="goToViewDRC(\'/teamSelectDRC\');">',
	'			<div class="progressbarcont">',
	'				<span class="step-number">2</span> ',
	'				<span class="step-title">Pick a Team</span>',
	'				<a ng-click="doInfoToggle(2);" ng-class="{\'opShow\':(2 == $progressbar.activeItem), \'opHide\':(2 != $progressbar.activeItem )}" ',
	'				ng-mouseover="pageInfo(2, true)" ng-mouseleave="pageInfo(2, false)" >&nbsp;&nbsp;&nbsp;',
	'				<span ng-class="{\'showArrow\':(true == pickTeamHover),\'hideArrow\':(false == pickTeamHover)}" class=\"opT3Triangle\"></span>',	
	'				<span ng-class="{\'showHover\':(true == pickTeamHover),\'hideHover\':(false == pickTeamHover)}" >',
	'				We have compiled a list of popular teams for your airport selection.',
	'				Select a team to see its schedule.',
	'				</span></a>',
	'			</div>',
	'		</li>',
	'		<li ng-class="{\'active\':(3 == $progressbar.activeItem), \'processed\':(3 < $progressbar.activeItem )}" ',
	'			_title="Team Schedule" ng-href="#/teamScheduleDRC" class="" ng-click="goToViewDRC(\'/teamScheduleDRC\');">',
	'			<div class="progressbarcont">',
	'				<span class="step-number">3</span> ',
	'				<span class="step-title">Schedule</span>',
	'				<a ng-click="doInfoToggle(3);" ng-class="{\'opShow\':(3 == $progressbar.activeItem), \'opHide\':(3 != $progressbar.activeItem )}" ',
	'				ng-mouseover="pageInfo(3, true)" ng-mouseleave="pageInfo(3, false)">&nbsp;&nbsp;&nbsp;',
	'				<span ng-class="{\'showArrow\':(true == showScheduleHover),\'hideArrow\':(false == showScheduleHover)}" class=\"opT3Triangle\"></span>',	
	'				<span ng-class="{\'showHover\':(true == showScheduleHover),\'hideHover\':(false == showScheduleHover)}" >',
	'				We have provided you with a schedule for the {{myTeam}}. ',
	'				You can select an opponent to filter the schedule',
	'				</span></a>',
	'			</div>',
	'		</li>',
	'	</ul>	',
	''].join('')
		
	  };
	}]);

//SECOND, the AIRPORT LOCATION DROPDOWN DIRECTIVE is used on the first 2 pages
	app.directive('myLocationDropdownLink', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {

		},
		templateUrl:"partials/myLocationDropdown.html"
	  };
	}]);
	app.directive('myLocationDropdown', ['$rootScope', function ($rootScope) {
	  return {
		//controller: function($scope, $rootScope) {
		//	var progBar={}, n;
		//	for(n in $rootScope.$progressbar){
		//		progBar[n]=$rootScope.$progressbar[n];
		//	}
		//},
		template: [
	'	<div id="PicLoc_dropdown" class="angucomplete-dropdown toKeepDropdown" ng-if="showDropdown">',
	'		<div class="angucomplete-results">',
	'			<div ng-repeat="result in filteredResults">',
	'				<a class="angucomplete-row" ng-click="selectResult(result.value)" ng-class="{ autoFocus: focus, autoBlur: blur }"',
	'						ng-mouseover="focus=true;blur=false;" ng-mouseleave="focus=false;blur=true;">',
	'					{{result.prefix}}<span class="matched">{{result.match}}</span>{{result.suffix}} -- {{result.airportName}}',
	'				</a>',
	'			</div>',
	'		</div>',
	'	</div>	'].join('')
		
	  };
	}]);

//THIRD, the TEAM SELECTED DIRECTIVE goes on the 2ND page
	app.directive('myTeamSelectedLink', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {

		},
		templateUrl:"partials/myTeamSelected.html"
	  };
	}]);	
	
	app.directive('myTeamSelected', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {

		},
		template: [
	'	<div class="listArea teamSelectView">',
	'		<div class="galleryList" ng-if="sportsInfoToAirports.length && noAirportMatchesReturned===false">',
	'			<div class="picContainer">',
	'				<table class="gallery">	  ',
	'					<tbody>',
	'						<tr>							',
	'							<td class="teamsContainer" ng-repeat="airports in sportsInfoToAirports" ng-if="noAirportMatchesReturned===false">',
	'									<div class="entity">{{airports.entity}}</div>',
	'									<div class="team">{{airports.name}}</div>',
	'									<div ng-if="airports.feed"><a href="" ng-click="scheduleSearch(airports.name, airports.entity)"><img ng-src="{{airports.url}}" ng-style="{\'width\': \'30px\'}" /></a></div>',
	'									<div ng-if="!airports.feed"><img ng-src="{{airports.url}}" ng-style="{\'width\': \'30px\'}" /></div>',
	'							</td>',
	'						</tr>',
	'					</tbody>',
	'				</table>',
	'			</div>',
	'		</div>		',
	'		',
	'		<div ng-if="noAirportMatchesReturned===true" class="noMatches">',
	'			We do not have an airport match, please enter another Airport.',
	'		</div>',
	'	</div> '].join('')
		
	  };
	}]);

//FOURTH, the TEAM SCHEDULE DIRECTIVE goes on the 3RD page
	app.directive('myTeamScheduleLink', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {

		},
		templateUrl:"partials/myTeamSchedule.html"
	  };
	}]);	
	
	app.directive('myTeamSchedule', ['$rootScope', '$location', function ($rootScope, $location) {
	  return {
		controller: function($scope, $rootScope, $location) {

		},
		template: [
		'<div class="listArea teamSelectView">',
		'	<hr ng-if="nbaSchedule.length>0" />',
		'	<div class="galleryList" ng-if="nbaSchedule.length>0">',
		'		<div class="opponentSelect">',
		'			<div ng-if="myTeamOpponent==\'\'">Here are the opponents for the<span class="myTeam">{{myTeam}}</span>.</div>',
		'			<div ng-if="myTeamOpponent!=\'\'">Here are the games between the<span class="myTeam">{{myTeam}}</span>and the<span class="myTeam">{{myTeamOpponent}}.</span></div>',
		'			<select ng-model="myNBAopponent" ng-options="c.team for c in opponentsList | orderBy:\'value\'" ',
		'			ng-change="updateTeamNBA(this)" ng-if="nbaSchedule.length>0"></select>',
		'		</div>',
		'		<div class="nba"></div>',
		'		<table class="gallery">	  ',
		'			<tbody>',
		'				<tr ng-repeat="teams in nbaSchedule |filter:myTeamOpponent"> ',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.visiting}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">VS.</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.home}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">At the {{teams.arena}} in {{teams.location}}</div>',
		'					</td>	',
		'					<td class="teamsContainer">',
		'						<div class="entity">On {{teams.date}} @ {{teams.time}}</div>',
		'					</td>		',
		'				</tr>',
		'			</tbody>',
		'		</table>',
		'	</div>		',
		'	<hr ng-if="mlbSchedule.length>0" />		',
		'	<div class="galleryList" ng-if="mlbSchedule.length>0">',
		'		<div class="opponentSelect">',
		'			<div class="myTeam" ng-if="myTeamOpponent==\'\'">Here are the opponents for the {{myTeam}}.</div>',
		'			<div ng-if="myTeamOpponent!=\'\'">Here are the games between the<span class="myTeam">{{myTeam}}</span>and the<span class="myTeam">{{myTeamOpponent}}.</span></div>',
		'			<select ng-model="myMLBopponent" ng-options="c.team for c in opponentsList | orderBy:\'value\'" ',
		'			ng-change="updateTeamMLB(this)" ng-if="mlbSchedule.length>0"></select>',
		'		</div>',
		'		<div class="mlb"></div>',
		'		<table class="gallery">	  ',
		'			<tbody>			',
		'				<tr ng-repeat="teams in mlbSchedule |filter:myTeamOpponent"> ',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.visiting}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">VS.</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.home}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">At the {{teams.arena}} in {{teams.location}}</div>',
		'					</td>	',
		'					<td class="teamsContainer">',
		'						<div class="entity">On {{teams.date}} @ {{teams.time}}</div>',
		'					</td>		',
		'				</tr>',
		'			</tbody>',
		'		</table>',
		'	</div>		',
		'	<hr ng-if="nhlSchedule.length>0" />		',
		'	<div class="galleryList" ng-if="nhlSchedule.length>0">',
		'		<div class="opponentSelect">',
		'			<div class="myTeam" ng-if="myTeamOpponent==\'\'">Here are the opponents for the {{myTeam}}.</div>',
		'			<div ng-if="myTeamOpponent!=\'\'">Here are the games between the<span class="myTeam">{{myTeam}}</span>and the<span class="myTeam">{{myTeamOpponent}}.</span></div>',
		'			<select ng-model="myNHLopponent" ng-options="c.team for c in opponentsList | orderBy:\'value\'" ',
		'			ng-change="updateTeamNHL(this)" ng-if="nhlSchedule.length>0"></select>',
		'		</div>',
		'		<div class="nhl"></div>',
		'		<table class="gallery">	  ',
		'			<tbody>	',
		'				<tr ng-repeat="teams in nhlSchedule |filter:myTeamOpponent"> ',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.visiting}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">VS.</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.home}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">At the {{teams.arena}}</div>',
		'					</td>	',
		'					<td class="teamsContainer">',
		'						<div class="entity">On {{teams.date}}</div>',
		'					</td>		',
		'				</tr>',
		'			</tbody>',
		'		</table>',
		'	</div>	',
		'	',
		'	<hr ng-if="nflSchedule.length>0" />		',
		'	<div class="galleryList" ng-if="nflSchedule.length>0">',
		'		<div class="opponentSelect">',
		'			<div class="myTeam" ng-if="myTeamOpponent==\'\'">Here are the opponents for the {{myTeam}}.</div>',
		'			<div ng-if="myTeamOpponent!=\'\'">Here are the games between the<span class="myTeam">{{myTeam}}</span>and the<span class="myTeam">{{myTeamOpponent}}.</span></div>',
		'			<select ng-model="myNFLopponent" ng-options="c.team for c in opponentsList | orderBy:\'value\'" ',
		'			ng-change="updateTeamNFL(this)" ng-if="nflSchedule.length>0"></select>',
		'		</div>',
		'		<div class="nfl"></div>',
		'		<table class="gallery">	  ',
		'			<tbody>	',
		'				<tr ng-repeat="teams in nflSchedule |filter:myTeamOpponent"> ',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.visiting}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">VS.</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">{{teams.home}}</div>',
		'					</td>',
		'					<td class="teamsContainer">',
		'						<div class="entity">At the {{teams.arena}}</div>',
		'					</td>	',
		'					<td class="teamsContainer">',
		'						<div class="entity">On {{teams.date}}</div>',
		'					</td>		',
		'				</tr>',
		'			</tbody>',
		'		</table>',
		'	</div>',
		'</div>	'].join('')
		
	  };
 	}]);
	
//DIRECTIVES - 	 [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END]
	
//sportsAffiliation  [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START]
  var sportsAffiliation = function($scope,    myAirportSearch, myAirportSearchV2, myAirportSearchUSA, 
  teamsService, $log, $location, $route, $rootScope, $window) {
  
		if(!optimost.sportsAffiliationREV)optimost.sportsAffiliationREV={};
	  
		$scope.noAirportMatchesReturned=false;
		$scope.fullAirportList=[];
		
		//if(!$scope.sportsInfoToAirports)$scope.sportsInfoToAirports = []
		//if(optimost.sportsAffiliationREV.sportsInfoToAirports)$scope.sportsInfoToAirports = optimost.sportsAffiliationREV.sportsInfoToAirports;
		optimost.sportsAffiliationREV.scope=$scope;
		$scope.displayLoadingIcon=function(){
			var nDiv=document.createElement("div");
			nDiv.className="se-pre-con";
			document.body.insertBefore(nDiv,document.body.firstChild);
		}
		
		$scope.goToView = function(url) {
			var funnel={"/sportsAffiliationREV":1,"/teamSelectREV":2,"/teamScheduleREV":3,
			"/sportsAffiliationDRC":1,"/teamSelectDRC":2,"/teamScheduleDRC":3,
			"/sportsAffiliationDRC_link":1,"/teamSelectDRC_link":2,"/teamScheduleDRC_link":3
			}, 
			myPage=$location.path(), myPageIndex, goingToIndex;
			goingToIndex=funnel[url], myPageIndex=funnel[myPage];
			//if(!!goingToIndex.match(/\d/)&&!!myPageIndex.match(/\d/)){
			if(typeof(goingToIndex)==="number" && typeof(myPageIndex)==="number"){
				if(goingToIndex<myPageIndex)$location.path(url);
			}
		};
		
		$scope.airportInfo = true;
		$scope.pickAirportHover = false;
		$scope.pageInfo=function(num,hoverState){
			if(hoverState)$scope.pickAirportHover=true;
			else $scope.pickAirportHover=false;
		}
		
		$scope.doInfoToggle = function(num) {
			var infoDivs=['.airportInfo', '.teamsInfo', '.teamSchedule'];
			$log.info(infoDivs[num]);
			$(infoDivs[num-1]).fadeToggle(2000);
		};	
		
		$scope.clearLoadingIcon=function(){
			$(".se-pre-con").fadeOut("slow");
		}
		
		$scope.selectResult = function(val) {
			$scope.airport=val;
			$scope.filteredResults=[];
			//$scope.airportSearch(val);
			$scope.airportSearchV2(val);
			
		};
		
		var onError = function(reason) {
		  $scope.error = "Could not find the data";
		};
	  
		$scope.airportSearchV2 = function(airport) {//20 Oct 17, Airport to Sports teams
			//$location.path("/teamSelectREV");	
			myAirportSearchV2.getTeams($scope.airport).then(onUserCompleteAirportREV, onError);
			
		};	
	  
		var onUserCompleteAirportREV = function(data) {
			var i, len, j, len2;
			//$location.path("/teamSelectREV");		
			$scope.airport=$scope.airport.toUpperCase();
			//$scope.sportsInfoToAirports = data;//28 Jan
			$scope.sportsInfoToAirports = [];//28 Jan
			$scope.nbaSchedule=null;
			$scope.mlbSchedule=null;
			$scope.nhlSchedule=null;
			$scope.nflSchedule=null;
			$scope.clearLoadingIcon();
			$scope.noAirportMatchesReturned=true;
			for(i=0,len=data.length;i<len;i+=1){
				for(j=0,len2=data[i].location.length;j<len2;j+=1){
					if(data[i].location[j]===$scope.airport){
						$scope.noAirportMatchesReturned=false;
						$scope.sportsInfoToAirports.push(data[i]);
					}
				}
			}
			optimost.sportsAffiliationREV.sportsInfoToAirports=$scope.sportsInfoToAirports;
			teamsService.updateSportsToAirport($scope.sportsInfoToAirports);
			$location.path($location.path().indexOf("REV")!==-1?"/teamSelectREV":($location.path().indexOf("_link")!==-1?"/teamSelectDRC_link":"/teamSelectDRC"));	
			//$scope.noAirportMatchesReturned
		};	
	  
		$scope.toUC = function() {
			$scope.nbaSchedule=null;
			$scope.mlbSchedule=null;
			$scope.nhlSchedule=null;		
			$scope.nflSchedule=null;
			$scope.airportToSportsInfo=null;
			$scope.sportsInfoToAirports=null;
			$scope.autocompleteResults=[];
			$scope.showDropdown=false;
		//Convert lowercase to uppercasee
			$scope.airport=$scope.airport.toUpperCase();		
			if(!$scope.fullAirportList.length)
				//myAirportSearch.getTeams($scope.airport).then(onUserCompleteAirportListOnly, onError);
				myAirportSearchUSA.getTeams($scope.airport).then(onUserCompleteAirportListOnlyUSA, onError);
			else 
				//onUserCompleteAirportListOnly($scope.fullAirportList, true);
				onUserCompleteAirportListOnlyUSA($scope.fullAirportList, true);
			
		};
		
		var onUserCompleteAirportListOnlyUSA = function(data, parsed) {
			var i, len, j, len2, res, num, arp, prefix, match, suffix, airportName;
			if(!parsed){
				$scope.airportToSportsInfo = data;//28 Jan
				$scope.autocompleteResults=[];
				for(i=0,len=data.length;i<len;i+=1){
					
					//$scope.autocompleteResults.push(data[i].iata);
					$scope.autocompleteResults.push({"code":data[i].iata,"airportName":data[i].name});
					
				}
				//$scope.noAirportMatchesReturned
			}
			else {
				$scope.autocompleteResults=data;
			}
			$scope.filteredResults=[];
			for(i=0,len=$scope.autocompleteResults.length;i<len;i+=1){
				arp=$scope.autocompleteResults[i].code,airportName=$scope.autocompleteResults[i].airportName;
				if((num=arp.indexOf($scope.airport))!==-1){
					//res=arp.substring(0,num)+'<span class="bold">'+$scope.airport+'</span>'+arp.substring(num+$scope.airport.length,arp.length+1)
					//$scope.filteredResults.push(res);
					////$scope.filteredResults.push($scope.autocompleteResults[i]);
					prefix=arp.substring(0,num),
					match=$scope.airport,
					suffix=arp.substring(num+$scope.airport.length,arp.length+1);
					$scope.filteredResults.push({"value":arp,"prefix":prefix,"match":match,"suffix":suffix,"airportName":airportName});
				}
				
			}
			if($scope.filteredResults.length)$scope.showDropdown=true;
			else $scope.showDropdown=false;
			$scope.clearLoadingIcon();	
		};	
		
  }
  //sportsAffiliation [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END]
  
  app.controller("sportsAffiliation", ["$scope",   "myAirportSearch", "myAirportSearchV2", "myAirportSearchUSA",
  "teamsService",   "$log", "$location",   "$route", "$rootScope", "$window" , sportsAffiliation
  ])

  
  //teamSelection  [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START]
  var teamSelection = function($scope,  
  myNBAscheduleSearch,  myMLBscheduleSearch, myNHLscheduleSearch, myNFLscheduleSearch, teamsService,
  $location, $log, $route, $rootScope, $routeParams, $window) {  
		
		//$scope.sportsInfoToAirports=sportsAffiliation.sportsInfoToAirports;
		$scope.sportsInfoToAirports=teamsService.data.sportsToAirports;
		if($scope.sportsInfoToAirports.length>0)$scope.noAirportMatchesReturned=false;
		else $scope.noAirportMatchesReturned=true;
		
	//	$scope.goToView = function(url) {
	//		$location.path(url);
	//	};
		$scope.goToView = function(url) {
			var funnel={"/sportsAffiliationREV":1,"/teamSelectREV":2,"/teamScheduleREV":3}, 
			myPage=$location.path(), myPageIndex, goingToIndex;
			goingToIndex=funnel[url], myPageIndex=funnel[myPage];
			//if(!!goingToIndex.match(/\d/)&&!!myPageIndex.match(/\d/)){
			if(typeof(goingToIndex)==="number" && typeof(myPageIndex)==="number"){				
				if(goingToIndex<myPageIndex)$location.path(url);
			}
		};
		$scope.teamsInfo = true;		
		$scope.pickTeamHover = false;
		$scope.pageInfo=function(num,hoverState){
			if(hoverState)$scope.pickTeamHover=true;
			else $scope.pickTeamHover=false;
		}
				
		$scope.doInfoToggle = function(num) {
			var infoDivs=['.airportInfo', '.teamsInfo', '.teamSchedule'];
			$log.info(infoDivs[num]);			
			$(infoDivs[num-1]).fadeToggle(2000);
		};
		
		$scope.scheduleSearch = function(team, entity) {	
			if(entity==="NBA")$scope.nbaScheduleSearch(team);
			else if(entity==="MLB")$scope.mlbScheduleSearch(team);
			else if(entity==="NHL")$scope.nhlScheduleSearch(team);
			else if(entity==="NFL")$scope.nflScheduleSearch(team);
			
		};
		$scope.nbaScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
			myNBAscheduleSearch.getSchedule(team).then(onUserCompleteNBAschedule, onError);
			$scope.myTeam=team;
		};	

		$scope.mlbScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
			myMLBscheduleSearch.getSchedule(team).then(onUserCompleteMLBschedule, onError);
			$scope.myTeam=team;
		};	

		$scope.nhlScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
			myNHLscheduleSearch.getSchedule(team).then(onUserCompleteNHLschedule, onError);
			$scope.myTeam=team;
		};	
		$scope.nflScheduleSearch = function(team) {//20 Oct 17, Airport to Sports teams
			myNFLscheduleSearch.getSchedule(team).then(onUserCompleteNFLschedule, onError);
			$scope.myTeam=team;
		};	

		$scope.displayLoadingIcon=function(){
			var nDiv=document.createElement("div");
			nDiv.className="se-pre-con";
			document.body.insertBefore(nDiv,document.body.firstChild);
		}
		$scope.clearLoadingIcon=function(){
			$(".se-pre-con").fadeOut("slow");
		}		
		
		 var onUserCompleteNBAschedule = function(data) {
			$scope.mlbSchedule=null;
			$scope.nhlSchedule=null;
			$scope.nflSchedule=null;
			$scope.nbaSchedule = data;//20 Oct 17 Jan
			$scope.opponents={};
			$scope.opponentsList=[{"team":"","value":""}];
			for(var i=0,len=data.length;i<len;i++){
				var tm;
				if(data[i].visiting!==$scope.myTeam)tm=data[i].visiting;
				else if(data[i].home!==$scope.myTeam)tm=data[i].home;
				
				if(tm){
					if($scope.opponents[tm])$scope.opponents[tm]+=1;
					else {
						$scope.opponents[tm]=1;
						$scope.opponentsList.push({"team":tm,"value":tm});
					}
				}
			}
			teamsService.updateSchedule($scope.nbaSchedule,"NBA");
			teamsService.updateTeam($scope.myTeam);			
			teamsService.updateOpponentsList($scope.opponentsList);
			$scope.clearLoadingIcon();//24 Oct
			$location.path($location.path().indexOf("REV")!==-1?"/teamScheduleREV":($location.path().indexOf("_link")!==-1?"/teamScheduleDRC_link":"/teamScheduleDRC"));
			//$location.path("/teamScheduleREV");	
		};		
		
		var onUserCompleteMLBschedule = function(data) {
			//$scope.mlbSchedule = data;//20 Oct 17 Jan
			$scope.nbaSchedule=null;
			$scope.nhlSchedule=null;
			$scope.nflSchedule=null;
			$scope.mlbSchedule = [];//20 Oct 17 Jan
			$scope.opponents={};
			$scope.opponentsList=[{"team":"","value":""}];
			for(var i=0,len=data.length;i<len;i++){
				var tm,home=(data[i].homeTeam.City+' '+data[i].homeTeam.Name),
				away=(data[i].awayTeam.City+' '+data[i].awayTeam.Name);
				if(away!==$scope.myTeam)tm=away;
				else if(home!==$scope.myTeam)tm=home;
				$scope.mlbSchedule.push({"visiting":away,"home":home,"arena":data[i].location,"location":data[i].homeTeam.City,"date":data[i].date,"time":data[i].time})
				if(tm){
					if($scope.opponents[tm])$scope.opponents[tm]+=1;
					else {
						$scope.opponents[tm]=1;
						$scope.opponentsList.push({"team":tm,"value":tm});
					}
				}
			}
			teamsService.updateSchedule($scope.mlbSchedule,"MLB");
			teamsService.updateTeam($scope.myTeam);
			teamsService.updateOpponentsList($scope.opponentsList);
			$scope.clearLoadingIcon();//24 Oct
			$location.path($location.path().indexOf("REV")!==-1?"/teamScheduleREV":($location.path().indexOf("_link")!==-1?"/teamScheduleDRC_link":"/teamScheduleDRC"));;			
			//$location.path("/teamScheduleREV");
		};		
		
		var onUserCompleteNHLschedule = function(data) {
			//$scope.mlbSchedule = data;//20 Oct 17 Jan
			$scope.nbaSchedule=null;
			$scope.mlbSchedule=null;	
			$scope.nflSchedule=null;		
			$scope.nhlSchedule = [];//20 Oct 17 Jan
			$scope.opponents={};
			$scope.opponentsList=[{"team":"","value":""}];
			for(var i=0,len=data.length;i<len;i++){
				var tm,home=(data[i].teams.home.team.name),
				away=(data[i].teams.away.team.name), dateTime, dt, date, time;
				if(away!==$scope.myTeam)tm=away;
				else if(home!==$scope.myTeam)tm=home;
				dateTime=data[i].gameDate.split("T");
				date=dateTime[0],time=dateTime[1];
				$scope.nhlSchedule.push({"visiting":away,"home":home,"arena":data[i].venue.name,"date":date+' at '+time})
				if(tm){
					if($scope.opponents[tm])$scope.opponents[tm]+=1;
					else {
						$scope.opponents[tm]=1;
						$scope.opponentsList.push({"team":tm,"value":tm});
					}
				}
			}
			teamsService.updateSchedule($scope.nhlSchedule,"NHL");
			teamsService.updateTeam($scope.myTeam);			
			teamsService.updateOpponentsList($scope.opponentsList);
			$scope.clearLoadingIcon();//24 Oct
			$location.path($location.path().indexOf("REV")!==-1?"/teamScheduleREV":($location.path().indexOf("_link")!==-1?"/teamScheduleDRC_link":"/teamScheduleDRC"));		
			//$location.path("/teamScheduleREV");
		};		
		
		var onUserCompleteNFLschedule = function(data) {
			//$scope.mlbSchedule = data;//20 Oct 17 Jan
			$scope.nbaSchedule=null;
			$scope.mlbSchedule=null;	
			$scope.nhlSchedule=null;		
			$scope.nflSchedule = [];//20 Oct 17 Jan
			$scope.opponents={};
			$scope.opponentsList=[{"team":"","value":""}];
			for(var i=0,len=data.length;i<len;i++){
				var tm,home=(data[i].homeTeam.teamFull),
				away=(data[i].awayTeam.teamFull), dateTime, dt, date, time, teamStadium;
				if(away!==$scope.myTeam)tm=away;
				else if(home!==$scope.myTeam)tm=home;
				dateTime=data[i].startTime;
				teamStadium=data[i].homeTeam.teamStadium;
				//date=dateTime[0],time=dateTime[1];
				$scope.nflSchedule.push({"visiting":away,"home":home,"arena":teamStadium,"date":dateTime})
				if(tm){
					if($scope.opponents[tm])$scope.opponents[tm]+=1;
					else {
						$scope.opponents[tm]=1;
						$scope.opponentsList.push({"team":tm,"value":tm});
					}
				}
			}
			teamsService.updateSchedule($scope.nflSchedule,"NFL");
			teamsService.updateTeam($scope.myTeam);			
			teamsService.updateOpponentsList($scope.opponentsList);
			$scope.clearLoadingIcon();//24 Oct
			$location.path($location.path().indexOf("REV")!==-1?"/teamScheduleREV":($location.path().indexOf("_link")!==-1?"/teamScheduleDRC_link":"/teamScheduleDRC"));
			//$location.path("/teamScheduleREV");
		};		
		var onError = function(reason) {
		  $scope.error = "Could not find the data";

		};

   }

  app.controller("teamSelection", ["$scope",
  "myNBAscheduleSearch", "myMLBscheduleSearch", "myNHLscheduleSearch", "myNFLscheduleSearch", "teamsService", 
  "$location", "$log", "$route", "$rootScope", "$routeParams", "$window", teamSelection
  ]);
//teamSelection [END] [END] [END] [END]  [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END]
   
//teamSchedule  [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START] [START]
  var teamSchedule = function($scope, teamsService, $log, $location, $route, $rootScope, $window) {    
  
		var myData= teamsService.data, n;  //Get Data from previous step
		for(n in myData){
			$scope[n]=myData[n];
		}
		
	//	$scope.goToView = function(url) {
	//		$location.path(url);
	//	};
		
		$scope.goToView = function(url) {
			var funnel={"/sportsAffiliationREV":1,"/teamSelectREV":2,"/teamScheduleREV":3}, 
			myPage=$location.path(), myPageIndex, goingToIndex;
			goingToIndex=funnel[url], myPageIndex=funnel[myPage];
			//if(!!goingToIndex.match(/\d/)&&!!myPageIndex.match(/\d/)){
			if(typeof(goingToIndex)==="number" && typeof(myPageIndex)==="number"){				
				if(goingToIndex<myPageIndex)$location.path(url);
			}
		};
		
		$scope.teamSchedule = true;
		$scope.myTeamOpponent = '';
		$scope.showScheduleHover = false;
		$scope.pageInfo=function(num,hoverState){
			if(hoverState)$scope.showScheduleHover=true;
			else $scope.showScheduleHover=false;
		}
				
		$scope.doInfoToggle = function(num) {
			var infoDivs=['.airportInfo', '.teamsInfo', '.teamSchedule'];
			$log.info(infoDivs[num-1]);			
			$(infoDivs[num]).fadeToggle(2000);
		};
		
		$scope.updateTeamMLB = function(obj){
			//$scope.myTeam=obj.myMLBopponent.value;
			$scope.myTeamOpponent=obj.myMLBopponent.value;
		}		
		$scope.updateTeamNHL = function(obj){
			//$scope.myTeam=obj.myNHLopponent.value;
			$scope.myTeamOpponent=obj.myNHLopponent.value;
		}
		$scope.updateTeamNFL = function(obj){
			//$scope.myTeam=obj.myNFLopponent.value;
			$scope.myTeamOpponent=obj.myNFLopponent.value;			
		}
		$scope.updateTeamNBA = function(obj){
			//$scope.myTeam=obj.myNBAopponent.value;
			$scope.myTeamOpponent=obj.myNBAopponent.value;
		}
  }
   
  app.controller("teamSchedule", ["$scope", "teamsService", "$log", "$location", "$route", "$rootScope", "$window", teamSchedule ]);
//teamSchedule [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END] [END]

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
  
  var myAirportSearch = function($http, $log){
    var getTeams= function(){
		$(".se-pre-con").remove(); //24 Oct
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct			
		return $http.get("/assets/json/airport.sports.json" )
          .then(function(response){
            return response.data;
         });
    };
    return{
      getTeams:getTeams
    };
  };    
  
  var myAirportSearchV2 = function($http, $log){
    var getTeams= function(){
		$(".se-pre-con").remove(); //24 Oct
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct			
		return $http.get("/assets/json/airport.sports.v2.json" )
          .then(function(response){
            return response.data;
         });
    };
    return{
      getTeams:getTeams
    };
  };    
  
  var myAirportSearchUSA = function($http, $log){
    var getTeams= function(){		
		return $http.get("/assets/json/usLargeAirports.json" )
          .then(function(response){
            return response.data;
         });
    };
    return{
      getTeams:getTeams
    };
  };  
  
  var myNBAscheduleSearch = function($http, $log){
    var getSchedule= function(team){
		window.teamSelectedNBA=team;
		//$scope.displayLoadingIcon();//24 Oct
		$(".se-pre-con").remove(); //24 Oct
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct		
		return $http.get("/assets/json/nba_schedule_2017-2018.json" )
          .then(function(response){
			var tmp=[], i, len, tm=window.teamSelectedNBA;
			for(i=0,len=response.data.length;i<len;i+=1){
				if(response.data[i].visiting===tm || response.data[i].home===tm)tmp.push(response.data[i]);
				
			}
			return tmp;
            //return response.data;
         });
    };
    
    return{
      getSchedule:getSchedule
      
    };
  };  
  
  var myMLBscheduleSearch = function($http, $log){
    var getSchedule= function(team){
		window.teamSelectedMLB=team;
		//$scope.displayLoadingIcon();//24 Oct
		$(".se-pre-con").remove();
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct		
		return $http.get("/assets/json/mlb.schedule.2017.json" )
          .then(function(response){
			var tmp=[], i, len, tm=window.teamSelectedMLB, obj;
			try{
				obj=response.data.fullgameschedule.gameentry;
				for(i=0,len=obj.length;i<len;i+=1){
					if((obj[i].awayTeam.City+' '+obj[i].awayTeam.Name)===tm || (obj[i].homeTeam.City+' '+obj[i].homeTeam.Name)===tm)tmp.push(obj[i]);
				}
				return tmp;
			}
			catch(err){}
            //return response.data;
         });
    };
    
    return{
      getSchedule:getSchedule
      
    };
  };   

  var myNHLscheduleSearch = function($http, $log){
    var getSchedule= function(team){
		window.teamSelectedNHL=team;
		//$scope.displayLoadingIcon();//24 Oct
		$(".se-pre-con").remove();
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct
		return $http.get("/assets/json/nhl.schedule.2017-2018.json" )
          .then(function(response){
			var tmp=[], i, len, j, lne2, tm=window.teamSelectedNHL, obj, hm, aw;
			try{
				obj=response.data.dates;
				for(i=0,len=obj.length;i<len;i+=1){
					for(j=0,len2=obj[i].games.length;j<len2;j+=1){
						hm=obj[i].games[j].teams.away.team.name,aw=obj[i].games[j].teams.home.team.name;
						if(hm===tm || aw===tm)tmp.push(obj[i].games[j]);
					}
				}
				return tmp;
			}
			catch(err){}
            //return response.data;
         });
    };
    
    return{
      getSchedule:getSchedule
      
    };
  };     

  var myNFLscheduleSearch = function($http, $log){
    var getSchedule= function(team){
		var teamConverter={"New England Patriots":"NE","Buffalo Bills":"BUF","Miami Dolphins":"MIA","New York Jets":"NYJ",
			"Pittsburgh Steelers":"PIT","Baltimore Ravens":"BAL","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE",
			"Tennessee Titans":"TEN","Jacksonville Jaguars":"JAC","Houston Texans":"HOU","Indianapolis Colts":"IND",
			"Kansas City Chiefs":"KC","Denver Broncos":"DEN","Los Angeles Chargers":"LAC","Oakland Raiders":"OAK",
			"Philadelphia Eagles":"PHI","Dallas Cowboys":"DAL","Washington Redskins":"WAS","New York Giants":"NYG",
			"Minnesota Vikings":"MIN","Green Bay Packers":"GB","Detroit Lions":"DET","Chicago Bears":"CHI","New Orleans Saints":"NO",
			"Carolina Panthers":"CAR","Atlanta Falcons":"ATL","Tampa Bay Buccaneers":"TB",
			"Los Angeles Rams":"LA","Seattle Seahawks":"SEA","Arizona Cardinals":"ARI","San Francisco 49ers":"SF"}, 
			
			teamStadium={"New England Patriots":"Gillette Stadium","Buffalo Bills":"New Era Field","Miami Dolphins":"Hard Rock Stadium","New York Jets":"MetLife Stadium",
			"Pittsburgh Steelers":"Heinz Field","Baltimore Ravens":"M&T Bank Stadium","Cincinnati Bengals":"Paul Brown Stadium","Cleveland Browns":"FirstEnergy Stadium",
			"Tennessee Titans":"Nissan Stadium","Jacksonville Jaguars":"EverBank Field","Houston Texans":"NRG Stadium","Indianapolis Colts":"Lucas Oil Stadium",
			"Kansas City Chiefs":"Arrowhead Stadium","Denver Broncos":"Sports Authority Field at Mile High","Los Angeles Chargers":"StubHub Center","Oakland Raiders":"Oakland-Alameda County Coliseum",
			"Philadelphia Eagles":"Lincoln Financial Field","Dallas Cowboys":"AT&T Stadium","Washington Redskins":"FedExField","New York Giants":"MetLife Stadium",
			"Minnesota Vikings":"U.S. Bank Stadium","Green Bay Packers":"Lambeau Field","Detroit Lions":"Ford Field","Chicago Bears":"Soldier Field",
			"New Orleans Saints":"Mercedes-Benz Superdome","Carolina Panthers":"Bank of America Stadium","Atlanta Falcons":"Mercedes-Benz Stadium","Tampa Bay Buccaneers":"Raymond James Stadium",
			"Los Angeles Rams":"Los Angeles Memorial Coliseum","Seattle Seahawks":"CenturyLink Field","Arizona Cardinals":"University of Phoenix Stadium","San Francisco 49ers":"Levi's Stadium"}, 
			
			tmpTeam;
		window.teamSelectedNFL=team;
		tmpTeam=teamConverter[team];
		//$scope.displayLoadingIcon();//24 Oct
		$(".se-pre-con").remove();
		var nDiv=document.createElement("div");//24 Oct
		nDiv.className="se-pre-con";//24 Oct
		document.body.insertBefore(nDiv,document.body.firstChild);//24 Oct
		return $http.get("/assets/json/nfl.schedule.2017.json" )
          .then(function(response){
			var tmp=[], i, len, j, lne2, tm=window.teamSelectedNHL, obj, hm, aw, hmFull, awFull, n;
			try{
				obj=response.data;
				for(i=0,len=obj.length;i<len;i+=1){
					if(obj[i].seasonType==="Regular"){
						hm=obj[i].homeTeam.team,aw=obj[i].awayTeam.team;
						if(hm===tmpTeam || aw===tmpTeam){
							for(n in teamConverter){
								if(teamConverter[n]===hm)hmFull=n;
								else if(teamConverter[n]===aw)awFull=n;
							}
							obj[i].homeTeam.teamFull=hmFull,
							obj[i].awayTeam.teamFull=awFull;
							obj[i].homeTeam.teamStadium=teamStadium[hmFull];
							tmp.push(obj[i]);
						}
					}
				}
				return tmp;
			}
			catch(err){}
            //return response.data;
         });
    };
    
    return{
      getSchedule:getSchedule
      
    };
  };   
  
  app.factory("myPictures", myPictures);
  app.factory("myAudio", myAudio);
  app.factory("myAirportSearch", myAirportSearch);
  app.factory("myAirportSearchV2", myAirportSearchV2);
  app.factory("myAirportSearchUSA", myAirportSearchUSA);
  app.factory("myNBAscheduleSearch", myNBAscheduleSearch);
  app.factory("myMLBscheduleSearch", myMLBscheduleSearch);
  app.factory("myNHLscheduleSearch", myNHLscheduleSearch);
  app.factory("myNFLscheduleSearch", myNFLscheduleSearch);

  app.factory('teamsService', function(){
	return {
		data: {
			sportsToAirports: [],
			airportsToSports: [],
			nbaSchedule:[],
			nhlSchedule:[],
			mlbSchedule:[],
			nflSchedule:[],
			opponentsList:[]
		},
		updateSportsToAirport: function(sToA) {
			this.data.sportsToAirports = sToA;
		},
		updateAirportsToSports : function(aToS) {
			this.data.airportsToSports = aToS;
		},
		updateSchedule : function(sched, league) {
			if(league==="NBA")this.data.nbaSchedule = sched;
			else if(league==="NHL")this.data.nhlSchedule = sched;
			else if(league==="NFL")this.data.nflSchedule = sched;
			else if(league==="MLB")this.data.mlbSchedule = sched;
			this.clearOtherSchedules(league);
		},
		updateTeam : function(team) {
			this.data.myTeam = team;
		},
		clearOtherSchedules : function(league) {
			var entities={"NBA":"nbaSchedule","NFL":"nflSchedule","NHL":"nhlSchedule","MLB":"mlbSchedule"}, n;
			for(n in entities){
				if(n!==league)this.data[entities[n]]=[];
			}
		},		
		updateOpponentsList: function(list) {
			this.data.opponentsList = list;
		},		
	};
  });
  
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
			.when("/sportsAffiliation",
				{
					controller:'MainController',
					templateUrl: 'partials/sportsAffiliation.html'
				})
			.when("/sportsAffiliationREV",
				{
					//controller:'sportsAffiliationREV',
					controller:'sportsAffiliation',
					templateUrl: 'partials/sportsAffiliationREV.html'
				})
			.when("/teamSelectREV",
				{
					//controller:'teamAffiliationREV',
					controller:'teamSelection',
					templateUrl: 'partials/teamSelectREV.html'
				})
			.when("/teamScheduleREV",
				{
					controller:'teamSchedule',
					templateUrl: 'partials/teamScheduleREV.html'
				})
			.when("/sportsAffiliationDRC",
				{
					//controller:'sportsAffiliationREV',
					controller:'sportsAffiliation',
					templateUrl: 'partials/sportsAffiliationDRC.html'
				})
			.when("/teamSelectDRC",
				{
					//controller:'teamAffiliationREV',
					controller:'teamSelection',
					templateUrl: 'partials/teamSelectDRC.html'
				})
			.when("/teamScheduleDRC",
				{
					controller:'teamSchedule',
					templateUrl: 'partials/teamScheduleDRC.html'
				})
			.when("/sportsAffiliationDRC_link",
				{
					//controller:'sportsAffiliationREV',
					controller:'sportsAffiliation',
					templateUrl: 'partials/sportsAffiliationDRC_link.html'
				})
			.when("/teamSelectDRC_link",
				{
					//controller:'teamAffiliationREV',
					controller:'teamSelection',
					templateUrl: 'partials/teamSelectDRC_link.html'
				})
			.when("/teamScheduleDRC_link",
				{
					controller:'teamSchedule',
					templateUrl: 'partials/teamScheduleDRC_link.html'
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
  
	//app.run(["$rootScope", "$state", "$location", "$injector", function ($rootScope, $state, $location, $injector) {
	app.run(["$rootScope", "$location", "$injector", function ($rootScope, $location, $injector) {
		
		//$rootScope.$state = $state;
		$rootScope.$progressbar = {
			//'state': $state,
			'location': $location,
			'activeItem': 0,
			'$previousState': {}
		};
		if (optimost && optimost.trigger) optimost.trigger("angular:startup", { injector: $injector } );
		$rootScope.$on('$locationChangeSuccess', function () {
			if (optimost.trigger) {
				optimost.trigger("angular:locationChange", {url: $location.url(), injector: $injector } );

				//var pth=$location.$$path;
				var pth=$location.url();
				switch(pth) {
					case "/sportsAffiliationREV":
						$rootScope.$progressbar.activeItem=1;
						break;
						
					case "/teamSelectREV":
						$rootScope.$progressbar.activeItem=2;
						break;
						
					case "/teamScheduleREV":
						$rootScope.$progressbar.activeItem=3;
						break;
					case "/sportsAffiliationDRC":
						$rootScope.$progressbar.activeItem=1;
						break;
						
					case "/teamSelectDRC":
						$rootScope.$progressbar.activeItem=2;
						break;
						
					case "/teamScheduleDRC":
						$rootScope.$progressbar.activeItem=3;
						break;
						
					case "/sportsAffiliationDRC_link":
						$rootScope.$progressbar.activeItem=1;
						break;
						
					case "/teamSelectDRC_link":
						$rootScope.$progressbar.activeItem=2;
						break;
						
					case "/teamScheduleDRC_link":
						$rootScope.$progressbar.activeItem=3;
						break;							
					default:
						$rootScope.$progressbar.activeItem=-1;
				}
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