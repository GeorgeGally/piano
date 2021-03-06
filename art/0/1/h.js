rbvj = function () {
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba(0,0,0,0.8);
  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );

  var particles = [];
  var group = new particleEngine(80);
  colour_count = 1;
  colours = palettes [ colour_count];
  
  for (var i = 0; i < group.particles.length; i++) {

      group.particles[i].c = rgb(randomInt(150,255));
      group.particles[i].a = randomInt(1);
      group.particles[i].speed.y = random(2, 5);
      group.particles[i].pos.x = random(w);
      group.particles[i].pos.y = random(-180, h-30);
      particles[i] = new particleEngine(20);

      for (var j = 0; j < particles[i].particles.length; j++) {

          var p = particles[i].particles[j];
          p.speed.y = 2 + random(0.2, 2)/20;
          p.pos.x = random(w);
          //p.pos.x = group.particles[i].pos.x + random(-20,20);
          p.pos.y = random(-10, 10);
          p.sz = 6;
          p.c = group.particles[i].c;

      }

  }

for (var i = 0; i < group.particles.length; i++) {
for (var j = 0; j < particles[i].particles.length; j++) {
  reset(i, j);
}
}
  // FORCE(gravity) = (G * m1 * m2)/ (d*d) * r
  draw = function(){
      // ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = rgba(0, 0, 0, 0.06);
      ctx.fillRect(0, 0, w, h);
      //console.log(group.particles[0].pos)
      for (var i = 0; i < group.particles.length; i++) {

          var g = group.particles[i];
          //
          g.pos.y += g.speed.y;
          //ctx.fillStyle = g.c;

          if (g.pos.y > h + 600) { reset(g, i); }

          for (var j = 0; j < particles[i].particles.length; j++) {

              var p = particles[i].particles[j];
              p.pos.y += p.speed.y;
              ctx.fillStyle = rgb( p.c, 0.8 );
              ctx.fillEllipse(p.pos.x, g.pos.y + p.pos.y, p.sz, p.sz);

          }
      }
  }

  function reset(j, i){
      group.particles[i].pos.y = random(-50, -20);
      for (var j = 0; j < particles[i].particles.length; j++) {
          //particles[i].particles[j].c = rgb(Sound.mapSound (i + j , 2000, 140, 255), 0, 0);
          particles[i].particles[j].c = getColourFromNote();
          particles[i].particles[j].speed.y = random(0.2, 2)/100;
          particles[i].particles[j].pos.x = random(w);
          particles[i].particles[j].pos.y = random(-80, -20);
      }

  }

}();
