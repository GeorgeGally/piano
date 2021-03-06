rbvj = function () {

  ctx.strokeStyle = rgba( 0);
  ctx.lineWidth = 3;

  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );

  var num_blocks = 90;
  var time = 50;
  var counter = 0;

  draw = function () {
    ctx.background( 0, 0.2 );

    var c = ctx.getCurrentFillValues();
    ctx.strokeStyle = rgb( 0 );
    ctx.fillStyle = rgb( 255 );
    ctx.save();
    ctx.translate( w / 2, h / 2 );

    for ( var i = 0; i < num_blocks; i++ ) {
      ctx.rotate( radians( time ) );
      // var s = Sound.getHighsVol(-5, 15);
      //var s = 1 + Sound.mapSound( i, 50, 0, 10 ) / 5;
      var sz = ( i * 1.5 + 10 );
      ctx.fillStyle = rgb( 255 );
      if (i < num_blocks - 10 && (i == Math.round(counter) || Math.round(i/3) == Math.round(counter))) {
        ctx.fillStyle = getColourFromNote();
      }
      var x = 10 + i * 2;
      ctx.fillRect( x, 0, sz, sz );
      ctx.strokeRect( x, 0, sz, sz );
      time += 0.00002;
    }

    ctx.restore();
    counter = (counter + 0.05) % num_blocks;
  }


}();
