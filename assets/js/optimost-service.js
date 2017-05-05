(function() {
	//var optimostTemplates= {
	//window.optimostTemplates= {
			//'partials/view1.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 1</div><div>View 1</div><a href="#/view2">View 2</a>',
			//'partials/view2.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 2</div><a href="#/view1">View 1</a><div>View 2</div>'
		//},
	optimostService = angular.module('optimostService', []);
	//optimostService = angular.module('optimost', ['ngRoute', 'templateCache','log']);
	optimostService.provider('Optimost', [
		function() {
			this.$get = function($injector, $rootScope, $location, $templateCache) {
				var _started = false,
					_triggerBase = {
						injector: $injector,
						rootScope: $rootScope,
						location: $location,
						templateCache: $templateCache
					};
				//
				 // @class OptimostService
				 //
				var service = {
					//
					 // Run once at startup run Optimost at-startup code - NOOP on subsequent calls
					 // @method go
					 //
					go: function() {
						if ((!_started) && optimost.trigger) {
							optimost.trigger("angular:startup", angular.extend({}, _triggerBase));
							_started = true;
						}
					},
					//
					 // Report an event (click, screen load, whatever) to report to analytics stream
					 // @method reportEvent
					 // @param {String} name 
					 // @param {Object} data 
					 //
					reportEvent: function(name, data) {
						if (optimost.trigger) {
							optimost.trigger("angular:event", angular.extend({
								name: name,
								data: data
							}, _triggerBase));
						}
					}
				};
				// copied from angularytics: https://github.com/mgonto/angularytics
				$rootScope.$on('$locationChangeSuccess', function() {
					//service.session.pushArrival($location.url());
					if (optimost.trigger) {
						optimost.trigger("angular:locationChange", angular.extend({
							url: $location.url()
						}, _triggerBase));
					}
				});
				return service;
			};
		}
	]);

	/**
	 * Optimost Angularytics plugin placeholder - see
	 *      https://github.com/mgonto/angularytics
	 * currently just a copy of the Angularytics console handler:
	 *     https://raw.githubusercontent.com/mgonto/angularytics/master/src/consoleHandler.js
	 * 
	 * @class AngularyticsOptimostHandler
	 * @private
	 */

	optimostService.factory('AngularyticsOptimostHandler', 
		function($log, Optimost) {
			var service = {};
			service.trackPageView = function(url) {
				//$log.log("Optimost URL visited", url);
				// NOOP - the optimost service (above) already tracks location change
			};
			service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
				$log.log("Optimost Event tracked", category, action, opt_label, opt_value, opt_noninteraction);
				Optimost.reportEvent(category + ":" + action, {
					category: category,
					action: action,
					opt_label: opt_label,
					opt_value: opt_value,
					opt_noninteraction: opt_noninteraction
				});
			};
			service.trackTiming = function(category, variable, value, opt_label) {
				//$log.log("Optimost Timing tracked", category, variable, value, opt_label);
				// NOOP - Optimost does not yet track timing data
			};
			return service;
		}
	);
	
	optimostService.run(
		function($templateCache, $log) {
			var n;
			$log.info("in optimostService");
			/*
			optimostTemplates = window.optimostTemplates || {
				'partials/view1.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 1</div><div>View 1</div><a href="#/view2">View 2</a>',
				'partials/view2.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 2</div><a href="#/view1">View 1</a><div>View 2</div>'
			};*/
			//optimostTemplates = window.optimostTemplates || {}; //3 April 2017
			
			optimostTemplates = window.optimostTemplates || {
				'partials/view1.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 1</div><div>View 1</div><a href="#/view2">View 2</a>',
				'partials/view2.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 2</div><a href="#/view1">View 1</a><div>View 2</div>',
				'partials/start.html':'<div ng-controller="MainController"><div>Start Page</div><a href="#/view1">View 1</a><div><a href="#/audio">Audio</a></div><div><a href="#/gallery">Gallery</a></div><div><a href="#/DOMfunnelStart">Test Funnel (DOM change funnel)</a></div><div>CREATIVE CONTROL, #{{$creative.creativeId}}</div><div><strong>Template Cache testing version, Home Page</strong></div><h1>&#123;&#123;message&#125;&#125;</h1><div>&#123;&#123;error&#125;&#125;</div>&#123;&#123;countdown&#125;&#125;<div><form name="searchUser" ng-submit="search(username)"><input type="search" placeholder="Photo Gallery to find" ng-model="username" /><input type="submit" value="Search" /></form><img ng-src="http://www.gravatar.com/avatar/&#123;&#123;user.gravatar_id&#125;&#125;" title="&#123;&#123;user.name&#125;&#125;" /> Order:<select ng-model="repoSortOrder"><option value="+event">Event</option><option value="+location">Location</option><option value="+date">Date</option></select></div><div><div class="galleryList" ng-repeat="repo in repos | filter:username | orderBy:repoSortOrder"><table class="gallery"><tbody><tr><td><div>&#123;&#123;repo.event&#125;&#125;</div><div>&#123;&#123;repo.location&#125;&#125;</div><div>&#123;&#123;repo.date&#125;&#125;</div><div class="picContainer" ng-repeat="pics in repo.picturesObj" ng-if="$index==0"><a href="#/gallery/&#123;&#123;repo.id&#125;&#125;" ng-click="selectedGallery(repo.id);" ><img ng-src="&#123;&#123;pics.url&#125;&#125;"/></a></div></td></tr></tbody></table></div></div></div>',
				'partials/audio.html':'<div ng-controller="MainController"><a href="#/">Back to the Master Gallery</a><div>View 1</div><a href="#/view2">View 2</a><div>CREATIVE CONTROL, #{{$creative.creativeId}}</div><div><strong>Template Cache testing version, Audio Page</strong></div><h1>&#123;&#123;audioMessage&#125;&#125;</h1><div>&#123;&#123;error&#125;&#125;</div><form name="searchUser" ng-submit="audio()"><input type="submit" value="Gallery" ng-click="audioGallerySelected=true" /></form><table class="gallery" ng-show="audioGallerySelected"><thead><tr><th>ID</th><th>Name</th><th>Date</th></tr></thead><tbody><tr ng-repeat="audio in audioInfo"><td class="galleryLabel">&#123;&#123;audio.id&#125;&#125;</td><td class="galleryLabel">&#123;&#123;audio.name&#125;&#125;</td><td class="galleryLabel">&#123;&#123;audio.date&#125;&#125;</td><td><audio controls="controls" preload="auto"><source src="&#123;&#123;audio.url&#125;&#125;" type="audio/wav&#123;&#123;isNotChrome&#125;&#125;" /><source src="/assets/media/emw_229.ogg" type="audio/ogg" /></audio></td></tr></tbody></table></div>',
				'partials/gallery.html':'<div ng-controller="MainController"><div>Start Page</div><a href="#/view1">View 1</a><div><a href="#/audio">Audio</a></div><div><a href="#/gallery">Gallery</a></div><div><a href="#/audio">Audio</a></div><div><a href="#/DOMfunnelStart">Test Funnel (DOM change funnel)</a></div><div>CREATIVE CONTROL, #{{$creative.creativeId}}</div><div><strong>Template Cache testing version, Gallery Page</strong></div><div><form name="searchUser" ng-submit="search(username)"><input type="search" placeholder="Photo Gallery to find" ng-model="username" /><input type="submit" value="Search" /></form>Order:<select ng-model="repoSortOrder"><option value="+event">Event</option><option value="+location">Location</option><option value="+date">Date</option></select></div><div><div class="galleryList" ng-repeat="repo in repos | filter:username | orderBy:repoSortOrder"><table class="gallery"><tbody><tr><td><div>&#123;&#123;repo.event&#125;&#125;</div><div>&#123;&#123;repo.location&#125;&#125;</div><div>&#123;&#123;repo.date&#125;&#125;</div><div class="picContainer" ng-repeat="pics in repo.picturesObj" ng-if="$index==0"><a href="#/gallery/&#123;&#123;repo.id&#125;&#125;" ng-click="selectedGallery(repo.id);" ><img ng-src="&#123;&#123;pics.url&#125;&#125;"/></a></div></td></tr></tbody></table></div></div>'
				
			};			
			
			for(n in optimostTemplates){
				$templateCache.put(n,optimostTemplates[n]);
				//$log.info(n+" has a value of:"+optimostTemplates[n]+'|'+$templateCache.info().length);
			}
		}
	);
	
})();
/*
//Doing it after the page loading sequence
var optimostTemplates={
	'partials/gallery.html':'<div ng-controller="MainController"><div>Start Page</div><a href="#/view1">View 1</a><div><a href="#/audio">Audio</a></div><div><a href="#/gallery">Gallery</a></div><div><a href="#/audio">Audio</a></div><div>CREATIVE #XYZ</div></div>',
	'partials/view1.html':'<a href="#/">Back to the MMMMMMM Gallery</a><div>This is the challenger for View 1111111</div><div>View 1</div><a href="#/view2">View 2</a>',
	'partials/view2.html':'<a href="#/">Back to the MMMMMMMMMMMMMM Gallery</a><div>This is the challenger for View 22222</div><a href="#/view1">View 1</a><div>View 2</div>'
	}, _tc=jQuery('[ng-app]').injector().get( '$templateCache' ),n;
for(n in optimostTemplates){
	_tc.put(n,optimostTemplates[n]);
}
//angular.injector(['ng']).get( '$templateCache' )

*/
/*
Copyright (c) 2015, Hewlett Packard
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */