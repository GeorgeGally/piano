rbvj = function () {

  ctx.fillStyle = rgb(255);
  ctx.lineWidth = 2;

  var Wave = function(_num_particles, _x, _y, _me) {

  	ctx.strokeStyle = rgba(0,0,0,0.8);
  	var particles = [];
  	var radius = 50;
  	var rot = 0;
  	var num_particles = _num_particles;
  	var x = _x;
  	var y = _y;
  	var me = _me;

  	this.setup = function(){
  		for (var i = 0; i < num_particles; i++) {
  			// var c = random(225);
  			var c = 255;
  		    var cc = rgba(c, c, c, 1);
  			this.addParticle(x, y, cc, me);
  		}
  	}

  	this.draw = function(){
  		this.moveParticles();
  	}

  	this.addParticle = function(_x, _y, _colour, _me){
  		var particle = {
  			x: _x,
  			y: _y,
  			c: _colour,
  			me: _me,
  			stroke_width: 4,
  			speedx: 0,
  			speedy: random(2,20),
  			sz: radius+ _me*26,
  			angle: 0
  		}
  		particles.push(particle);
  	}


  	this.moveParticles = function(){
      ctx.fillStyle = rgb(255);
      ctx.strokeStyle = rgb(255);
      //var c = ctx.getCurrentFillValues();
  		for (var i = 0; i < particles.length; i++) {

  			p = particles[i];

  			//DISTRIBUTED MAPPED SOUND VALUE
  			var s = Sound.mapSound(num_waves - p.me, num_waves*2, 0, 100);
  			p.sz = tween(p.sz, map(s, 0, 255, 10, 36), 10);
        p.speedx = tween(p.speedx, map(s, 0, 100, 0, 15), 30);
  			var arc =  p.speedx * Math.PI;
  			p.angle += p.speedx/50;
  			// if (p.angle > 180) p.angle = 180;
  			// if (p.angle < 0) p.angle = 0;

  			// DRAW ARCS
  			ctx.translate(p.x, p.y);
  			ctx.rotate(radians(p.angle+180));
  			//ctx.strokeStyle = p.c;

  			// ctx.beginPath();
  			// ctx.arc(0, 0, p.sz/2, -arc/2, arc/2);
  			// ctx.stroke();
  			ctx.line(-120, 0, 120, 0);
  			ctx.line(0, -120, 0, 120);
  			ctx.rotate(radians(-p.angle-180));
  			ctx.translate(-p.x, -p.y);
        ctx.fillStyle = rgb(255);
  			ctx.fillEllipse(p.x, p.y, p.sz, p.sz);
        ctx.fillStyle = rgb(0);
        ctx.fillEllipse(p.x, p.y, 8, 8);
  		};

  	}

  this.setup();

  }


  // SETUP WAVES CLASS

  var waves = [];
  var grid_w = 20;
  var grid_h = 10;
  var num_waves = grid_w * grid_h;
  var spacing_x = w/grid_w;
  var spacing_y = h/grid_h;
  console.log(spacing_x)
  console.log(spacing_y)
  var grid = makeGrid(grid_w, grid_h);
  var num_particles = 1;

  for (var i = 0; i < num_waves; i++) {
  	waves[i] = new Wave(num_particles, grid[i][0]*spacing_x+spacing_x/2,grid[i][1]*spacing_y + spacing_y/2, i);
  };



  // DRAW WAVES CLASS

  draw = function(){
  	ctx.background(0, 0.08);
  	for (var i = 0; i < num_waves; i++) {
  		waves[i].draw();
  	};
  }

}();
