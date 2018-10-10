function Particle(){
	this.pos = createVector(random(200),random(200));
	this.vel = createVector(0,0);
	//this.vel = p5.Vector.random2D();
	this.acc = createVector(0,0);
	this.maxSpeed = 1.5;

	this.colors = color(255, 0, 0);

	this.prevPos = this.pos.copy();

	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	this.updatePrevious = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	};

	this.applyForce = function(force) {
		this.acc.add(force);
	};

	this.follow = function(vectors, cols, scl) {
		var x = floor(this.pos.x/scl);
		var y = floor(this.pos.y/scl);
		var index = x + y * cols;
		this.applyForce(vectors[index]);
	};

	this.show = function() {
		stroke(this.colors);
		strokeWeight(2);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		//point(this.pos.x, this.pos.y);
		this.updatePrevious();
	};

	this.edges = function() {
		if(this.pos.x > width){this.pos.x = 0;this.updatePrevious();}
		if(this.pos.x < 0){this.pos.x = width;this.updatePrevious();}
		if(this.pos.y > height){this.pos.y = 0;this.updatePrevious();}
		if(this.pos.y < 0){this.pos.y = height;this.updatePrevious();}
	};
}