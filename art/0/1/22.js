rbvj = function () {

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  var grid = new Grid( 19, 13 );
  var nums = [ 3, 3, 4, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 30 ]
  grid.sides = []
  for ( var i = 0; i < grid.length; i++ ) {
    grid.sides[ i ] = 2;
  }

  var counter = 0;
  //console.log(grid);
  draw = function () {
    ctx.background( 0 );
    if ( frameCount % 1 == 0 ) {
      for ( var i = grid.num_items_vert; i > 0; i-- ) {
        var pos = i * grid.num_items_horiz + counter;

        var s = Math.round( map( Sound.mapSound( i / 2, grid.num_items_vert ), 0, 255, 0, 22 ) );

        if ( s < 10 ) {
          grid.sides[ pos ] = 2;
        } else {
          grid.sides[ pos ] = nums[ s - 10 ];
        }
        //grid.sides[pos2] = 2;
      }
      counter = ( counter + 1 );
    }
    for ( var i = 0; i < grid.length; i++ ) {
      var sides = grid.sides[ i ];
      myPolygon( grid.x[ i ], grid.y[ i ], sides, grid.spacing_x / 2.2 );
    }

    if ( counter >= grid.num_items_horiz ) {
      for ( var i = 0; i < grid.length; i++ ) {
        //grid.sides[i] = 2;

      }
      counter = 0;
    }


  }

  function myPolygon( x, y, sides, size ) {
    Xcenter = x;
    Ycenter = y;

    //ctx.fillStyle = rgb(255);
    ctx.fillStyle = rgb( colours[colour_count] );
    //var c = ctx.getCurrentFillValues();
    ctx.moveTo( Xcenter + size * Math.cos( i ), Ycenter + size * Math.sin( i ) );
    for ( var i = 1; i <= sides; i += 2 ) {
      ctx.beginPath();

      ctx.lineTo( Xcenter + size * Math.cos( i * 2 * Math.PI / sides ), Ycenter + size * Math.sin( i * 2 * Math.PI / sides ) );

      ctx.lineTo( Xcenter + size * Math.cos( ( i + 1 ) * 2 * Math.PI / sides ), Ycenter + size * Math.sin( ( i + 1 ) * 2 * Math.PI / sides ) );
      ctx.lineTo( Xcenter, Ycenter );
      // ctx.stroke();
      ctx.closePath();
      ctx.fill();

    }
    ctx.strokeStyle = rgb( colours[colour_count] );
    //ctx.strokeStyle = rgb(255);

    ctx.moveTo( Xcenter + size * Math.cos( 0 ), Ycenter + size * Math.sin( 0 ) );
    for ( var i = 1; i <= sides; i += 1 ) {
      ctx.lineTo( Xcenter + size * Math.cos( i * 2 * Math.PI / sides ), Ycenter + size * Math.sin( i * 2 * Math.PI / sides ) );
    }
    ctx.stroke();
  }


}();
