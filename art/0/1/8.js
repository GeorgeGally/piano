rbvj = function () {

  var colours = new colourPool();
  colours.add('#fff', 50);
  colours.add('#000', 50);
  var engine = new particleEngine(80);
  var dir = 1;
  ctx.fillStyle = rgb( colours[colour_count] );


  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    p.vol = 0;
    p.grid2 = createGrid(1,20);

    p.c = rgb( colours[colour_count] );
    if (chance(200)) {
        p.c = '#000'
      }
  }

  draw = function() {

    //if (chance (200)) dir *=-1;
    ctx.clearRect(0,0,w,h);
    drawCone(w/2,h/2);

    // drawCone(w-w/4,h/4);
    // drawCone(w/4,h-h/4);
    // drawCone(w-w/4,h-h/4);

  }



  function drawCone(startx, starty){
    //starty = startx || h/2;
    // ctx.fillStyle = rgb( colours[colour_count] );
    // var c = ctx.getCurrentFillValues();
    for (var i = 0; i < 80; i++) {
      var p = engine.particles[i];
      if (frameCount%60 == 0 && chance(20)) {
        if(p.c == '#000') {
          p.c = rgb( colours[colour_count] );
        } else {
          p.c = '#000'
        }
      }
      //console.log(p.c);
      ctx.fillStyle = p.c;

      p.vol = tween(p.vol, Sound.getVol(), 10);
      p.pos.x = dir * Math.cos(frameCount/80) * 3;
      p.pos.y = dir * Math.sin(frameCount/80) * 3;
      ctx.HfillEllipse(startx - i*p.pos.x, starty - i*p.pos.y, map(p.vol, 0,255, 500,800) -i*7.0
    );
    }
  }


}();
