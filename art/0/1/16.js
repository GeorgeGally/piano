rbvj = function () {


  var Wave = function(_num_particles, _x, _y, _me) {


  	//ctx.strokeStyle = rgba(c.r, c.g, c.b, a);
  	var particles = [];
  	var radius = 50;
  	var rot = 0;
  	var num_particles = _num_particles;
  	var x = _x;
  	var y = _y;
  	var me = _me;

  	this.setup = function(){
  		for (var i = 0; i < num_particles; i++) {
  			var a = random(225);
  			//var c = 0;
        // var c = getCurrentFillValues();
  		  // var cc = rgba(c.r, c.g, c.b, a);
  			this.addParticle(x, y, me);
  		}
  	}

  	this.draw = function(){
  		this.moveParticles();
  	}

  	this.addParticle = function(_x, _y, _me){
  		var particle = {
  			x: _x,
  			y: _y,
  			me: _me,
  			stroke_width: 4,
  			speedx: 0,
  			speedy: random(2,20),
  			sz: radius+ _me*26,
  			angle: 0,
        a: random(1)
  		}
  		particles.push(particle);
  	}


  	this.moveParticles = function(){
      ctx.fillStyle = rgb( colours[colour_count] );
      var c = ctx.getCurrentFillValues();
  		for (var i = 0; i < particles.length; i++) {

  			p = particles[i];

  			//DISTRIBUTED MAPPED SOUND VALUE
  			var s = Sound.mapSound(p.me, num_waves);
  			p.speedx = tween(p.speedx, map(s, 0, 255, 0, 360)-180, 20);
  			var arc =  p.speedx * Math.PI;
  			p.angle += p.speedx/50;
  			// if (p.angle > 180) p.angle = 180;
  			// if (p.angle < 0) p.angle = 0;

  			// DRAW ARCS
  			ctx.translate(w/2, h/2);
  			ctx.rotate(radians(p.angle+180));
  			ctx.strokeStyle = rgba(c.r, c.g, c.b, p.a);
  			//ctx.lineWidth = p.stroke_width;
  			ctx.lineWidth = s/10;
  			//ctx.lineWidth = 1;
  			// ctx.beginPath();
  			// ctx.arc(0, 0, p.sz/2, -arc/2, arc/2);
  			// ctx.stroke();
  			ctx.line(-s, 0, s, 0);
  			ctx.line(0, -s, 0, s);
  			ctx.rotate(radians(-p.angle-180));
  			ctx.translate(-w/2, -h/2);
  			//ctx.fillEllipse(p.x, p.y, 16, 16);
  		};

  	}

  this.setup();

  }


  // SETUP WAVES CLASS

  var waves = [];
  var grid_w = 10;
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

  draw = function (){
  	ctx.background(0);
  	for (var i = 0; i < num_waves; i++) {
  		waves[i].draw();
  	};
  }


}();
