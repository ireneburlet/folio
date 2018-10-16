function Particle(width, height){
	this.pos = createVector(random(width),random(height));
	this.vel = createVector(0,0);
	//this.vel = p5.Vector.random2D();
	this.acc = createVector(0,0);
	this.maxSpeed = 2;

	this.colors = color(171, 0, 0);

	this.prevPos = this.pos.copy();

	this.follow = function(vectors, cols, scl) {
		var x = floor(this.pos.x/scl);
		var y = floor(this.pos.y/scl);
		var index = x + y * cols;
		this.applyForce(vectors[index]);
	};

	this.attracted = function(target) {
		var force = p5.Vector.sub(target, this.pos);
		var dsquared = force.magSq();
		dsquared = constrain(dsquared, 25, 500);
		var G = 30;
		var strengh = G/dsquared;
		force.setMag(strengh);
		this.applyForce(force);
	};

	this.applyForce = function(force) {
		this.acc.add(force);
	};

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