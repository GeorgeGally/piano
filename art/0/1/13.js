rbvj = function () {


  noise.seed( randomInt( 20 ) );


  var scl = 6;
  var xvec, yvec;
  var noiseInc = .01;
  var time = 0;
  var particles = [];
  var flowfield;

  ctx.fillStyle = rgb( 0 );
  ctx.strokeStyle = rgb( 0 );
  ctx.background( 255 );


  draw = function () { // Rotating Vectors

    ctx.background( 255, 0.1 );
    //ctx3.clearRect(0,0,w, h);

    FlowField();
    //ctx2.drawImage(ctx.canvas, 0, 0, w, h);
    mirror();
  }

  function FlowField() {

    xvec = Math.floor( ( w + 50 ) / scl );
    yvec = Math.floor( ( h + 50 ) / scl );
    flowfield = new Array( xvec * yvec );
    noiseInc = tween( noiseInc, Sound.getVol() / 10000, 4 );
    var yNoise = 0;
    for ( var y = 0; y < yvec; y++ ) {
      var xNoise = 0;
      for ( var x = 0; x < xvec; x++ ) {
        var vecDirect = noise.perlin3( xNoise, yNoise, time ) * 2 * ( TWO_PI );

        //vecDirect = map(degrees(vecDirect), -360, 360, 0, 360);
        //vecDirect = radians(vecDirect);
        //console.log(vecDirect);
        //  var dir = p5.Vector.fromAngle(vecDirect);
        var dir = vecDirect * 10.5;
        //ctx.fillStyle = rgb(255 - map(dir, 0, scl * 1.5, 0, 255));
        var index = x + y * xvec;
        flowfield[ index ] = dir;
        //dir.setMag(3);
        xNoise += noiseInc;

        //ctx.save();
        //ctx.translate(Math.round(x * scl), Math.round(y * scl));
        //ctx.rotate(dir);
        ctx.fillRect( Math.round( x * scl ), Math.round( y * scl ), dir, dir );
        //ctx.LfillEllipse(Math.round(x * scl), Math.round(y * scl), dir, dir, 5);
        //ctx.line(0, 0, scl, 0);
        //ctx.restore();
      }
      yNoise += noiseInc;
      //time += Sound.getVol(y, yvec, 0, 10)/2000000;
      time += .0001;
    }
  }





}();
