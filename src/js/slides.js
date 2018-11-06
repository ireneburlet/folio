(function() {
	var slider = {};

	slider.slideIndex = 0;
	slider.nameSlider = '';
	slider.slides = [];

	slider.openAndClose = function(evt){
		var className = '.p'+ evt.currentTarget.dataset.slidenmb;
		var isActive = $(className).hasClass('active');
		var i;
		if(isActive){
			slider.slideIndex = 0;
			$(className).removeClass("active");
			$('.ctn-buttons-slider').css("opacity", "0");
			slider.nameSlider = '';
			for(i = 0; i < slider.slides.length; i++){
				$('#lines-slider').children('div').remove();
			}
			slider.slides = null;
		}
		else{
			slider.nameSlider = className;			// keep the name of the slider
			$(className).addClass("active");
			$('.ctn-buttons-slider').css("opacity", "1");
			slider.slides = $(className).children('.img-project');
			for(i = 0; i < slider.slides.length; i++){
				if(i === 0){
					$('#lines-slider').append('<div class="line active"></div>');	
				}
				else{
					$('#lines-slider').append('<div class="line"></div>');
				}
			}
		}
	};

	slider.changeSlide = function(event){
		if($(slider.nameSlider).hasClass('active')){
			if(event.key === "ArrowRight"){
				slider.nextSlide();
			}
			else if(event.key === "ArrowLeft"){
				slider.previousSlide();
			}
			slider.slides.forEach(function(item) {
				item.style.display = "none";
			});
			slider.slides[slider.slideIndex].style.display = "block";
		}
	};

	slider.nextSlide = function(){
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').removeClass('active');
		if(slider.slideIndex+1 === slider.slides.length){
			slider.slideIndex = 0;
		}
		else{
			slider.slideIndex++;
		}
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').addClass('active');
		// slider.offsetX += slider.imgSize;
	};

	slider.previousSlide = function(){
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').removeClass('active');
		if(slider.slideIndex === 0){
			slider.slideIndex = slider.slides.length-1;
		}else{
			slider.slideIndex--;
		}
		$('#lines-slider').children('div:nth-child('+ (slider.slideIndex + 1) + ')').addClass('active');
		// slider.offsetX -= slider.imgSize;
	};

	slider.displayButtonsSlider = function(){

	};

	slider.goBack = function(evt){
		var i;
		for(i = 1; i < 4; i++){
			$('.p'+ i).removeClass("active");
		}
	};

	/*--------------- Click slider div event listener -----------------*/
	$('#projects').on("click", "div", _.throttle(slider.openAndClose, 60)); // open slider listener
	document.addEventListener('keydown', slider.changeSlide); // change slide with arrows

}());