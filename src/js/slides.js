(function() {
	var slider = {};

	slider.slideIndex = 0;		// index of current image visible
	slider.nameSlider = '';		// name of the current slider open
	slider.slides = [];			// array of images of the current slider open

	// click on a project action
	// if project is not active : open project
	// else change the visible image
	slider.open	 = function(evt){
		var idSlider = '#project-' + evt.currentTarget.dataset.slidenmb;
		var i;
		if(!$(idSlider).hasClass('active')){
			slider.nameSlider = idSlider;			// keep the html id of the slider
			$(idSlider).addClass("active");
			$('.ctn-buttons-slider').css("display", "flex");
			$('.ctn-buttons-slider').css("opacity", "1");
			slider.slides = $(idSlider).children('.img-project');	// store the images of the slider
			$('#infos-btn').css("color", "white");
			// add the buttons to navigate between images
			for(i = 0; i < slider.slides.length; i++){
				if(i === 0){
					$('#lines-slider').append('<div class="line line-active" data-indexline="' + i +'"></div>');	
				}
				else{
					$('#lines-slider').append('<div class="line" data-indexline="' + i +'"></div>');
				}
			}
		}
		else{
			slider.changeSlide(evt);
		}
	};

	// change img of the slider
	slider.changeSlide = function(event){
		if($(slider.nameSlider).hasClass('active') && !$(slider.nameSlider).children('div').hasClass('infoActive')){
			var offsetX = 0;
			var halfWidthImg = $(slider.nameSlider).width()/2;
			var isClick = (event.type === "click") ? true : false;
			if(isClick){
				offsetX = event.offsetX;
			}	
			if(event.key === "ArrowRight" || (isClick && offsetX > halfWidthImg)){
				slider.nextSlide();
			}
			else if(event.key === "ArrowLeft" || (isClick && offsetX < halfWidthImg)){
				slider.previousSlide();
			}
			slider.displayImage();
		}
	};

	slider.nextSlide = function(){
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').removeClass('line-active');
		if(slider.slideIndex+1 === slider.slides.length){
			slider.slideIndex = 0;
		}
		else{
			slider.slideIndex++;
		}
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').addClass('line-active');
	};

	slider.previousSlide = function(){
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').removeClass('line-active');
		if(slider.slideIndex === 0){
			slider.slideIndex = slider.slides.length-1;
		}else{
			slider.slideIndex--;
		}
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').addClass('line-active');
	};

	slider.displayImage = function(){
		slider.slides.forEach(function(item) {
				item.style.display = "none";
			});
		slider.slides[slider.slideIndex].style.display = "block";
	};

	slider.displayInfos = function(){
		if($(slider.nameSlider).children('div').hasClass('infoActive')){
			$(slider.nameSlider).children('div').removeClass('infoActive');
			$('#infos-btn').css("color", "white");
		}
		else{
			$(slider.nameSlider).children('div').addClass('infoActive');
			$('#infos-btn').css("color", "rgb(171,0,0)");
		}
	};

	// go to the first image of slider when leave the slider
	slider.goFirstSlide = function(){
		var i;
		if(slider.slideIndex){
			for(i = 0; i < slider.slideIndex + 1; i++){
				slider.previousSlide();
			}
			slider.displayImage();
		}
	};

	// click on a line to change the slider
	slider.chooseSlide = function(evt){
		var indexLine = evt.currentTarget.dataset.indexline;
		var i;
		if(indexLine > slider.slideIndex){
			for(i = slider.slideIndex; i < indexLine; i++){
				console.log("next");
				slider.nextSlide();
			}
		}
		else{
			for(i = slider.slideIndex; i > indexLine; i--){
				console.log("previous");
				slider.previousSlide();
			}
		}
		slider.slides.forEach(function(item) {
			item.style.display = "none";
		});
		slider.slides[slider.slideIndex].style.display = "block";
	};

	// change the style of cursor on the hover of the project img (next or prev)
	slider.hoverActiveProject = function(evt){
		if(slider.nameSlider){
			var offsetX = evt.offsetX;
			var halfWidthImg = $(slider.nameSlider).width()/2;
			if(offsetX > halfWidthImg){
				$(".project").css("cursor", "url('./../assets/svg/cursor_nxt.svg'), e-resize");
			}
			else{
				$(".project").css("cursor", "url('./../assets/svg/cursor_prv.svg'), w-resize");
			}
		}
	};

	// close the current slider
	slider.goBack = function(evt){
		var i;
		$(slider.nameSlider).children('div').removeClass('infoActive');
		$('#infos-btn').css("text-decoration", "none");
		slider.goFirstSlide();
		for(i = 0; i < slider.slides.length; i++){
			$('#lines-slider').children('div').remove();
		}
		slider.slideIndex = 0;
		slider.slides = null;
		$(slider.nameSlider).removeClass("active");
		slider.nameSlider = '';
		$('.ctn-buttons-slider').css("opacity", "0");
		$('.ctn-buttons-slider').css("display", "none");
		$('.project').css("cursor", "cell");
	};

	/*--------------- Click slider div event listener -----------------*/
	$('#projects').on("click", ".project", _.throttle(slider.open, 60)); // open slider listener
	// document.addEventListener('keydown', slider.changeSlide); // change slide with arrows
	// $('#section3').on('keydown', _.throttle(slider.changeSlide, 60));
	$('#projects').on("click", "#back-btn", _.throttle(slider.goBack, 60));
	$('#projects').on("click", "#infos-btn", _.throttle(slider.displayInfos, 60));
	$('#lines-slider').on("click", ".line", _.throttle(slider.chooseSlide, 60));
	$('#projects').on("mousemove", ".project", _.throttle(slider.hoverActiveProject, 60));
}());