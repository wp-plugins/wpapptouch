/*
    Created by Gino Côté <http://wpapptouch.com/>
    Documentation and issue tracking on Google Code <http://iTabbar.com/>
	
	Hide Adress bar in IOS and Android to make page FullScreen
    
    Based on this script on Github <https://gist.github.com/1172490>
    
    (c) 2012 by iTabbar.
    MIT license.

*/
var page = document.getElementById('page'),
    ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,
    // Detect if this is running as a fullscreen app from the homescreen
    fullscreen = window.navigator.standalone,
    android = ~ua.indexOf('Android'),
    lastWidth = 0;

if (android) {
  // Android's browser adds the scroll position to the innerHeight, just to
  // make this really fucking difficult. Thus, once we are scrolled, the
  // page height value needs to be corrected in case the page is loaded
  // when already scrolled down. The pageYOffset is of no use, since it always
  // returns 0 while the address bar is displayed.
  window.onscroll = function() {
    page.style.height = window.innerHeight + 'px'
  } 
}
var setupScroll = window.onload = function() {
  // Start out by adding the height of the location bar to the width, so that
  // we can scroll past it
  if (ios) {
    // iOS reliably returns the innerWindow size for documentElement.clientHeight
    // but window.innerHeight is sometimes the wrong value after rotating
    // the orientation
    var height = document.documentElement.clientHeight;
    // Only add extra padding to the height on iphone / ipod, since the ipad
    // browser doesn't scroll off the location bar.
    if (iphone && !fullscreen) height += 60;
    page.style.height = height + 'px';
	
}else if(android){page.style.height=(window.innerHeight+56)+'px'setTimeout(function(){myScroll.refresh()},500)}setTimeout(scrollTo,0,0,1)};(window.onresize = function() {
  var pageWidth = page.offsetWidth;
  // Android doesn't support orientation change, so check for when the width
  // changes to figure out when the orientation changes
  if (lastWidth == pageWidth) return;
  lastWidth = pageWidth;
  setupScroll();
})();         

//For jQtouch on page or hashchange
(function($) {
    if ($.jQTouch) {
		
        $.jQTouch.addExtension(function fullscreen(jQT){
           
		$(function(){
                $('#jqt').bind('pageAnimationEnd', function(e, data){
                    
					if (data.direction === 'in'){
						
						if (e.target.id == 'search'){
       						moveDown(); //move search down
							//alert('moveDown');
						}else{
							moveUp(); //move search up
							//alert('moveUP');
						}
                    }
					
					
					if (android) {
						if (data.direction === 'in'){
                        	setupScroll();
							setTimeout(function () {myScroll.refresh();}, 1000);
                    	}
						
						//if (data.direction === 'in')return;
                        	//setupScroll();
							//setTimeout(function () {myScroll.refresh();}, 500);
					}					
                });
            });

        });
    }
})($);