rbvj = function () {

  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );

  var damping = 0.8;
  var kSpeed = 1.0;
  var minDistFactor = 1.1;
  var particles = [];
  var passes = 0;

  ctx.strokeStyle = rgb( 0 );


  var Particle = function () {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteFreqPerc( spectrum );
    //console.log(spectrum[note]);
    var note1 = ( freq.substring( 0, 1 ) )
      .charCodeAt( 0 ) - 65;
    num = Math.round( map( note1, 0, 7, 0, colours.pool.length ) );

    var c = getColourFromNote();
    this.vx = 0;
    this.vy = 0;
    this.c = c;
    //var hsv = RGBtoHSV(this.r, this.g, this.b);
    this.x = w / 2 + random( -30, 30 );
    this.y = h / 2 + random( -30, 30 );
    this.radius = Math.round( map( spectrum[ note ], 0, 255, 5, 10 ) );;
    this.radius += randomInt( this.radius / 5 );
  }


  function addParticle() {
    particles[ particles.length ] = new Particle();
  }

  draw = function () {
    doPhysics();
    ctx.background( 0 );
    if ( frameCount % 8 == 0 && Sound.getVol() > 40 ) addParticle();
    for ( var i = 0; i < particles.length; ++i ) {
      var p = particles[ i ];
      ctx.fillStyle = p.c;
      ctx.fillCircle( p.x, p.y, p.radius, p.radius );
      ctx.strokeCircle( p.x, p.y, p.radius, p.radius );
    }
    passes++;
  }

  function doPhysics() {
    for ( var i = 0; i < particles.length; ++i ) {
      var fx = 0,
        fy = 0,
        wt = 0;
      particles[ i ].vx *= damping;
      particles[ i ].vy *= damping;
      for ( var j = 0; j < particles.length; ++j ) {
        if ( j == i || Math.abs( particles[ j ].x - particles[ i ].x ) > particles[ i ].radius * minDistFactor ||
          Math.abs( particles[ j ].y - particles[ i ].y ) > particles[ i ].radius * minDistFactor )
          continue;
        var dx = particles[ i ].x - particles[ j ].x;
        var dy = particles[ i ].y - particles[ j ].y;
        var distance = Math.sqrt( dx * dx + dy * dy );
        var maxDist = ( particles[ i ].radius + particles[ j ].radius );
        var diff = maxDist - distance;
        if ( diff > 0 ) {
          var scle = diff / maxDist;
          scle = scle * scle;
          wt += scle;
          scle = scle * kSpeed / distance;
          fx += dx * scle;
          fy += dy * scle;
        }
      }

      // keep within edges
      var dx, dy, distance, scle, diff;
      var maxDist = particles[ i ].radius;
      // left edge
      distance = dx = particles[ i ].x - 0;
      dy = 0;
      diff = maxDist - distance;
      if ( diff > 0 ) {
        scle = diff / maxDist;
        scle = scle * scle;
        wt += scle;
        scle = scle * kSpeed / distance;
        fx += dx * scle;
        fy += dy * scle;
      }
      // right edge
      dx = particles[ i ].x - width;
      dy = 0;
      distance = -dx;
      diff = maxDist - distance;
      if ( diff > 0 ) {
        scle = diff / maxDist;
        scle = scle * scle;
        wt += scle;
        scle = scle * kSpeed / distance;
        fx += dx * scle;
        fy += dy * scle;
      }
      // top edge
      distance = dy = particles[ i ].y - 0;
      dx = 0;
      diff = maxDist - distance;
      if ( diff > 0 ) {
        scle = diff / maxDist;
        scle = scle * scle;
        wt += scle;
        scle = scle * kSpeed / distance;
        fx += dx * scle;
        fy += dy * scle;
      }
      // bot edge
      dy = particles[ i ].y - height;
      dx = 0;
      distance = -dy;
      diff = maxDist - distance;
      if ( diff > 0 ) {
        scle = diff / maxDist;
        scle = scle * scle;
        wt += scle;
        scle = scle * kSpeed / distance;
        fx += dx * scle;
        fy += dy * scle;
      }
      if ( wt > 0 ) {
        particles[ i ].vx += fx / wt;
        particles[ i ].vy += fy / wt;
      }
    }
    for ( var i = 0; i < particles.length; ++i ) {
      particles[ i ].x += particles[ i ].vx;
      particles[ i ].y += particles[ i ].vy;
      // particles[i].x += .5;
    }
  }



  function RGBtoHSV( r, g, b ) {
    var mmax = r > g ? r : g;
    mmax = mmax > b ? mmax : b;
    var mmin = r < g ? r : g;
    mmin = mmin < b ? mmin : b;

    var v = mmax;
    var s = ( mmax != 0 ) ? ( mmax - mmin ) / mmax : 0;
    var h = 0;
    if ( s == 0 ) {
      h = 0; // undefined, actually
    } else {
      var d = mmax - mmin;
      if ( r == mmax ) {
        h = ( g - b ) / d;
      } else if ( g == mmax ) {
        h = 2 + ( b - r ) / d;
      } else if ( b == mmax ) {
        h = 4 + ( r - g ) / d;
      }
      h *= 60;
      if ( h < 0 ) {
        h += 360;
      }
    }
    var results = [];
    results[ 0 ] = h;
    results[ 1 ] = s;
    results[ 2 ] = v;
    return results;
  }

}();
