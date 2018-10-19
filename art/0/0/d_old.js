rbvj = function () {

  ctx.background( 0 );

  var grid_w = 60;
  var grid_h = 40;
  var grid = createGrid( grid_w, grid_h, w, h );
  var counter = 0;
  var particles = [];
  var num_particles = grid_w * grid_h;
  var angle = 360 / num_particles;
  var circ_sz = 4;
  var t_size = 250;
  var middle = 0;
  var mirror1_on = false;
  var mirror2_on = false;
  var ammt = 1;

  for ( var i = 0; i < num_particles; i += 1 ) {
    var x = grid[ i ][ 0 ];
    var y = grid[ i ][ 1 ];
    addParticle( x, y, colours.get( 6 ), i );
  };



  draw = function () {
    ctx.background( 0 );

    if ( chance( 400 ) ) mirror1_on = !mirror1_on;
    if ( chance( 400 ) ) mirror2_on = !mirror2_on;

    drawParticles();
    // if (mirror1_on) mirror();
    // if (mirror2_on) mirror(2);
  }


  function addParticle( _x, _y, _colour, _me ) {
    var particle = {
      x: _x,
      y: _y,
      c: _colour,
      me: ( _me + randomInt( -4, 4 ) ) % 100,
      offset: 0,
      on: false,
      speedx: posNeg() * random( 0.4, 4 ),
      speedy: posNeg() * random( 0.4, 4 ),
      sz: circ_sz,
      counter: _x / 100 + _y / 50
    }

    particles.push( particle );
  }


  function drawParticles() {
    ammt = tween(ammt, Sound.getBassVol( 0, 8 ), 10);
    //console.log(ammt);
    for ( var i = 0; i < particles.length; i++ ) {
      p = particles[ i ];
      p.counter += ammt / 800;
      p.sz = tween( p.sz, Math.abs( Math.sin( p.counter ) ) * 20, 2 );
      // if (Sound.spectrum[p.me] > 80) {
      //   p.on == true;
      ctx.fillStyle = getNoteFromSz( p );
      ctx.centreFillRect( p.x, p.y, p.sz, p.sz );
      //ctx.fillCircle( p.x, p.y, p.sz, p.sz );
      // } else {
      //   ctx.fillStyle = rgba( 255, 0.08 );
      // }
      // if ( chance( 10000 ) && p.on == true ) {
      //   p.on == false;
      // }
    }

  }

  function getNoteFromSz( p ) {
    // var spectrum = Sound.spectrum;
    //   var freq = getNoteFromFFT(spectrum);
    //   var note = getNoteFreqPerc(spectrum);
    //   //console.log(spectrum[note]);
    //   var note1 = (freq.substring(0, 1)).charCodeAt(0) - 65;
    num = Math.round( map( p.sz, 0, 30, 0, colours.pool.length ) );
    return colours.get( num );
  }

}();
