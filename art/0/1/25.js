rbvj = function () {


  var particles = [];
  var radius = 220;
  var c = 0;

  //ctx.translate(0.5, 0.5);
  var grid_w = w/40;
  var grid_h = h/40;
  var grid = makeGrid(grid_w, grid_h);
  var num_particles = grid_w * grid_h;
  var spacing_x = w/grid_w;
  var spacing_y = h/grid_h;
  //console.log(grid);
  for (var i = 0; i < num_particles; i++) {
  	//waves[i] = new Wave(num_particles, grid[i][0]*spacing_x+spacing_x/2,grid[i][1]*spacing_y + spacing_y/2);
      // var cc = rgba(random(25),random(255),0, 0.5);
      var m = map(i, 0, num_particles, 0, 360);
      //var cc = hsl(m, 96, 60);
      var cc = rgba(i%255, 20, 60, 1);
      //var cc = rgb(0);
  	addParticle(grid[i][0]*spacing_x, grid[i][1]*spacing_y, cc, i);

  }


  draw = function(){

  	ctx.clearRect(0, 0, w, h);
  	moveParticles();
  	ctx.fillStyle = rgba(0,0,0,1);
  	//ctx.HfillEllipse(w/2, h/2, radius-8, radius-8);

  }


  function addParticle(_x, _y, _colour, _me){
  	var particle = {
  		x: _x,
  		y: _y,
  		xx: w/2,
  		yy: h/2,
  		c: _colour,
  		me: _me,
  		r: 0,
  		r2: 0,
  		me2: (_me + randomInt(-30,30))%num_particles,
  		speedx: random(-2,2)/2,
  		speedy: random(2,20),
  		sz: 0,
  		angle: radians((2.2*_me)%360)
  	}

  	particles.push(particle);
  }

  function moveParticles(){
  	for (var i = 0; i < particles.length; i++) {
  		p = particles[i];


  		p.sz =  Sound.mapSound(p.me+randomInt(-2,2)%200, 400, 2, 50);
      ctx.fillStyle = rgb( colours[colour_count] );

  		//ctx.fillStyle = p.c;
  		ctx.fillEllipse(p.x, p.y, p.sz, p.sz);

  		};

  }

}();
