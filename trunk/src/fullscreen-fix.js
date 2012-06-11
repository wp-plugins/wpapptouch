var page = document.getElementById('page'),
    ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,

    fullscreen = window.navigator.standalone,
    android = ~ua.indexOf('Android'),
    lastWidth = 0;

if (android) {

  window.onscroll = function() {
    page.style.height = window.innerHeight + 'px';
  }
}
var setupScroll = window.onload = function() {

if (ios) {

    var height = document.documentElement.clientHeight;

    if (iphone && !fullscreen) height += 60; 
    page.style.height = height + 'px';
  } else if (android) {

    page.style.height = (window.innerHeight + 56) + 'px';
	setTimeout(function () {myScroll.refresh();}, 500);
  }

  setTimeout(scrollTo, 0, 0, 1);
};

(window.onresize = function() {
  var pageWidth = page.offsetWidth;

  if (lastWidth == pageWidth) return;
  lastWidth = pageWidth;
  setupScroll();
})();         

(function($) {
    if ($.jQTouch) {
		
        $.jQTouch.addExtension(function fullscreen(jQT){
           
		$(function(){
                $('#jqt').bind('pageAnimationEnd', function(e, data){
                    
					if (data.direction === 'in'){
						
						if (e.target.id == 'search'){
       						moveDown();
						}else{
							moveUp(); 
						}
                    }
					
					
					if (android) {
						if (data.direction === 'in'){
                        	setupScroll();
							setTimeout(function () {myScroll.refresh();}, 1000);
                    	}

					}					
                });
            });

        });
    }
})($);