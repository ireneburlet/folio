var division = 1/5; //for the width of the canvas
var particles = [];
var nmbParticles = 50;
var width = 0;
var height = 0;
var responsiveWidth = 620;
//perlin noise
var inc = 0.1;
var scl = 10;
var zoff = 0;
var flowfield;
//attraction
var mouse;
var distance;

// set the canvas, the particles and the columns/rows
function setup(){
	if( windowWidth < responsiveWidth ) {
 		width = windowWidth;
 		height = windowHeight;
	}else{
		width = round(windowWidth*division);
		height = windowHeight;
	}
	var canvas = createCanvas(width,height);
	canvas.parent('sketch-holder');
	for(var p = 0; p < nmbParticles; p++){
		particles[p] = new Particle(width, height);
	}
	var cols = floor(width/scl) + 1;
	var rows = floor(width/scl) + 1;
	flowfield = new Array(cols, rows);
}

function windowResized() {
  	if( windowWidth < responsiveWidth ) {
 		width = windowWidth;
	}else{
		width = round(windowWidth*division);
	}
	height = windowHeight;
  	resizeCanvas(width, height);
}

function draw(){
	background(15, 15, 15, 30);
	var cols = floor(width/scl) + 1;
	var rows = floor(height/scl) + 1;
	var yoff = 0;
	for(var y = 0; y < rows; y++){
		var xoff = 0;
		for(var x = 0; x < cols; x++){
			var index = x + y * cols;
			// noiseDetail(8, 0.5);
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
			xoff += inc;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(0.1);
			flowfield[index] = v;
		}
		yoff += inc;

		zoff += 0.001;
	}

	if(windowWidth > responsiveWidth || mouseIsPressed){
		if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
			mouse = createVector(mouseX, mouseY);
		}
	}

	for(var p = 0; p < nmbParticles; p++){
		var mouseOnCanvas = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) ? true : false;
		if(windowWidth > responsiveWidth && mouseOnCanvas){
			particles[p].attracted(mouse);
		}
		else if(windowWidth < responsiveWidth && mouseIsPressed && mouseOnCanvas){
			particles[p].attracted(mouse);
		}
		else{
			particles[p].follow(flowfield, cols, scl);
		}
		particles[p].update();
		particles[p].show();
		particles[p].edges();
	}
}