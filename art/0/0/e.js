rbvj = function() {

  ctx.background( 0 );
  colour_count = 3;
  colours = palettes [ colour_count ]
  var grid = new particleEngine( 60, 40 );
  var engine = new particleEngine( 2, 4 );
  var hit_dist = 55;
  ctx.lineWidth = 2;
  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 5;
    p.speed.x = random(1,5);
    p.dir.x = 1;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.y = -1;
    var c_num =  map(p.me, 0, engine.particles.length-1, 0, 7)
    p.c = colours.get(c_num);

    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }


  draw = function() {

    //ctx.background( 0, 0.2 );
    if(chance(20)) ctx.fillRect(0,0, w, h)
    ctx.fillStyle = rgb(0, 0.05);



    for (var i = 0; i < grid.length; i++) {

      var g = grid.particles[i];

      for (var j = 0; j < engine.length; j++) {
        var p = engine.particles[j];
        var c_num =  map(p.me, 0, engine.particles.length-1, 0, 7)
        p.c = colours.get(c_num);
        ctx.strokeStyle = p.c;
          var d = Math.abs(getDist(g, p));
          hit_dist = tween(hit_dist, Sound.mapSound(j, engine.length * 2, 0, 100), 10);
          if(d < hit_dist) {
            var target_sz = Sound.mapSound(i, grid.length * 2, 0, 4)
            //var target_sz = hit_dist;
            if (g.sz < target_sz) g.sz = 4;
            ctx.line( g.pos.x, g.pos.y, p.pos.x, p.pos.y );
          }
        }
    }

    getNoteSpeed();
    moveParticles();
    drawGrid();
    mirror();
  }

  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      ctx2.fillEllipse(g.pos.x, g.pos.y, g.sz, g.sz);
      if (g.sz > g.start_sz) g.sz = tween(g.start_sz, g.sz, 95);
      //g.sz-= 2;
    }
  }

  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];

      p.pos.x += ( p.speed.x * p.dir.x );
      p.pos.y += ( p.speed.y * p.dir.y );

      if (p.pos.y < 0) p.pos.y = h;
      if (p.pos.y > h) p.pos.y = 0;
      if (p.pos.x < 0) p.pos.x = w;
      if (p.pos.x > w) p.pos.x = 0;
    }

  }


  function getNoteSpeed(){
    var spectrum = Sound.spectrum;
      var freq = getNoteFromFFT(spectrum);
      var note = getNoteFreqPerc(spectrum);
      var note1 = (freq.substring(0, 1)).charCodeAt(0) - 65;
      //console.log(note1);

      for (var i = 0; i < engine.particles.length; i++) {
        if(i == note1) {
          p.speed.y = tween(p.speed.y, randomInt(2, 5), 20);
          p.dir.x*=-1;
          p.dir.y*=-1;
        } else {
          p.speed.y = tween(p.speed.y, 0, 20);
        }

      }

      num = Math.round(map(note1, 0, 7, 0, colours.pool.length));
      return colours.get(num);
  }

  function getDist(p, p2){
    return dist(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
  }


}();
