rbvj = function () {

  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );

  var engine = new particleEngine(220, 30);
  var particles = engine.particles;

  engine.setSpeed(0, 0, -1, 2);
  engine.setAccel(0, 0, 0.01, 0.06);
  engine.setDir(1, -1);
  frameRate = 30;

  engine.edge = true;
  engine.border = true;
  engine.reset = true;

  var MAXSPEED = 20;

  ctx.fillStyle = rgb(255);
  ctx.background(0);

  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    p.on = false;
    if(chance(50)) p.on = true;
  }


  draw = function (){

    ctx.background(0, 0.1);
    ctx.fillStyle = colours.get(colour_count);
    //var c = ctx.getCurrentFillValues();
    //engine.update();
    for (var i = 0; i < particles.length; i++) {

      var p = particles[i];
      //p.speed.y > MAXSPEED ?  p.speed.y += 0.1 : null;

      moveParticle(p);
      drawParticle(p)
    }

  }


  function moveParticle(p){
    p.accel.y +=0.1;
    p.speed.y = Sound.mapSound(p.me + randomInt(10), particles.length, 0, 70)/ (190 - p.accel.y);
    p.pos.y -= (p.speed.y);
    //p.accel.y < 1.5 ? p.accel.y +=0.1 :  1.5;

    //p.speed.y += Sound.mapSound(p.me, particles.length * 2, 0, 100)/200;

    if (p.pos.y < 0) {
      p.pos.y = h;
      p.speed.y = random(-2, 4);
      p.accel.y = 0;
    }
    //p.me == 10 ? console.log(p.accel.y) : null;
  }

  function drawParticle(p){
    if (p.on){
      ctx.fillStyle = colours.get(5);
    } else {
      ctx.fillStyle = rgb(255);
    }

    ctx.fillRect(p.pos.x, p.pos.y, 4, 4);
  }


}();
