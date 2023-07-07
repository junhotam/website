// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

function setup() {
    var canvas = createCanvas(1200, 200);
    canvas.parent('visualization-canvas');
    background(51);
  
    var inc = 0.1;
    var scl = 10;
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    var particles = [];
    var flowfield = new Array(cols * rows);
    var zoff = 0;
  
    for (var i = 0; i < 300; i++) {
      particles[i] = new Particle();
    }
  
    function draw() {
      var yoff = 0;
      for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
          var index = x + y * cols;
          var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
          var v = p5.Vector.fromAngle(angle);
          v.setMag(1);
          flowfield[index] = v;
          xoff += inc;
          stroke(0, 50);
        }
        yoff += inc;
        zoff += 0.0003;
      }
  
      for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
      }
    }
  
    function Particle() {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxspeed = 2;
      this.prevPos = this.pos.copy();
  
      this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
      };
  
      this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
      };
  
      this.applyForce = function(force) {
        this.acc.add(force);
      };
  
      this.show = function() {
        stroke(0, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
      };
  
      this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
      };
  
      this.edges = function() {
        if (this.pos.x > width) {
          this.pos.x = 0;
          this.updatePrev();
        }
        if (this.pos.x < 0) {
          this.pos.x = width;
          this.updatePrev();
        }
        if (this.pos.y > height) {
          this.pos.y = 0;
          this.updatePrev();
        }
        if (this.pos.y < 0) {
          this.pos.y = height;
          this.updatePrev();
        }
      };
    }
  
    draw();
  }
  
  // Call the setup function once the DOM content is loaded
  window.addEventListener('DOMContentLoaded', (event) => {
    setup();
  });