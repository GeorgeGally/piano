rbvj = function() {

  var vol = 0;
  ctx.fillStyle = rgb(0);

  var gx = randomInt(5, 50);
  var gy = randomInt(5, 50);
  var volX = 10;

  var engine = new particleEngine(gx, gy);

  function reset(which) {

    //console.log("reset");

    if(which) {
      gx = randomInt(2, 40)
    } else {
      gy = randomInt(2, 40);
    }

    engine = new particleEngine(gx, gy);
  }


  draw = function() {

    ctx.background(0, 0.7);
    if (Sound.getBassVol() > 90 && chance(90)) reset();
    if (Sound.getHighsVol() > 90 && chance(90)) reset("x");

    for (var i = 0; i < engine.particles.length; i++) {

      var p = engine.particles[i];
      var s = Sound.mapSound(i, engine.particles.length * 1.4, 1, engine.grid.spacing_x - 1);
      volX = tween(volX, s, 100);
      p.pos.y -=2;
      if(p.pos.y < 0) p.pos.y = h;
      //volY = Sound.mapSound(i, engine.particles.length * 1.4, 1, 40);
      // ctx.fillStyle = rgb( 266, 0.8 );
      if (p.pos.y > h - 150) p.c = getNoteColour();
      ctx.fillStyle = p.c;
      ctx.centreFillRect(p.pos.x, p.pos.y, volX, engine.grid.spacing_y - 4);

    }

  }

  function getNoteColour(){
    var spectrum = Sound.spectrum;
      var freq = getNoteFromFFT(spectrum);
      var note = getNoteFreqPerc(spectrum);
      //console.log(spectrum[note]);
      var note1 = (freq.substring(0, 1)).charCodeAt(0) - 65;
      num = Math.round(map(note1, 0, 7, 0, colours.pool.length));
      return colours.get(num);
  }


}();
