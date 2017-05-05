(function() {
	var optimostTemplates={
			'partials/view1.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 1</div><div>View 1</div><a href="#/view2">View 2</a>',
			'partials/view2.html':'<a href="#/">Back to the Master Gallery</a><div>This is the challenger for View 2</div><a href="#/view1">View 1</a><div>View 2</div>'
		},
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
			for(n in optimostTemplates){
				$templateCache.put(n,optimostTemplates[n]);
				$log.info(n+" has a value of:"+optimostTemplates[n]);
			}
		}
	);
	
})();
/*
//Doing it after the page loading sequence
var optimostTemplates={
	'partials/view1.html':'<a href="#/">Back to the MMMMMMM Gallery</a><div>This is the challenger for View 1111111</div><div>View 1</div><a href="#/view2">View 2</a>',
	'partials/view2.html':'<a href="#/">Back to the MMMMMMMMMMMMMM Gallery</a><div>This is the challenger for View 22222</div><a href="#/view1">View 1</a><div>View 2</div>'
	}, _tc=jQuery('[ng-app]').injector().get( '$templateCache' ),n;
for(n in optimostTemplates){
	_tc.put(n,optimostTemplates[n]);
}

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