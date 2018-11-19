(function(){
	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var isIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));

	var scroll = {}; //concerning the up and down mouvement on window

	scroll.scrollSensitivity = 100;
	scroll.ticking = false;
	scroll.slideDuration = 600;
	scroll.currentSlideNumber = 3;
	scroll.totalSlideNumber = $('.section').length;
	scroll.windowHeight = $(window).height();
	scroll.offsetY = -scroll.currentSlideNumber * $(window).height();
	scroll.heightIndicator = 0;

	scroll.onScroll = function(evt){
		if(isFirefox){
			delta = evt.detail * (-60);
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
				//up scroll
				scroll.ticking = true;
				if(scroll.currentSlideNumber !== scroll.totalSlideNumber - 1){
					scroll.nextSection();
				}
				scroll.slideDurationTimeout(scroll.slideDuration);
			}
			if(delta >= scroll.scrollSensitivity) {
				//down scroll
				scroll.ticking = true;
				if(scroll.currentSlideNumber !== 0) {
					scroll.previousSection();
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

	/*---------- Scroll Event Listener -------------*/
	var mouseWheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
	window.addEventListener(mouseWheelEvent, _.throttle(scroll.onScroll, 60), false);

	/*---------- Slide Motion -------------*/
	scroll.nextSection = function (){
		scroll.offsetY -= scroll.windowHeight;
		translation = "translate3d(0px, " + scroll.offsetY + "px, 0px);";
		$('.fullpage-container').css("transform", translation);
		$('.i' + scroll.currentSlideNumber).removeClass("active");
		scroll.currentSlideNumber++;
		$('.i' + scroll.currentSlideNumber).addClass("active");
	};

	scroll.previousSection = function() {
		scroll.offsetY += scroll.windowHeight;
		translation = "translate3d(0px, " + scroll.offsetY + "px, 0px);";
		$('.fullpage-container').css("transform", translation);
		$('.i' + scroll.currentSlideNumber).removeClass("active");
		scroll.currentSlideNumber--;
		$('.i' + scroll.currentSlideNumber).addClass("active");
	};
	
	scroll.handleClick = function(e){
		var clickedAnchor = e.currentTarget.dataset.anchor;
		var cSlideNmb = scroll.currentSlideNumber;

		if(cSlideNmb > clickedAnchor){
			for(i = cSlideNmb; i > clickedAnchor; i--){
				scroll.previousSection();
			}
		}
		else if(cSlideNmb < clickedAnchor){
			for(i = cSlideNmb; i < clickedAnchor; i++){
				scroll.nextSection();
			}
		}
	};

	/*--------------- Click nav event listener -----------------*/
	$('#navigation').on("click", "a", _.throttle(scroll.handleClick, 60));
}());