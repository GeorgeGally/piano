rbvj = function () {

  ctx.background(0);
  var grid_w = 20;
  var grid_h = 20;
  var grid = createGrid( grid_w, grid_h );


  var blocks = new particleEngine( grid.length - 1 );
  var row = 0;
  for ( var i = 0; i < blocks.particles.length; i++ ) {
    var b = blocks.particles[ i ];
    b.pos = new Vector( grid[ i ].x, grid[ i ].y );
    b.speed = new Vector( 2, 2 );
    b.c = rgb( 0 );
    // b.c =  (i%2 == 0) ? rgb(0): rgb(255);
    b.w = w / grid_w;
    b.h = h / grid_h;
    b.s = 0;
  }

  this.draw = function () {
    //ctx.background(0);
    //blocks.draw(ctx);
    if ( frameCount%60 == 0 && Sound.getVol()> 70 ) resetSpeed();
    for ( var i = 0; i < blocks.particles.length; i++ ) {
      var b = blocks.particles[ i ];
      b.pos.x += b.speed.x;
      b.pos.y += b.speed.y;
      if (bounce(b.pos.x, 0, w, b.w/2)) b.speed.x *=-1;
      if (bounce(b.pos.y, 0, h, b.w/2)) b.speed.y *=-1;
      //if(b.pos.x > w/2 - 120 && b.pos.x < w/2 + 120 && b.pos.y > h/2 - 120 && b.pos.y < h/2 + 120) {
      if ( chance( 2500 ) ) {
        var _s = Sound.mapSound( b.me, blocks.particles.length * 2, 0, 250 );
        //console.log(_s);
        if ( _s < 80 ) {
          // b.c = rgb( 100 );
          b.c = colours.get( 1 );
        } else if ( _s < 200 ) {
          //b.c = rgb( _s * 2 );
          b.c = colours.get( 2 );
        } else {
          //b.c = rgb( 225, 0, 0 );
          b.c = colours.get( 3 );
        }
      }
      ctx.fillStyle = b.c;
      ctx.fillEllipse( b.pos.x, b.pos.y, b.w / 2.2, b.w / 2.2 );
    }
    mirror();
    mirror( 2 );
  }


  function resetSpeed() {
    var s = new Vector( random( -3, 3 ), random( -3, 3 ) );
    for ( var i = 0; i < blocks.particles.length; i++ ) {
      blocks.particles[ i ].speed = s;
    }
  }



}();
