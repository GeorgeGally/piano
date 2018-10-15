rbvj = function () {

  ctx.strokeStyle = rgba(0,0,0,0.8);
  ctx.lineWidth = 2;
  var particles = [];
  var radius = 180;
  var c = 0;
  var num_particles = 100;

  for (var i = 0; i < num_particles; i++) {
      	var cc = rgba(random(25),random(255),0, 0.5);
  		addParticle(random(55), random(55), cc, i);
  }


  draw = function(){

  	ctx.fillStyle = rgba(0,1);
  	ctx.fillRect(0, 0, w, h);
  	// ctx.fillStyle = rgba(0,1);
  	// ctx.LfillEllipse(w/2, h/2, 4 + radius*4, 4 + radius*4);
  	moveParticles();
  }



  function addParticle(_x, _y, _colour, _me){
  	var particle = {
  		x: 0,
  		y: 0,
  		c: _colour,
  		me: _me,
  		speedx: 1,
  		speedy: 1,
  		sz: 40,
  		angle: radians(_me * 360/num_particles)
  	}

  	particles.push(particle);
  }

  function moveParticles(){
    ctx.fillStyle = colours.get(colour_count);
    ctx.strokeStyle = colours.get(colour_count);

  	for (var i = 0; i < particles.length; i++) {
  		p = particles[i];
  		var me = (p.me)%256;
  		p.angle += radians(p.speedx);
  		radius = tween(radius, Sound.mapSound(me, 1000, 0, 20), 18);
  		var r = radius;
  		p.sz = tween(p.sz, Sound.mapSound(me, 1000, 100, w/2), 10);

  		p.x = w/2 + (p.sz/2+r) * Math.cos(p.angle);
  		p.y = h/2 + (p.sz/2+r) * Math.sin(p.angle);

  		//ctx.fillStyle = rgba(255,1);
  		ctx.fillEllipse(p.x, p.y, p.sz/50, p.sz/50);
  		//ctx.strokeStyle = rgba(255,1);
  		ctx.line(w/2, h/2, p.x,p.y);

  		};

  }
}();
