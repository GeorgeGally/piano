rbvj = function () {

  var number_of_balls = 10;
  var balls = [];
  ctx.lineWidth = 1;
  ctx.background( 0 );

  // push a ball and it's values into the array
  for ( var i = 0; i < number_of_balls; i++ ) {
    addBall();
  }


  function addBall() {
    var ball = {
      x: random( w ),
      y: random( h ),
      speed_x: random( 0.1, 2 ),
      speed_y: random( 0.1, 2 ),
      size: 70,
      c: rgb( 255 ),
      rotation: random( 1 )
    }
    balls.push( ball );
  }

  draw = function () {
    //ctx.background(255, 0.2);
    moveBall();
    drawBall();
  }


  function moveBall() {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteNumberFromFFT( spectrum );

    num = Math.round( note / 60 * colours.pool.length );

    var note_num = (freq.substring(0, 1)).charCodeAt(0) - 65;

    var c = colours.get( Math.round(map(note_num, 0, 7, 0,  colours.pool.length-1)));
    var sz = Sound.getVol( 10, 50 );

    for ( var i = 0; i < balls.length; i++ ) {
      var b = balls[ i ];
      b.c = c;
      b.size = sz;
      b.x += b.speed_x;
      b.y += b.speed_y;
      b.rotation += 2;

      if ( bounce( b.x, 0, w, b.size ) ) {
        b.speed_x *= -1;
      }

      if ( bounce( b.y, 0, h, b.size ) ) {
        b.speed_y *= -1;
      }

    }

  }


  function drawBall() {
    for ( var i = 0; i < balls.length; i++ ) {
      var b = balls[ i ];
      ctx.fillStyle = b.c;
      ctx.save();
      ctx.translate( b.x, b.y );
      ctx.rotateDegrees( b.rotation );
      ctx.fillCircle( 0, 0, b.size );
      ctx.strokeStyle = "black";
      ctx.strokeCircle( 0, 0, b.size );
      ctx.restore();
      ctx2.fillStyle = b.c;
      ctx2.save();
      ctx2.translate( b.x, b.y );
      ctx2.rotateDegrees( b.rotation );
      ctx2.fillCircle( 0, 0, b.size );
      ctx2.strokeStyle = "black";
      ctx2.strokeCircle( 0, 0, b.size );
      ctx2.restore();
    }
  }


}();
