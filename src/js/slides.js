(function() {
	var slider = {};

	slider.slideIndex = 1;

	slider.slides = [];

	slider.openSlider = function(evt){
		var className = '.p'+ evt.currentTarget.dataset.slidenmb;
		var isActive = $(className).hasClass('active');
		if(isActive){
			$(className).removeClass("active");
			$('.ctn-buttons-slider').css("opacity", "0");
		}
		else{
			$(className).addClass("active");
			$('.ctn-buttons-slider').css("opacity", "1");
		}
	};

	slider.showSlide = function (evt){
		console.log(evt);
	};

	slider.goBack = function(evt){
		var i;
		for(i = 1; i < 4; i++){
			$('.p'+ i).removeClass("active");
		}
	};

	/*--------------- Click slider div event listener -----------------*/
	$('#projects').on("click", "div", _.throttle(slider.openSlider, 60));
	$('#projects').on("click", "#back-btn", _.throttle(slider.goBack, 60));

}());