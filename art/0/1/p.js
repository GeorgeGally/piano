rbvj = function () {


  noise.seed( randomInt( 20 ) );


  var scl = 18;
  var xvec, yvec;
  var noiseInc = .1;
  var time = 0;
  var particles = [];
  var flowfield;

  ctx.strokeStyle = rgb( 0 );
  ctx.fillStyle = rgb( 255 );

  draw = function () { // Rotating Vectors

    ctx.background( 0, 0.9 );
    //ctx3.clearRect(0,0,w, h);
    ctx.fillStyle = colours.get( colour_count );
    //var c = ctx.getCurrentFillValues();
    FlowField();
    //ctx2.drawImage(ctx.canvas, 0, 0, w, h);

  }

  function FlowField() {

    xvec = Math.floor( ( w + 50 ) / scl );
    yvec = Math.floor( ( h + 50 ) / scl );
    flowfield = new Array( xvec * yvec );
    var timeInc = Sound.getVol( 0, 1 ) / 1500;
    var yNoise = 0;
    for ( var y = 0; y < yvec; y++ ) {
      var xNoise = 0;
      for ( var x = 0; x < xvec; x++ ) {
        var vecDirect = noise.perlin3( xNoise, yNoise, time ) * 2 * ( TWO_PI );
        var dir = Math.abs( map( vecDirect, 0, 4, 0, scl * 0.6 ) );
        //ctx.fillStyle = rgb(255 - map(dir, 0, scl * 1.5, 0, 255));
        var index = x + y * xvec;
        //flowfield[index] = dir;

        xNoise += noiseInc + Sound.mapSound( x + y, xvec + yvec, 0, 1 ) / 1000;

        ctx.fillStyle = rgb( 255 );
        //ctx.fillStyle = colours.get( Sound.mapSound( dir, scl, 0, colours.pool.length-1 ) )
        ctx.fillCircle( Math.round( x * scl ), Math.round( y * scl ), dir, dir );
      }
      yNoise += noiseInc;
      time += timeInc;
    }
  }




}();
