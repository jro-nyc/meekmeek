try {
	angular.module( 'optimostService' );
} catch ( ex ) {
	/**
	 * Optimost not yet on the page - register a fallback implementation of Optimost module 
	 * just to be safe.
	 */
	angular.module( 'optimostService', [] );
}

window.opUserName='';
