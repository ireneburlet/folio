(function() {
	var slider = {};

	slider.slideIndex = 0;
	slider.slidenumber = 0;
	slider.nameSlider = '';
	slider.slides = [];

	slider.open = function(evt){
		var idSlider = '#project-' + evt.currentTarget.dataset.slidenmb;
		var i;
		if(!$(idSlider).hasClass('active')){
			slider.nameSlider = idSlider;			// keep the name of the slider
			slider.slidenumber = evt.currentTarget.dataset.slidenmb;
			$(idSlider).addClass("active");
			$('.ctn-buttons-slider').css("opacity", "1");
			slider.slides = $(idSlider).children('.img-project');
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

	slider.changeSlide = function(event){
		if($(slider.nameSlider).hasClass('active')){
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
			slider.slides.forEach(function(item) {
				item.style.display = "none";
			});
			slider.slides[slider.slideIndex].style.display = "block";
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

	slider.displayInfos = function(evt){
		if($(slider.nameSlider).children('div').hasClass('infoActive')){
			$(slider.nameSlider).children('div').removeClass('infoActive');
		}
		else{
			$(slider.nameSlider).children('div').addClass('infoActive');
		}
	};

	slider.goBack = function(evt){
		var i;
		slider.slideIndex = 0;
		for(i = 0; i < slider.slides.length; i++){
			$('#lines-slider').children('div').remove();
		}
		slider.slides = null;
		$(slider.nameSlider).removeClass("active");
		slider.nameSlider = '';
		$('.ctn-buttons-slider').css("opacity", "0");
	};

	slider.chooseSlide = function(evt){
		var indexLine = evt.currentTarget.dataset.indexline;
		var i;
		if(indexLine > slider.slideIndex){
			for(i = slider.slideIndex; i < indexLine; i++){
				console.log("next");
				slider.nextSlide();
			}
		}
		else if(indexLine < slider.slideIndex){
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

	/*--------------- Click slider div event listener -----------------*/
	$('#projects').on("click", ".project", _.throttle(slider.open, 60)); // open slider listener
	document.addEventListener('keydown', slider.changeSlide); // change slide with arrows
	$('#projects').on("click", "#back-btn", _.throttle(slider.goBack, 60));
	$('#projects').on("click", "#infos-btn", _.throttle(slider.displayInfos, 60));
	$('#lines-slider').on("click", ".line", _.throttle(slider.chooseSlide, 60));
}());