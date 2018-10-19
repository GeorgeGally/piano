rbvj = function () {

  ctx.background( 0 );

  var circs = [];
  var r = width / 8;
  var j = 0;

  for ( var _y = 10; _y < h - 10; _y += 10 ) {

    for ( var _x = 10; _x < w - 10; _x += r ) {
      var x = _x;
      var lw = random( 12 );
      var c = rgb(255);
      if (chance(3)) c = rgb(0);

      var circle = {
        r: r - 10,
        me: j,
        x: x,
        c: c,
        vol: 0,
        dir: posNeg(),
        y: _y,
        lw: lw
      }
      circs.push( circle );
    }

    j++;
    //console.log(j)
  }

  draw = function () {

    ctx.background( 0 );


    for ( var i = 0; i < circs.length; i++ ) {
      // ctx.strokeStyle = colours.get(i%colours.pool.length);
      var p = circs[ i ];
       ctx.strokeStyle = p.c;
      var s = p.dir * Sound.mapSound( i, circs.length * 2, 0, 10 );
      p.vol = tween( p.vol, s, 10 );

      ctx.lineWidth = p.lw;
      if ( chance( 2000 ) ) p.dir *= -1;
      ctx.line( p.x, p.y + p.vol, p.x + r - 5, p.y - p.vol );


    }

  }

}();
