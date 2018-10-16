rbvj = function () {

  let numParticles = 85;
  let engine = new particleEngine( 200, 16 );

  for ( let p of engine.particles ) {
    p.dir = posNeg();
    p.counter = 0;
  }


  draw = function () {

    ctx.background( 0, 0.2 );
    if (Sound.getHighsVol() > 80 && frameCount%20 == 0) reset();
    //console.log(Sound.getHighsVol());
    for ( let p of engine.particles ) {

      let s = Sound.mapSound( p.me, engine.particles.length * 2, 0, w / 2 );
      let s2 = Sound.mapSound( p.me, engine.particles.length * 2, 0, 8 );
      ctx.lineWidth = s2;
      p.counter = Math.round(p.counter + s) % colours.pool.length;
      p.c = colours.get(p.counter);
      p.pos.x += s;
      //p.c = colours.get( p.c )
      if(p.pos.x > w) p.pos.x = 0;
      let x = p.pos.x + Math.sin( frameCount / 10 ) * w;
      ctx.strokeStyle = p.c;
      ctx.line( p.pos.x, p.pos.y - engine.grid.spacing.y /2, p.pos.x, p.pos.y + engine.grid.spacing.y /2 );

    }


  }

  function reset() {
    console.log("reset");
    gy = randomInt(2, 60);
    engine = new particleEngine(200, gy);
    for ( let p of engine.particles ) {
      p.dir = posNeg();
      p.counter = 0;
    }
  }

}();
