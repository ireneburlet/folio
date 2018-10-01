var division = 1/5;
var particles = [];
var nmbParticles = 10;
var width = 0;
var inc = 0.1;
var scl = 10;

var zoff = 0;

function setup(){
	width = round(windowWidth*division);
	var canvas = createCanvas(width,width);
	canvas.parent('sketch-holder');
	// pixelDensity(1);
	for(var p = 0; p < nmbParticles; p++){
		particles[p] = new Particle();
	}
}

function windowResized() {
  width = round(windowWidth*division);
  resizeCanvas(width, width);
  // pixelDensity(1);
}

function draw(){
	background(25);
	var cols = floor(width/scl);
	var yoff = 0;
	for(var y = 0; y < cols+1; y++){
		var xoff = 0;
		for(var x = 0; x < cols+1; x++){
			var index = (x + y*width)*4;
			var angle = noise(xoff, yoff, zoff) * TWO_PI;
			xoff += inc;
			var v = p5.Vector.fromAngle(angle);
			stroke(255);
			push();
			translate(x*scl,y*scl);
			rotate(v.heading());
			line(0,0,scl,0);
			pop();
			// rect(x*scl,y*scl,scl,scl);
		}
		yoff += inc;

		zoff += 0.001;
	}

	for(var p = 0; p < nmbParticles; p++){
		particles[p].update();
		particles[p].show();
		particles[p].edges();
	}
}