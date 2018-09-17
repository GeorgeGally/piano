rbvj = function () {

  var numParticles = 85;
  var engine = new particleEngine( 200, 1 );

  for ( let p of engine.particles ) {
    p.dir = posNeg();
    var c = ctx.getCurrentFillValues();
    p.c = rgb(c.r, c.g, c.b, random(1));
    p.a = random(1);
  }


  draw = function () {

    ctx.background( 0, 0.2 );
    ctx.fillStyle = rgb( colours[colour_count] );
    for ( let p of engine.particles ) {

      var s = Sound.mapSound( p.me, engine.particles.length * 2, 0, w / 2 );
      var s2 = Sound.mapSound( p.me, engine.particles.length * 2, 0, 8 );
      ctx.lineWidth = s2;
      var x = p.pos.x + Math.sin( frameCount / 10 ) * w;
      var c = ctx.getCurrentFillValues();
      ctx.strokeStyle = rgb(c.r, c.g, c.b, p.a);
      ctx.line( p.pos.x + s * p.dir, 0, p.pos.x + s * p.dir, h );

    }


  }

}();
