rbvj = function () {


  var engine = new particleEngine(0);
  var particles = engine.particles;

  var seed = window.location.hash.substr(1) || String(Math.random()).split('.')[1];
  var r = random( seed )
  var simplex = new SimplexNoise( r )
  var simplex3 = simplex.noise3D.bind(simplex)
  var simplexScale = 0.6;
  var change = 0;
  ctx.lineWidth = 1;

  for (var i = 0; i < 250; i++) {
    addParticles();
  }

  draw = function (){

    ctx.background(0, 0.05);
    particles = engine.particles
    update();
    //drawParticles();

  }

  function addParticles(){

    engine.add();
    //console.log(engine.particles.length);
    var p = engine.last;
    p.move = true;
    p.size = 12;
    p.speed.x = randomWhole(0.1, 2);
    p.speed.y = randomWhole(0.1, 2);
    p.curve = radians(random(50));
    p.t = 0;
    //p.c = randomGrey();

    if (p.me < 1) {
      p.move = false;
      p.pos.x = w/2+ randomInt(-10, 10);
      p.pos.y = h/2+ randomInt(-10, 10);
      drawParticles(p)
    } else {
      // p.pos.y = engine.particles[randomInt(particles.length-10, particles.length-1)].pos.x + randomWhole(20);
      // p.pos.x = engine.particles[randomInt(particles.length-10, particles.length-1)].pos.y + randomWhole(20);
      // top
    //   if (chance(2)) {
    //     p.pos.y = random(150);
    //     p.pos.x = random(150, w-150);
    //   // bottom
    // } else if (chance(2)) {
    //     p.pos.y = random(h-150, h);
    //     p.pos.x = random(150, w-150);
    //     //left
    //   } else if (chance(2)) {
    //     p.pos.x = random(150);
    //     p.pos.y = random(150, h-150);
    //   } else  {
    //     //right
    //     p.pos.x = random(w - 150, w);
    //     p.pos.y = random(h - 150);
    //   }
    p.pos.x = Math.cos(random(360)) * 200;
    p.pos.y = Math.sin(random(360)) * 200;
    }

  }

  function drawParticles(b){

    //ctx.fillStyle = colours.get(colour_count);
    ctx2.fillStyle = colours.get(colour_count);
    //var c = ctx.getCurrentFillValues();
    ctx2.fillStyle = b.c;
    ctx2.fillCircle(sticky(b.pos.x, 10), sticky(b.pos.y, 10), b.size/1.5, b.size/1.5);

  }


  function update(){

    for (var i = 0; i < particles.length; i++) {
      p = particles[i];

      if (p.move) {
        //p.speed.x += randomWhole(0.1, 0.2);
        //p.speed.y += randomWhole(0.1, 0.2);

      if (chance(10)) {
        change  = simplex.noise3D(p.pos.x, p.pos.y, p.t) * 0.00005;
        //console.log(change);
      }

      p.curve += change;
      p.t += p.curve/30;


      //var noise = simplex.noise2D(x1, y1);
      var noise = simplex3(
        p.pos.x * simplexScale,
        p.pos.y * simplexScale,
        0.0005
      )
      //console.log(noise);
      var theta = noise * Math.PI * 2;

      p.pos.x += Math.cos( p.t ) * p.speed.x;
      //y1+=random(-55,55);
      p.pos.y += Math.sin( p.t ) * p.speed.y;


        if (p.size> 1) p.size -= 0.001;
        //p.pos.x += p.speed.x;
        //p.pos.y += p.speed.y;
        hitTest(i);

        if (p.pos.x > w) p.pos.x = 0;
        if (p.pos.y > h) p.pos.y = 0;
        if (p.pos.x < 0) p.pos.x = random(w-50);
        if (p.pos.y < 0) p.pos.y = h;

        ctx.strokeStyle = rgba(255);
        //ctx.strokeStyle = colours.get(colour_count);
        ctx.strokeRect(p.pos.x, p.pos.y, p.size, p.size);

      }

      //drawParticles(p);
    }


  }


  function hitTest(_i){
    for (var j = 0; j < particles.length; j++) {
      if (_i!=j){
        b1 = particles[_i];
        b2 = particles[j];
        if (b1!=b2 && b1.move && !b2.move  && dist(b1.pos.x, b1.pos.y, b2.pos.x, b2.pos.y) <=  b1.size/2 + b2.size/2) {
          //b1.pos.x = sticky(b1.pos.x, b1.size/2);
          //b1.pos.y = sticky(b1.pos.y, b1.size/2);
          b1.c = getColourFromNote();
          b2.c = getColourFromNote();
          drawParticles(b1);
          b1.move = false;

          //console.log(b1.c);
          engine.particles.splice(0, 1);
          addParticles();
        }
      }
    }
  }

  function getColourFromNote(){
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteNumberFromFFT( spectrum );
    num = Math.round( note / 60 * colours.pool.length );
    //num = Math.round(i/engine.particles.length * 360);
    var note_num = (freq.substring(0, 1)).charCodeAt(0) - 65;
    //console.log(note_num);
    return colours.get( Math.round(map(note_num, 0, 7, 0,  colours.pool.length-1)));
  }

}();
