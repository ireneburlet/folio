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
		var cSlideNmb = "";
		var cSectionName = "";
		var cColor = "";
		switch(scroll.currentSlideNumber){
			case 0:
				cSectionNmb = "04";
				cSectionName = "Contact";
				$("#responsive-section-name").addClass('blackName');
				break;
			case 1:
				cSectionNmb = "03";
				cSectionName = "About Me";
				$("#responsive-section-name").removeClass('blackName');
				break;
			case 2:
				cSectionNmb = "02";
				cSectionName = "Projects";
				$("#responsive-section-name").addClass('blackName');
				break;
			case 3:
				cSectionNmb = "01";
				cSectionName = "Home";
				$("#responsive-section-name").removeClass('blackName');
				break;
			default:
				break;
		}
		$("#responsive-section-name").children("span").html(cSectionNmb);
		$("#responsive-section-name").children("h2").html(cSectionName);
		if(scroll.currentSlideNumber === 1){
			$('.bgCol').addClass('blackBgdCol');
			$('.social-link').addClass("lime-social-link");
			$('#navigation').addClass("green-nav");
		}
		else{
			$('.bgCol').removeClass('blackBgdCol');
			$('.social-link').removeClass("lime-social-link");
			$('#navigation').removeClass("green-nav");
		}
	};

	scroll.activeBurgerMenu = function(){
		if($(window).width() < 600){
			if($('#navigation').hasClass('active')){
				$('#navigation').removeClass('active');
			}
			else{
				$('#navigation').addClass('active');
			}
		}
	};

	/*---------- Scroll Event Listener -------------*/
	var mouseWheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
	window.addEventListener(mouseWheelEvent, _.throttle(scroll.onScroll, 60), false);
	/*--------------- Click nav event listener -----------------*/
	$('#navigation').on("click", "a", _.throttle(scroll.handleClick, 60));
	$('#navigation').on("click", _.throttle(scroll.activeBurgerMenu, 60));
	$(document).on('keydown', scroll.handleArrow); // change slide with arrows
	// resize of the window
	window.onresize = function(event){
		scroll.windowHeight = $(window).height();
		scroll.offsetY = -scroll.currentSlideNumber * $(window).height();
	};
}());