rbvj = function () {

  ctx.background(0);
  ctx2.clearRect(0,0,w,h);
  colour_count =3;
  colours = palettes [ colour_count];
  var grid_w = 20;
  var grid_h = 20;
  var grid = createGrid( grid_w, grid_h );


  var blocks = new particleEngine( grid.length - 1 );
  var row = 0;
  for ( var i = 0; i < blocks.particles.length; i++ ) {
    var b = blocks.particles[ i ];
    b.pos = new Vector( grid[ i ].x, grid[ i ].y );
    b.c = rgb( 0 );
    // b.c =  (i%2 == 0) ? rgb(0): rgb(255);
    b.w = w / grid_w;
    b.h = h / grid_h;
    b.s = 0;
  }

  resetSpeed();

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
          b.c = colours.get( 1 );
        } else if ( _s < 200 ) {
          b.c = colours.get( 2 );
        } else {
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
    var s = new Vector( random( -1.8, 1.8 ), random( -1.8, 1.8 ) );
    console.log(speed_reduce);
    for ( var i = 0; i < blocks.particles.length; i++ ) {
      blocks.particles[ i ].speed = (s);
    }
  }



}();
