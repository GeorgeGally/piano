rbvj = function () {

  ctx.background( 0 );

  var engine = new particleEngine(3);
  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    p.size = random(20,60);
    p.angle = radians(random(360));
    if (i>0) p.parent = engine.particles[i-1];
  }

  draw = function() {

    //ctx.background(250, 0.005);
    ctx3.clearRect(0,0,w,h);

      update();

        for (var i = 0; i < engine.particles.length; i++) {
            var p = engine.particles[i];
            drawArm(p);
                ctx3.fillStyle = rgba(255, 0.5);

            ctx3.fillEllipse(p.pos.x, p.pos.y, 5, 5);

            if (i==engine.particles.length-1) {
              ctx.fillStyle = rgba(240,0,0, 0.7);
              ctx.fillEllipse(p.pos.x, p.pos.y, 3, 3);
            }

    }

  //mirror();

  }

  function drawArm(p){
    ctx.strokeStyle = rgba(255,0.1);
    ctx.line(p.pos.x, p.pos.y, p.end.x, p.end.y);


  }


  function update() {
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];

      p.acceleration.x += p.speed.x/100;
      p.angle = Math.sin(p.acceleration.x)* 1.2;
    if (i>0) {
      p.pos = engine.getEnd(p.parent)
    } else {
      p.pos.x = w/2 + Math.cos(frameCount/100) * 200;
      p.pos.y = h/2 + Math.sin(frameCount/200) * 200;
    }

    p.end = engine.getEnd(p);


    }

  }

}();
