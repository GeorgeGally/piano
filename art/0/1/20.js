rbvj = function () {


  var engine = new particleEngine(300, 10);
  var particles = engine.particles;

  engine.setSpeed(0, 0, -1, 15);
  engine.setAccel(0, 0, 0.05, 0.2);
  engine.setDir(1, -1);


  engine.edge = true;
  engine.border = true;
  engine.reset = true;

  var MAXSPEED = 20;

  ctx.fillStyle = rgb(255);
  ctx.background(0);



  draw = function (){

    ctx.background(0, 0.1);
    engine.update();
    for (var i = 0; i < particles.length; i++) {

      var p = particles[i];
      //p.speed.y > MAXSPEED ?  p.speed.y += 0.1 : null;
      //p.accel.y < 1 ? p.accel.y +=0.01 :  1;
      moveParticle(p);
      drawParticle(p)
    }

  }


  function moveParticle(p){
    // p.pos.x += (p.speed.x * p.accel.x);
    // p.pos.y += (p.speed.y * p.accel.y);
    p.accel.y < 2 ? p.accel.y +=0.02 :  2;
    //p.speed.y > MAXSPEED ?
    p.speed.y += 0.3;
    //p.me == 10 ? console.log(p.accel.y) : null;
  }

  function drawParticle(p){
    ctx.fillRect(p.pos.x, p.pos.y, 4, 4);
  }


}();
