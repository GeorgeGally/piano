rbvj = function () {

  var colours = new colourPool();
  colours.add('#fff', 50);
  colours.add('#000', 50);
  var engine = new particleEngine(80);
  var dir = 1;

  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    p.vol = 0;
    p.grid2 = createGrid(1,20);
    p.c = rgb(random(255), random(255), random(155));
    p.c = colours.get();
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
    for (var i = 0; i < 80; i++) {
      var p = engine.particles[i];
      if (frameCount%60 == 0 && chance(20)) {
        if(p.c == '#fff') {
          p.c = '#000'
        } else {
          p.c = '#fff'
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
