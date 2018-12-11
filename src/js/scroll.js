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
	scroll.hasScroll = false;

	scroll.onScroll = function(evt){
		if(isFirefox){
			delta = evt.detail * (-60);
		}
		else if(isIE){
			delta = -evt.deltaY;
			sign = -1;
		}
		else{
			delta = evt.wheelDelta;
			sign = 1;
		}

		var sign = (delta > 0) ? 1 : -1;
		if(delta*sign > scroll.scrollSensitivity/2){
			var k = 2;
			$('.background').children('div').forEach(function(child){
				child.style.transform = "translateY(" + sign*30*k + "px)";
				k-=0.4;
			});
		}

		if(scroll.ticking != true){
			var trans = 0;
			if(-delta >= scroll.scrollSensitivity){
				$('.background').children('div').forEach(function(child){
					child.style.transform = "translateY(" + 0 + "px)";
				});
				//up scroll
				scroll.ticking = true;
				scroll.nextSection();
				scroll.slideDurationTimeout(scroll.slideDuration);
			}
			if(delta >= scroll.scrollSensitivity) {
				$('.background').children('div').forEach(function(child){
					child.style.transform = "translateY(" + 0 + "px)";
				});
				//down scroll
				scroll.ticking = true;
				scroll.previousSection();
				scroll.slideDurationTimeout(scroll.slideDuration);
			}
		}

		setTimeout(function(){
			$('.background').children('div').forEach(function(child){
				child.style.transform = "translateY(" + 0 + "px)";
			}); 
		}, 600);
	};

	scroll.slideDurationTimeout = function (slideDuration){
		setTimeout(function() {
			scroll.ticking = false;
		}, slideDuration);
	};

	/*---------- Slide Motion -------------*/
	scroll.nextSection = function (){
		if(scroll.currentSlideNumber !== scroll.totalSlideNumber - 1){
			scroll.offsetY -= scroll.windowHeight;
			translation = "translate3d(0px, " + scroll.offsetY + "px, 0px);";
			$('.fullpage-container').css("transform", translation);
			$('.i' + scroll.currentSlideNumber).removeClass("active");
			scroll.currentSlideNumber++;
			$('.i' + scroll.currentSlideNumber).addClass("active");
			scroll.changeStyle();
		}
	};

	scroll.previousSection = function() {
		if(scroll.currentSlideNumber !== 0) {
			scroll.offsetY += scroll.windowHeight;
			translation = "translate3d(0px, " + scroll.offsetY + "px, 0px);";
			$('.fullpage-container').css("transform", translation);
			$('.i' + scroll.currentSlideNumber).removeClass("active");
			scroll.currentSlideNumber--;
			$('.i' + scroll.currentSlideNumber).addClass("active");
			scroll.changeStyle();
		}
		if(!scroll.hasScroll){
			$(".scroll-indicator").css("opacity", "0");
		}
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

	scroll.handleArrow = function(e){
		if(e.key === "ArrowDown"){
			scroll.nextSection();
		}
		else if(e.key === "ArrowUp"){
			scroll.previousSection();
		}
	};

	scroll.changeStyle = function(){
		if(scroll.currentSlideNumber === 1){
			$('.bgCol').css("background-color", "rgb(15,15,15)");
			$('.bgCol').css("border-left-color", "rgba(0,255,0,0.1)");
			$('.social-link').css("color", "rgba(0,255,0,0.5)");
			$('.nav-number').css("color", "rgb(0,255,0)");
			$('.section-name').css("color", "rgb(0,255,0)");
			$('.anchor-section').css("border-right-color", "rgb(0,255,0)");
		}
		else{
			$('.bgCol').css("background-color", "white");
			$('.bgCol').css("border-left-color", "rgba(0,0,0,0.1)");
			$('.social-link').css("color", "rgba(0,0,0,0.5)");
			$('.nav-number').css("color", "rgb(15,15,15)");
			$('.section-name').css("color", "rgb(15,15,15)");
			$('.anchor-section').css("border-right-color", "rgb(15,15,15)");
		}
	};

	/*---------- Scroll Event Listener -------------*/
	var mouseWheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
	window.addEventListener(mouseWheelEvent, _.throttle(scroll.onScroll, 60), false);
	/*--------------- Click nav event listener -----------------*/
	$('#navigation').on("click", "a", _.throttle(scroll.handleClick, 60));
	$(document).on('keydown', scroll.handleArrow); // change slide with arrows
	// resize of the window
	window.onresize = function(event){
		scroll.windowHeight = $(window).height();
		scroll.offsetY = -scroll.currentSlideNumber * $(window).height();
	};
}());