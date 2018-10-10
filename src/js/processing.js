var division = 1/5;
var particles = [];
var nmbParticles = 50;
var width = 0;
var inc = 0.1;
var scl = 10;

var zoff = 0;

var flowfield;

function setup(){
	background(255,255,255);
	width = round(windowWidth*division);
	var canvas = createCanvas(width,width);
	canvas.parent('sketch-holder');
	// pixelDensity(1);
	for(var p = 0; p < nmbParticles; p++){
		particles[p] = new Particle();
	}
	var cols = floor(width/scl) + 1;
	flowfield = new Array(cols, cols);
}

function windowResized() {
  width = round(windowWidth*division);
  resizeCanvas(width, width);
  // pixelDensity(1);
}

function draw(){
	background(255, 255, 255, 20);
	var cols = floor(width/scl) + 1;
	var yoff = 0;
	for(var y = 0; y < cols; y++){
		var xoff = 0;
		for(var x = 0; x < cols; x++){
			var index = x + y * cols;
			// noiseDetail(8, 0.5);
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			xoff += inc;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(0.1);
			flowfield[index] = v;
			// stroke(255);
			// push();
			// translate(x*scl,y*scl);
			// rotate(v.heading());
			// strokeWeight(1);
			// line(0,0,scl,0);
			
			// pop();
			// rect(x*scl,y*scl,scl,scl);
		}
		yoff += inc;

		zoff += 0.001;
	}

	for(var p = 0; p < nmbParticles; p++){
		particles[p].follow(flowfield, cols, scl);
		particles[p].update();
		particles[p].show();
		particles[p].edges();
	}
}