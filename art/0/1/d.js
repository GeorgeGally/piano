rbvj = function() {

  var engine = new particleEngine(22, 3);

    var dir = 1;
    var radius = 200;
    var color1 = '#67aeda';
    ctx.strokeMe(255);
    ctx.lineWidth = 1;
    ctx.background(0);
    var colours = new colourPool()
      //
      .add('#ECECEC')
      .add('#CCCCCC')
      //.add('#CCFFCC')
      // .add('#333333')
      .add('#0095a8')
      .add('#00616f')
      .add('#FF3300')
      .add('#FF6600')
      .add('#FFFFFF')
    // .add('#FFFF00')
    // .add('#FF00FF')
    ;

    for (var i = 0; i < engine.particles.length; i++) {
      p = engine.particles[i];
      p.speed.y = 1;
      p.speed.x = 1;
      p.sz = 2;
      p.sz2 = 2;
      //p.pos.x = -5;
      //p.pos.y = h + 5;
      p.old = new Vector(p.pos.x, p.pos.y)
      //p.old.x = p.pos.x;
      p.sw = 4;
      p.c = colours.get();
      //p.c = rgba(randomInt(100, 255), randomInt(55), 0, 0.5 );
      p.start_sz = 0;
      p.s = 2;
      p.direction = 1;
      if (i % 2 == 0) p.dir.y = 1;
    }



    draw = function () {

      ctx.background( 0 );
      ctx2.clearRect(0,0,w,h);
      // if( Sound.getVol() > 80 && frameCount%2 == 0) {
      //
      // //ctx.strokeMe( colours.get(c) );
      // // engine.add();
      // // engine.last.sz = 10;
      // // engine.last.sw = random(0.2, 3);
      // // engine.last.s = 2 * c + random(0.1, 8);
      // // engine.last.edge = c;
      // // engine.last.c = col;
      // // engine.last.direction = dir;
      // }
      moveParticles();
      drawParticles();
      if (chance(50)) dir *= -1;

    }




    function drawParticles() {
      for (var i = 0; i < engine.length; i++) {
        var p = engine.particles[i];
        // ctx.fillMe( p.c );

        ctx.fillMe( 220, 0, 0, 0.4 );
        ctx.fillCircle(p.pos.x, p.pos.y, p.sz2, p.sz2);

        ctx.fillMe( 220, 0, 0, 0.6 );
        ctx.fillCircle(p.pos.x, p.pos.y, p.sz, p.sz);



        ctx2.fillMe( 255 );
        ctx2.fillCircle(p.pos.x, p.pos.y, 5, 5);
        //ctx.fillCircle(x, y, 10, 10);


      }

    }



    function moveParticles() {

      var spectrum = Sound.spectrum
      var note = getNoteNumberFromFFT(spectrum);
      for (var i = 0; i < engine.particles.length; i++) {
      note = Math.floor(note);
      var p = engine.particles[i];
      ctx2.strokeMe(255, 0.3);
      ctx2.line(p.pos.x, 0, p.pos.x, h);
      var sz = Sound.mapSound(i, engine.length * 2, 1, 20);
      //p.pos.x += Sound.mapSound(i, engine.length * 2, 0, 2);;
      //p.pos.y -= Sound.mapSound(i, engine.length * 3, -2, 2);
      p.pos.y -= 1;
      p.sz = tween(p.sz, sz, 20);
      p.sz2 = tween(p.sz2, 0, 30);
      if (sz > 29) {
        p.sz2 = 180;
      }
      if (p.pos.x > w + 50) {
        p.pos.x = -50;
        p.old.x = -50;
        p.pos.y += random(-22, 22);
      }
      if (p.pos.y > h) {
        p.pos.y = 0;
      }

      if (p.pos.y < 0) {
        p.pos.y = h;
      }

      }

    }

    function getMyColour(i) {
      var spectrum = Sound.spectrum;
      // var freq = getNoteFromFFT(spectrum);
      var note = getNoteNumberFromFFT(spectrum);
      //var c = Math.round (Sound.mapSound( i, engine.length * 2, 0, 5));
      var c = Sound.mapSound(i, 0, engine.length * 2, 0, colours.pool.length - 1)
      //console.log(c);
      //console.log(colours.pool.length-1);
      //var c = Math.round(map(note, 0, 100, 0, colours.pool.length));
      //console.log(c);
      var col = colours.get(c);
      //ctx.fill(col)
      return col;
    }



}();
