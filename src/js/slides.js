(function() {
	var slider = {};

	slider.slideIndex = 0;
	slider.imgSize = 0;
	slider.offsetX = 0;
	slider.nameSlider = '';
	slider.slides = [];

	slider.openAndClose = function(evt){
		var className = '.p'+ evt.currentTarget.dataset.slidenmb;
		var isActive = $(className).hasClass('active');
		if(isActive){
			slider.slideIndex = 0;
			slider.imgSize = 0;
			slider.offsetX = 0;
			$(".img-project").css("transform", "translate3d(0px, " + slider.offsetX + "px, 0px);");
			$(className).removeClass("active");
			$('.ctn-buttons-slider').css("opacity", "0");
			slider.nameSlider = '';
			slider.slides = null;
		}
		else{
			slider.nameSlider = className;
			slider.imgSize = $(className).width();
			$(className).addClass("active");
			$('.ctn-buttons-slider').css("opacity", "1");
			slider.slides = $(className).children('.img-project');
			console.log(slider.slides);
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
				console.log(item);
				item.style.display = "none";
				// $(".img-project").css("transform", "translate3d(" + slider.offsetX + "px, 0px, 0px);");
			});
			slider.slides[slider.slideIndex].style.display = "block";
		}
	};

	slider.nextSlide = function(){
		slider.slideIndex++;
		// slider.offsetX += slider.imgSize;
	};

	slider.previousSlide = function(){
		slider.slideIndex--;
		// slider.offsetX -= slider.imgSize;
	};

	slider.showSlide = function (n){
		// console.log(evt);
	};

	slider.goBack = function(evt){
		var i;
		for(i = 1; i < 4; i++){
			$('.p'+ i).removeClass("active");
		}
	};

	/*--------------- Click slider div event listener -----------------*/
	$('#projects').on("click", "div", _.throttle(slider.openAndClose, 60));
	document.addEventListener('keydown', slider.changeSlide);
}());