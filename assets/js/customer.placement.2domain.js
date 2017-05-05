(function(g, l, d, async, accountId, withGeo ){
   if( l.search.match( /[\?&]opDMH\=off/i ) || d.cookie.match( /(^|;)\s*opDMH\=off/ ) ){ return false; }
   //14 Sept 2016 - domain transition
   var dmhX=(d.cookie.match( /(^|;)\s*opDomain\=OT/)?"opentext":"hp"), sub=(d.cookie.match( /(^|;)\s*opDomain\=OT/)?"cdn":"by"), 
   subSec=(d.cookie.match( /(^|;)\s*opDomain\=OT/)?"https://cdn":"https://secure");
   var p="http://"+sub+".marketinghub."+dmhX+".com/es/" + accountId + "/c/0/u/customer.global.js",  n, b, buster,  i,  all = [],
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
	   //if( l.protocol === 'https:' ) { url = url.replace( /^http\:\/\/by/, "https://secure" ); }
	   if( l.protocol === 'https:' ) { url = url.replace( /^http\:\/\/by/, subSec ); }
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
})(window, location, document, (document.readyState !== "loading"),(location.hash.indexOf("ChoiceHotels")!==-1?1750:1649));
