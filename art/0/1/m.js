rbvj = function () {

  ctx.background( 0 );
  ctx2.clearRect(0,0,w,h);
  ctx.lineWidth = 0.2;
  var radius = 280;
  var flies = [];
  var balls = new particleEngine( 130, 10 );


  for ( var i = 0; i < balls.particles.length; i++ ) {
    b = balls.particles[ i ];
    b.pos.x = b.x = random( 55 );
    b.pos.y = b.y = random( 55 );
    b.speed.x = random( 0.1, 2 );
    b.speed.y = random( 2, 20 );
    b.angle = radians( i * 360 / balls.particles.length );
    c = randomInt( 100, 255 );
    b.c = rgba( c, c, c, random( 0.1, 0.8 ) );
    b.sz = 20;

    flies[ i ] = new particleEngine( 10 );
    for ( var j = 0; j < flies[ i ].particles.length; j++ ) {
      p = flies[ i ].particles[ j ];
      p.pos.x = w / 2;
      p.pos.y = h / 2;
      p.me = ( p.me + randomInt( 100 ) ) % 80;
      c = randomInt( 100, 255 );
      p.c = rgba( c, c, c, random( 0.1, 0.8 ) );
      p.a = random( 1 );
    }
  }


  draw = function () {

    ctx.fillStyle = rgba( 0, 0.15 );
    ctx.fillRect( 0, 0, w, h );

    ctx.fillStyle = colours.get( 0 );
    var c = ctx.getCurrentFillValues();

    for ( var i = 0; i < balls.particles.length; i++ ) {

      b = balls.particles[ i ];

      b.sz = Sound.mapSound( b.me % 80, 160, 1, 16 );
      // b.angle += radians(map(audioChannelVolume[b.me%20], 0, 100, -2, 1));
      b.angle += radians( Sound.mapSound( b.me % 20, 40, -2, 1 ) );
      b.x = w / 2 + ( b.sz / 2 + radius ) * Math.cos( b.angle / 3 );
      b.y = h / 2 + +( b.sz / 2 + radius ) * Math.sin( b.angle / 3 );


      //b.sz = 5;
      ctx.fillStyle = b.c;

      for ( var j = 0; j < flies[ i ].particles.length; j++ ) {

        var mouse = new Vector( b.x + b.sz / 2, b.y + b.sz / 2 );
        p = flies[ i ].particles[ j ];
        mouse = mouse.sub( p.pos );
        mouse.setMag( 0.9 );
        //console.log(mouse)
        acceleration = mouse;
        p.speed = p.speed.add( acceleration );
        p.position = p.pos.add( p.speed );
        p.speed.limit( 13 );
        //p.sz = 2;
        // p.sz =  map(audioChannelVolume[p.me%80], 0, 120, 0.2, 3);
        p.sz = Sound.mapSound( p.me % 180, 320, 0.1, 1.5 );
        //ctx.strokeStyle = p.c;
        ctx.fillStyle = rgba( c.r, c.g, c.b, p.a );

        ctx.fillRect( p.pos.x, p.pos.y, p.sz, p.sz );


      }

    }


  }

}();
