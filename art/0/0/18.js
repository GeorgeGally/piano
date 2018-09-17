rbvj = function () {

  var block_size = 20;
  var rect_size = 60;
  var frameRate = 60;

  var maxballs = 500;
  var balls = [];
  var motion = [];
  var gridx = 4;
  var gridy = 9;
  var number_of_balls = gridx * gridy;
  var grid = createGrid( gridx, gridy );
  var grid2 = createGrid( gridx * 2, gridy * 2 );

  ctx.background( 0 );

  for ( var i = 0; i < number_of_balls; i++ ) {
    addBall( grid[ i ].x, grid[ i ].y );
  }



  function addBall( _x, _y ) {
    var c = ctx.getCurrentFillValues();
    var sz = ave( random( 20, 100 ), gridx * 2 );
    var ball = {
      x: _x,
      y: _y,
      speed_x: ave( random( -2, 2 ), gridx * 2 ),
      speed_y: random( -5, 5 ),
      c: rgba( c.r, random( 1 ) ),
      a: random( 1 ),
      sz: sz
    }

    balls.push( ball );
    if ( balls.length > maxballs ) removeBall();

  }


  function removeBall() {
    balls.splice( 0, 1 );
    //console.log(balls.length);
  }

  for ( var i = 0; i < number_of_balls; i++ ) {
    addBall( grid[ i ].x, grid[ i ].y );
  }

  function update() {


    for ( var i = 0; i < balls.length; i++ ) {

      b = balls[ i ];

      vol = Sound.mapSound( i, balls.length, 50, 100 );
      b.sz = tween( b.sz, vol, 10 );
      // we adjust the hit area because shere is drawn from the centre
      if ( b.x > width - b.size / 2 || b.x < b.size / 2 ) {
        b.speed_x = b.speed_x * -1;
      }

      if ( ( b.y > height && b.speed_y > 0 ) || ( b.y < 0 && b.speed_y < 0 ) ) {
        b.speed_y = b.speed_y * -1;
      }
      b.x += b.speed_x;
      b.y += b.speed_y;


    } // end for loop

  }


  draw = function () {

    ctx.background( 0 );
    update();

    ctx.lineWidth = 4;
    ctx.fillStyle = rgb( colours[colour_count] );
    var c = ctx.getCurrentFillValues();
    ctx.strokeStyle = rgb( colours[colour_count] );
    for ( var i = 0; i < balls.length; i++ ) {
      b = balls[ i ];


      ctx.fillStyle = rgba(c.r, c.g, c.b, b.a);
      //ctx.fillStyle = b.c;
      if ( b.speed_y < 0 ) {
        ctx.eqFillTriangle( b.x, b.y, b.sz );
        ctx.fillStyle = rgb( 0 );
        ctx.eqFillTriangle( b.x, b.y, b.sz / 4 );
      } else {
        ctx.eqDownFillTriangle( b.x, b.y, b.sz );
        ctx.fillStyle = rgb( 0 );
        ctx.eqDownFillTriangle( b.x, b.y, b.sz / 4 );
      }

    } // end for loop


  } // end draw


}();
