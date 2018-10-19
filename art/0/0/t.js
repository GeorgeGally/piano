rbvj = function () {

  var particle_array = [];
  var imgData;
  var maxParticles = 1000;
  var word_num = -1;
  ctx.background(0);
  
  hidden_ctx.font = "200px georgia";
  hidden_ctx.fillStyle = "blue";
  hidden_ctx.textAlign = "center";
  hidden_ctx.textBaseline = "middle";
  // var words = ['Freedom', 'Happiness', 'Health', 'Wealth'];
  var words = [ 'Is', 'This', 'The', 'Freedom', 'You', 'Promised' ];
  brightSpark();


  draw = function () {
    if(chance(600)) brightSpark();
    ctx.save();
    for ( var i = particle_array.length - 1; i >= 0; i-- ) {

      p = particle_array[ i ];
      // c.fillRect(p.x, p.y, p.size, p.size);
      if ( p.x != 0 && p.y != 0 ) {
        // ctx.globalCompositeOperation = 'multiply';
        // ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.c;
        //c.drawImage(img,p.x, p.y, p.size, p.size);
        ctx.fillCircle( p.x, p.y, p.size, p.size );
        if ( p.alpha < 1 ) p.alpha += 0.0019999;
        if ( p.size < 0.005  || p.x < 0 || p.y < 0 || p.x > w || p.y > h) {
          p.x = p.orig_x + random( -4, 4 );
          p.y = p.orig_y + random( -4, 4 );
          p.size = 3;
          p.speedx = random( -1, 1 ),
          p.speedy = random( -1, 1 )
        }
        p.x += p.speedx + random( -1, 1 );
        p.y += p.speedy + random( -1, 1 );
        p.size *= p.reduce;
      }
    };
    ctx.restore();


    if ( particle_array.size > maxParticles ) particle_array.shift();
  }


  function addParticle( _x, _y ) {
    var r = randomInt( 50, 175 );
    var g = randomInt( 120, 190 );
    var b = randomInt( 10, 35 );
    var particle = {
      orig_x: _x,
      orig_y: _y,
      x: _x + random( -3, 3 ),
      y: _y + random( -3, 3 ),
      c: randomGrey(0, 240, 30, 0.06),
      size: 3,
      reduce: random( 0.9, 0.999 ),
      alpha: 0.05,
      speedx: random( -1, 1 ),
      speedy: random( -1, 1 )
    };
    particle_array.push( particle );
  }

  function brightSpark() {
    hidden_ctx.clearRect( 0, 0, w, h );
    particle_array = [];
    word_num = ( word_num + 1 ) % ( words.length - 1 );
    hidden_ctx.fillStyle = "white";
    console.log(word_num);
    hidden_ctx.fillText( words[ word_num ], window.innerWidth / 2, window.innerHeight / 2 );
    //c.eqTriangle(w/2, h/2, 100);
    //c.fillEllipse(width/2, h/2, 200,200);
    draw();
    imgData = hidden_ctx.getImageData( 0, 0, window.innerWidth, window.innerHeight )
      .data;

    for ( var y = 0; y < window.innerHeight; y += 4 ) {

      for ( var x = 0; x < window.innerWidth; x += 4 ) {

        var pt = ( y * window.innerWidth + x ) * 4;
        var fBrightness;
        fBrightness = ( 0.3 * imgData[ pt ] + 0.59 * imgData[ pt + 1 ] + 0.11 * imgData[ pt + 2 ] );

        if ( fBrightness > 10 ) {
          addParticle( x, y );
        }

      }
    }
    ctx.background(0, 0.6);
    hidden_ctx.clearRect( 0, 0, w, h );
  }



}();
