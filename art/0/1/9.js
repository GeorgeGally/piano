rbvj = function () {


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
  			var c = random(225);
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
  			y: h-_y,
  			c: _colour,
  			me: _me,
  			stroke_width: random(0.1, 1),
  			speedx: 0,
  			speedy: random(2,20),
  			sz: radius+ _me*26,
  			dir: -1*_me%2
  		}
  		particles.push(particle);
  	}


  	this.moveParticles = function(){

  		for (var i = 0; i < particles.length ; i++) {

  			p = particles[i];

  			//DISTRIBUTED MAPPED SOUND VALUE

  			//var s = audioChannelVolume[10+p.me%83];
  			var s = Sound.mapSound(p.me, particles.length*num_waves * 2, 0, 50);

  			ctx.fillStyle = rgba(255);
  			ctx.fillEllipse(p.x-s/2, p.y, s/8, s/8);
  			// if (p.y < h/2) {
  			// 	ctx.line(p.x, p.y, p.x, spacing_y + p.y+s*2);

  			// } else {
  				//if (s>140)
  				//ctx.fillRect(p.x, p.y-spacing_y/2, spacing_y + s*1, spacing_y+1);
  					// ctx.line (p.x + s + 4, p.y, p.x + s + 4, p.y + spacing_y+1);
  					// ctx.line (p.x + s + 8, p.y, p.x + s + 8, p.y + spacing_y+1);
  					// ctx.line (p.x - s/1.2 - 4, p.y, p.x - s/1.2 - 4, p.y + spacing_y+1);
  					// ctx.line (p.x - s/1.2 - 8, p.y, p.x - s/1.2 - 8, p.y + spacing_y+1);
  				//ctx.shadowOffsetY = -s/20;
  			//}


  		};

  	}

  this.setup();

  }


  // SETUP WAVES CLASS

  var waves = [];
  var grid_w = 60;
  var grid_h = 40;
  var num_waves = grid_w * grid_h;
  var spacing_x = w/grid_w;
  var spacing_y = h/grid_h;
  console.log(spacing_x)
  console.log(spacing_y)
  var grid = makeGrid(grid_w, grid_h);
  var num_particles = 1;

  for (var i = 0; i < num_waves; i++) {
  	waves[i] = new Wave(num_particles, grid[i][0]*spacing_x,grid[i][1]*spacing_y + spacing_y/2, i*num_particles);

  			// if (i>0) ctx.line(waves[i].particles[i].x, waves[i].particles[i].y, waves[i].particles[i-1].x, waves[i]particles[i-1].y);
  };



  // DRAW WAVES CLASS

  draw = function(){
  	// ctx.fillStyle = rgb(0);
  	// ctx.fillRect(0, 0, w, h);
  	// ctx.fillStyle = rgb(255);
  	ctx.clearRect(0, 0, w, h);

  	//ctx.lineWidth = 0.5;
  	//ctx.line(w/2, 0, w/2, h);
  	for (var i = 0; i < num_waves; i++) {
  		waves[i].draw();


  		if (i>0) {
  		if (grid[i][0] > grid[i-1][0]) {
  		// ctx.line(grid[i][0]*spacing_x+spacing_x/2,grid[i][1]*spacing_y + spacing_y/2, grid[i-1][0]*spacing_x+spacing_x/2,grid[i-1][1]*spacing_y + spacing_y/2);
  		}
  		if (grid[i][1] > grid[i-1][1]) {
  		// ctx.line(grid[i][1]*spacing_x+spacing_x/2,grid[i][0]*spacing_y + spacing_y/2, grid[i-1][1]*spacing_x+spacing_x/2,grid[i-1][0]*spacing_y + spacing_y/2);
  		}
  	}
  	};
  	// for (var i = 0; i < grid.length; i++) {
  	// 	ctx.fillRect(grid[i][0]*spacing_x, grid[i][1]*spacing_y, 10,10);
  	// };
  }



}();
