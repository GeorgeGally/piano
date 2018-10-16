rbvj = function () {

  ctx.strokeStyle = rgba( 0, 0, 0, 0.8 );
  var num = 320;
  var particles = [];

  var time = 0;

  for ( var i = 0; i < num; i++ ) {
    particles[ i ] = new particleEngine( 5 );
    for ( var j = 0; j < particles[ i ].particles.length; j++ ) {
      var p = particles[ i ].particles[ j ];
      p.time = j;
    }
  }

  draw = function () {
    ctx.background( 0, 0.2 )
    ctx.save();
    ctx.translate( w / 2, h / 2 );

    for ( var i = 0; i < particles.length; i++ ) {
      ctx.rotate( radians( time ) );
      ctx.fillStyle = rgb(255);
      ctx.fillStyle = colours.get(colour_count);

      var x = Math.sin( frameCount / 100 ) * 50 + i;
      var y = Math.cos( frameCount / 100 ) * 50 + i;
      ctx.LfillEllipse( x, y, 10, 10 );
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
        p.time += 0.0001;
        ctx.rotate( radians( -total_rot ) );
      }
      time += 0.0001;
    }

    ctx.restore();
  }

}();
