rbvj = function () {

  var engine = new particleEngine(150, 10);
  var particles = engine.particles;

  var perlin;
  noise.seed(Math.random());

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
  }

  var change = 0;


  //console.log(engine.particles);

  var theta = noise * Math.PI * 2;
  var noisy = .007;


  draw = function(){

    ctx.background(0);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.pos.y = p.start.y + Math.cos((p.col*4 + i * 2 + frameCount)/40) * (engine.grid.spacing.y*2);
      p.pos.x = p.start.x - (Math.cos((Math.sin( (p.row + p.col + i + frameCount)/(20)))) * engine.grid.spacing.y);
      ctx.lineWidth = Sound.mapSound(i, particles.length * 2, 0.1, 3);
      //p.pos.x = p.start.x + 100 * noise.perlin2(frameCount/100, noisy), Math.cos(frameCount/100);
      //p.pos.y = p.start.y + 200 * noise.perlin2(frameCount/100, Math.sin(i/100));
      //ctx.strokeStyle = rgb(255);
      ctx.strokeStyle = rgb( colours[colour_count] );
      ctx.line(p.pos.x, p.pos.y, p.start.x, p.start.y);
    }
    noisy += .007;

  }



}();
