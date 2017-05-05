(function(g, l, d, async, accountId, withGeo ){
   if( l.search.match( /[\?&]opDMH\=off/i ) || d.cookie.match( /(^|;)\s*opDMH\=off/ ) ){ return false; }
   var p="http://by.marketinghubBud.hp.com/es/hp/c/0/u/customer.global.js",  n, b, buster,  i,  all = [],
   dmhTest = l.search.match( /[\?&]dmhTest\=([^\?&#]+)/i ) || d.cookie.match( /(^|;)\s*dmhTest\=([^;]+)/),
	// check flags to bypass akamai cache
   esnocache = (!! dmhTest)
		|| l.search.match( /[\?&]opnocache\=([^\?&#]+)/i ) 
		|| d.cookie.match( /(^|;)\s*opnocache\=([^;]+)/), url;
   if( dmhTest ) {
	   p = p.replace( "customer.global.js", "customer.global.test.js" );
   }
   if ( esnocache ) {
	   p = p.replace( "/es/", "/esnocache/" );
   }      
   buster = l.search.match( /[\?&](dmhBuster\=\w+)/i ) || d.cookie.match( /(^|;)\s*(dmhBuster\=\w+)/ );
   if( buster ) { p = p + "?" + buster[1]; }
   g._dmhConfig = g._dmhConfig || {};  // global config flags
   if ( async ) { g._dmhConfig.loadAsync = true; }
   all = [p];
   for( i=0; i < all.length; ++i ) {
	   url = all[i];
	   if( l.protocol === 'https:' ) { url = url.replace( /^http\:\/\/by/, "https://secure" ); }
	   n=d.createElement( "script" );
	   n.src = url;
	   if( async ) {
	   b=d.getElementsByTagName( "script" )[0];
	   b.parentNode.insertBefore( n, b );
	   } else {
	   d.write( n.outerHTML + "\n" );
	   }
   }
   return true;
})(window, location, document, (document.readyState !== "loading"),1649);
