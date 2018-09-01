(function(){
	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var isIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));

	var scroll = {};

	scroll.scrollSensitivity = 100;
	scroll.ticking = false;
	scroll.slideDuration = 500;
	scroll.currentSlideNumber = 0;
	scroll.totalSlideNumber = $('.section').length;
	scroll.windowHeight = $(window).height();
	scroll.offsetY = 0;

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

		if(scroll.ticking != true){
			var trans = 0;
			if(-delta >= scroll.scrollSensitivity){
				//down scroll
				scroll.ticking = true;
				if(scroll.currentSlideNumber !== scroll.totalSlideNumber - 1){
					console.log("down");
					scroll.offsetY -= scroll.windowHeight;
					trans = "translate3d(0px, " + scroll.offsetY + "px, 0px);";
					$('.fullpage-container').css("transform", trans);
					scroll.currentSlideNumber++;
				}
				scroll.slideDurationTimeout(scroll.slideDuration);
			}
			if(delta >= scroll.scrollSensitivity) {
				//up scroll
				scroll.ticking = true;
				if(scroll.currentSlideNumber !== 0) {
					console.log("up");
					scroll.offsetY += scroll.windowHeight;
					trans = "translate3d(0px, -" + scroll.offsetY + "px, 0px);";
					$('.fullpage-container').css("transform", trans);
					scroll.currentSlideNumber--;
				}
				scroll.slideDurationTimeout(scroll.slideDuration);
			}
		}
	};

	scroll.slideDurationTimeout = function (slideDuration){
		setTimeout(function() {
			scroll.ticking = false;
		}, slideDuration);
	};

	/*---------- Event Listener -------------*/
	var mouseWheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
	window.addEventListener(mouseWheelEvent, _.throttle(scroll.onScroll, 60), false);
	/*---------- Slide Motion -------------*/
	scroll.nextItem = function (){
		var previousSlide = $('.background').eq(scroll.currentSlideNumber - 1);
		previousSlide.removeClass('up-scroll').addClass('down-scroll');
	};

	scroll.previousItem = function() {
		var currentSlide = $('.background').eq(scroll.currentSlideNumber);
		currentSlide.removeClass('down-scroll').addClass('up-scroll');
	};

}());