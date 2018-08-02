rbvj = function(){

  var grid = new particleEngine(60, 30);
  var engine = new particleEngine(20, 2);
  var hit_dist = 50;

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 6;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    p.pos.y =  h;

    p.speed.x = 15;
    p.speed.y = random(2, 6);
    p.dir.x = 1;
    p.dir.y = -1;
    //console.log(p.speed.y);
  }

   draw = function() {
    ctx.background(0);
    ctx.fillStyle = "white";

    for (var i = 0; i < grid.length; i++) {

      var g = grid.particles[i];
    for (var j = 0; j < engine.length; j++) {
      var p = engine.particles[j];

        var d = Math.abs(getDist(g, p));
        if(d < hit_dist) {

          var target_sz = hit_dist - d + g.start_sz;
          if (g.sz < target_sz) g.sz = target_sz/3;
        }



      }
    }

    moveParticles();
    drawGrid();
    //drawParticles();

  }

  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      ctx.fillEllipse(g.pos.x, g.pos.y, g.sz, g.sz);
      if (g.sz > g.start_sz) g.sz = tween(g.start_sz, g.sz, 35);
      //g.sz-= 2;
    }
  }

  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      p.pos.x += p.speed.x * p.dir.x;
      p.pos.y += p.speed.y * p.dir.y;
      //console.log(p.speed.y);
      if (p.pos.y < 0) p.pos.y = h;
      if (p.pos.y > h) p.pos.y = 0;
      if (p.pos.x < 0) p.pos.x = w;
      if (p.pos.x > w) p.pos.x = 0;
    }
    //engine.update();
  }

  function drawParticles(){
    for (var j = 0; j < engine.length; j++) {
      var p = engine.particles[j];
      //ctx.fillStyle = "red";
      ctx.fillEllipse(p.pos.x, p.pos.y, 5, 5);
    }
  }




  function getDist(p, p2){
    return dist(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
  }

}();
