rbvj = function () {

  var particles = [];
  var dir = -1;
  var FOV = dir * -200;

  function addParticle(){
    var particle = {
      x: random(-100,100),
      y: random(-100,100),
      z: dir * 150,
      x3d: 0,
      y3d: 0,
      speed_z: dir * 1,
      scale: 1,
      colour: randomColour(),
    }
    particles.push(particle);
  }

  draw = function (){
  	if(chance(1100)) dir *=-1;
    //if(frameCount%10 == 0) ctx.background(0, 0.05);
  	ctx.background(0);
    addParticle();
  	//addParticle();
    moveParticles();
    drawParticles();
  }


  function moveParticles(){

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.z -= p.speed_z;
      p.scale = FOV/(p.z+FOV);
      p.x3d = p.x * p.scale;
      p.y3d = p.y * p.scale;

      if (dir == -1 && p.z > FOV || dir == 1 && p.z < -FOV) {
        particles.splice(i,1);
      }
    }

  }


  function drawParticles(){
    ctx.save();
  	var ww = w/2 + Math.sin(frameCount/120) * w/4
    ctx.translate(ww, h/2);
  	ctx.rotate(radians( frameCount/5));
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.fillStyle = p.colour;
  		var s = Sound.mapSound(i, particles.length * 2, 0.01, 1.2);
  		//p.speed_z = s;
  		var sz = s + Math.abs(p.scale * 1.8);
  		//if (sz> 30) sz = 30;
      ctx.fillCircle(p.x3d, p.y3d, sz, sz);
    }
    ctx.restore();
  }



}();
