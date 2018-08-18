(function(){
	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var isIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));

	var scroll = {};

	scroll.scrollSentsitivity = 60;

	scroll.onScroll = function(evt){
		if(isFirefox){
			delta = -evt.detail * (-120);
		}
		else if(isIE){
			delta = -evt.deltaY;
		}
		else{
			delta = evt.wheelDelta;
		}

		console.log(delta);
	};

	var mouseWheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
	window.addEventListener(mouseWheelEvent, _.throttle(scroll.onScroll, 60), false);
}());