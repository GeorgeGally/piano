rbvj = function(){

  var grid = new particleEngine( 1, 1 );
  var engine = new particleEngine( 1, 2 );
  var hit_dist = 345;
  ctx.lineWidth = 0.2;
  var dir = 1;
  var radius = 200;
  var color1 = '#67aeda';
  ctx.strokeMe( 255 );

  var colours = new colourPool()
      //
      .add('#ECECEC')
      .add('#CCCCCC')
      // .add('#333333')
      .add('#0095a8')
      .add('#00616f')
      .add('#FF3300')
      .add('#FF6600')
      .add('#FFFFFF')
      .add('#FFFF00')
      .add('#FF00FF')
      ;

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
    g.speed = new Vector(random(1,8), random(1,8));
    g.dir = -1;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 4;
    p.speed.x = 4;
    p.sz = random(10, 200);
    p.sw = 8;
    // p.c = randomGrey(0, 225, 0.1 );
    p.c = rgba(randomInt(100, 255), randomInt(55), 0, 0.5 );
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.x = posNeg();
    p.dir.y = posNeg();
    p.direction = 1;
    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }



  draw = function () {

    ctx.background( 0 );
    if( Sound.getVol() > 60 && frameCount%4 == 0) {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT(spectrum);
    var note = getNoteNumberFromFFT(spectrum);
    //console.log(freq);
    //console.log(colours.pool.length-1);
    var c = Math.round(map(note, 0, 100, 0, colours.pool.length));
    //console.log(c);
    var col = colours.get(c);
    //ctx.strokeMe( colours.get(c) );
    engine.add();
    engine.last.sz = 10;
    engine.last.c = col;
    engine.last.direction = dir;
    }
    moveParticles();
    drawParticles();
    if (chance(200)) dir *=-1;

  }

  function drawParticles(){
    for (var i = 0; i < engine.length; i++) {
      var g = engine.particles[i];
      // ctx.fillMe( g.c );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      // ctx.fillMe( 0 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.strokeMe( g.c );

      // if (g.direction == -1) {
      var f = (frameCount/150);
      var x = w/2 + Math.cos(g.direction * f) * w/1.5;
      var y = h/2 + Math.sin(g.direction * f) * w/4;
      //var y = h/2;
      ctx.lineWidth = 2;
      //ctx.strokeCircle(x, y, g.sz, g.sz);
      ctx.centreStrokeRect(x, y, g.sz, g.sz);


    }

  }




  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      var sz = Sound.mapSound( i, engine.length * 2, 0, 15);
      // p.sz = tween(p.sz, p.sz + sz, 4);
      p.sz += 5;
      if (p.sz > w * 2.5) engine.delete(p.me);

    }

  }


}();
