var division = 1/5;
var particles = [];
var nmbParticles = 10;

function setup(){
	var width = windowWidth*division;
	var canvas = createCanvas(width,width);
	var bgColor = color(31,31,31);

	canvas.parent('sketch-holder');
	background(bgColor);
	// var i = 0;
	// for(i = 0; i < nmbParticles; i++){

	// }
}

function windowResized() {
  var width = windowWidth*division;
  resizeCanvas(width, width);
  background(bgColor);
}

function draw(){
	square(50,50,10,10);
}