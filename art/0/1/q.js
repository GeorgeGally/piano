rbvj = function () {

  ctx.lineWidth = 4;

  noise.seed(2);
  ctx.background(0);

  var num = 800;
  var pos = [];
  var vel = [];
  var acc = [];
  var c = [];

    for(var i = 0; i < num; i++) {
        pos[i] = new Vector(random(w), random(h));
        vel[i] = new Vector(0, 0);
        acc[i] = new Vector(0, 0);
        c[i] = colours2.get(randomInt(colours2.pool.length));
    }


  var noisy = .007;

  draw = function () {

    //fill(255, 255,255, 2);
    if(frameCount%600 == 0) ctx.background(0, 0.07);
    var s = Sound.getVol(100, 1800)
    s = 600
    for(var i = 0; i < num; i++) {
        ctx.fillStyle = c[i];
        var sz = Sound.mapSound(i, num * 3, 0, 2.2)
        ctx.fillCircle(pos[i].x, pos[i].y, sz, sz);

        //stroke(100, 255);
        vel[i].x = 5*noise.perlin3(s + pos[i].x*.007, s + pos[i].y*.007, noisy)*Math.cos(4*Math.PI*noise.perlin3(pos[i].x*.003, pos[i].y*.003, noisy));
        //console.log(vel[i].x);
        vel[i].y = 5*noise.perlin3(s + pos[i].x*.007, s + pos[i].y*.007, noisy)*Math.sin(4*Math.PI*noise.perlin3(pos[i].x*.003, pos[i].y*.003, noisy));
        for(var j = 0; j < num; j++) {
          if(j != i){
            acc[i].x += (pos[i].x-pos[j].x)/dist(pos[i].x, pos[i].y, pos[j].x, pos[j].y)/Math.pow(5+dist(pos[i].x, pos[i].y, pos[j].x, pos[j].y),2);
            acc[i].y += (pos[i].y-pos[j].y)/dist(pos[i].x, pos[i].y, pos[j].x, pos[j].y)/Math.pow(5+dist(pos[i].x, pos[i].y, pos[j].x, pos[j].y),2);
          }
         // vel[i].add(acc[i]);
        }
      // pos[i].add(vel[i]);
      pos[i].x += vel[i].x;
      pos[i].y += vel[i].y;

      if(pos[i].x < 0 || pos[i].y < 0 || pos[i].x > w || pos[i].y > h){
        pos[i].x = random(0, w);
        pos[i].y = random(0, h);
        vel[i].x = 0;
        vel[i].y = 0;
      }
      acc[i].x = 0;
      acc[i].y = 0;
    }
    noisy += .009;
  }



}();
