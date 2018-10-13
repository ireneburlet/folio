var division = 1/5; //for the width of the canvas
var particles = [];
var nmbParticles = 50;
var width = 0;
var height = 0;
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
	background(255,255,255);
	if( windowWidth < 600 ) {
 		width = windowWidth;
 		height = windowHeight;
	}else{
		width = round(windowWidth*division);
		height = width;
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
  	if( windowWidth < 600 ) {
 		width = windowWidth;
	}else{
		width = round(windowWidth*division);
	}
	height = windowHeight;
  	resizeCanvas(width, height);
}

function draw(){
	background(255, 255, 255, 25);
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

	if(windowWidth > 600){
		distance = dist(mouseX, mouseY, width/2, height/2);
		if(distance < width/2){
			mouse = createVector(mouseX, mouseY);
		}
	}
	else{
		if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
			mouse = createVector(mouseX, mouseY);
		}
	}

	for(var p = 0; p < nmbParticles; p++){
		if(windowWidth > 600){
			if(distance < width/2){
				particles[p].attracted(mouse);
			}
			else{
				particles[p].follow(flowfield, cols, scl);
			}
		}
		else{
			if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
				particles[p].attracted(mouse);
			}
			else{
				particles[p].follow(flowfield, cols, scl);
			}
		}
		particles[p].update();
		particles[p].show();
		particles[p].edges();
	}
}