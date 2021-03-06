rbvj = function () {

  ctx.background( 0 );
  ctx2.clearRect(0,0,w,h);
  
  ctx.strokeStyle = rgba( 0, 0, 0, 0.8 );
  var num = 320;
  var particles = [];

  var time = 0;

  for ( var i = 0; i < num; i++ ) {
    particles[ i ] = new particleEngine( 5, 1 );
    for ( var j = 0; j < particles[ i ].particles.length; j++ ) {
      var p = particles[ i ].particles[ j ];
      p.time = j;
      p.sz = 10;
    }
  }

  draw = function () {
    ctx.background( 0, 0.6 )
    ctx.save();
    ctx.translate( w / 2, h / 2 );

    for ( var i = 0; i < particles.length; i++ ) {
      ctx.rotate( radians( time ) );

      var g = particles[ i ];
      var x = Math.sin( frameCount / 100 ) * 50 + i;
      var y = Math.cos( frameCount / 100 ) * 50 + i;

      var sz = Sound.mapSound( i, particles.length * 2, 2, 12 );
      //ctx.fillStyle = colours.get( Sound.mapSound( i, particles.length * 2, 0, colours.pool.length - 1 ) );
      ctx.fillStyle = rgb(255);
      ctx.fillCircle( x, y, sz, sz );
      //ctx.HfillEllipse( 10+i*2, 0, i*1.3+1,i*1.3+1);
      //ctx.HstrokeEllipse( 10+i*2, 0, i*1.3+1,i*1.3+1);
      var total_rot = 0;
      for ( var j = 0; j < particles[ i ].particles.length; j++ ) {
        var p = particles[ i ].particles[ j ];
        ctx.translate( 10 + i, 0 );
        ctx.rotate( radians( p.time ) );
        total_rot += p.time;
        p.pos.x = Math.sin( ( j + frameCount ) / 100 ) * 150;
        p.pos.y = Math.cos( ( j + frameCount ) / 100 ) * 150;
        // ctx.fillStyle = "black";
        // ctx.fillRect( p.pos.x, p.pos.y, 2, 2 );
        ctx.translate( -1 * ( 10 + i ), 0 );
        p.time += 0.00002;
        ctx.rotate( radians( -total_rot ) );
      }
      time += 0.00001;
    }

    ctx.restore();
  }

}();
