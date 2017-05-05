(function(angular) {

  angular.module('optimostService')
    .directive('myDirectiveName', MyDirectiveName);

  function MyDirectiveName() {
    return {
      restrict: 'E',
      template: '<div>Custom Directive with {{myAttr}} as my-attribute</div>',
      scope: {
        myAttr: '@myAttribute'
      }
    };
  }

  // run this later.
  setTimeout(function() {
	console.log('in directive');
    var appDiv = angular.element(document.getElementById('jrTest'));
    // Get the injector to compile
    var $injector = appDiv.injector();
    var $compile = $injector.get('$compile');
    // compile new elems
    var barLink = $compile(angular.element('<my-directive-name my-attribute="bar"></my-directive-name>'));
    var bazLink = $compile(angular.element('<my-directive-name my-attribute="baz"></my-directive-name>'));

    // append both elements by linking against scope
    appDiv.append(barLink(appDiv.scope()));
    appDiv.append(bazLink(appDiv.scope()));
  }, 3000);
}(angular));		
		