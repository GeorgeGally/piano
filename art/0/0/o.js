rbvj = function () {

  clearAll()
  ctx.strokeStyle = rgb(255);
  ctx.lineWidth = 1;
  var num = 120;
  var particles = [];

  var time = 0;
  ctx.fillStyle = rgb ( 0 );

  /// SETUP
  for ( var i = 0; i < num; i++ ) {
    particles[ i ] = new Particle( new Vector( random( w ), random( h ) ) );
  }


  function Particle( pos ) {
    this.pos = pos;
    this.speed = new Vector( random( 0.2, 2 ), random( 0.2, 2 ) );
  }

  var v = 1.3;
  var t = 0;

  this.draw = function () {
    //ctx.clearRect(0, 0,w,h);
    ctx.background( 0 )
    ctx.save();
    ctx.translate( w / 2, h / 2 );
    if(Sound.getVol() > 0) t = tween(t, t + Sound.mapSound( 50, particles.length * 2, 1, 10 ) * 0.0000001, 14);
    //var t = 0.0002;
    for ( var i = 0; i < particles.length; i++ ) {
      var sz = (i * v) + Sound.mapSound(i, particles.length * 1, 0, 3);
      ctx.rotate( radians( time ) );
      ctx.HfillEllipse( 10 + i * 2, 0, sz, sz );
      ctx.HstrokeEllipse( 10 + i * 2, 0, sz, sz );
      time += t;
    }

    ctx.restore();
  }


}();
