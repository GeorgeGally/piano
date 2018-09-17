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
        var s = Sound.mapSound(p.me % 100, 200 , 1, 100);
        ctx.fillStyle = rgb( colours[colour_count] );
  			ctx.fillRect(p.x, p.y, s/4, spacing_y/1-2);



  		};

  	}

  this.setup();

  }


  // SETUP WAVES CLASS

  var waves = [];
  var grid_w = 30;
  var grid_h = 80;
  var num_waves = grid_w * grid_h;
  var spacing_x = w/grid_w;
  var spacing_y = h/grid_h;

  var grid = makeGrid(grid_w, grid_h);
  var num_particles = 1;

  for (var i = 0; i < num_waves; i++) {
  	waves[i] = new Wave(num_particles, grid[i][0]*spacing_x,grid[i][1]*spacing_y + spacing_y/2, i*num_particles);

  };



  // DRAW WAVES CLASS

  draw = function(){

  	ctx.background(0);

  	for (var i = 0; i < num_waves; i++) {
  		waves[i].draw();

  	};

  }


}();
