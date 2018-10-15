rbvj = function () {


  var amount = 0;
  var stars = [];

  var mouse = {
    x: w / 2,
    y: h / 2
  };

  var gravity = 0.016;
  var mouseMoved = false;

  var prevA = -500;

  ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;


  draw = function () {

    ctx.background(0);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    if( Sound.getVol() > 60 && frameCount%2 == 0) {
      var spectrum = Sound.spectrum;
      var freq = getNoteFromFFT(spectrum);
      var note = getNoteNumberFromFFT(spectrum);
      //console.log(note);
      x = map(note, 0, 60, 20, w);
      appParticle(x, random(200))
    }

    for (var i = stars.length-1; i > 0; i--) {

      var s = stars[i];
      s.render();
      if (s.y + (s.r * 2) > h + 200) {
        stars.splice(0, 1);
        //amount--;
        i--;
      }
    }

    // if (!mouseMoved && frameCount - prevA > 50) {
    //   stars.push(new Star(w / 2, h / 1));
    //   //amount++;
    //   prevA = frameCount;
    // }

  };



  function appParticle(x, y) {

    // if (!mouseMoved) {
    //   mouseMoved = true;
    // }

    mouse.x = x;
    mouse.y = y;

    stars.push(new Star(mouse.x, mouse.y));
    //amount++;
  }


  function Star(x, y) {
    this.x = x;
    this.y = y;
    this.r = (Math.random() + 0.1) * 50;
    this.color = ((40 * Math.random()) + 0);
    this.velocityY = random(-1);
    this.velocityX = (Math.random() - 0.5) * 2;
  }

  Star.prototype.render = function() {

    this.velocityY += gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;
    //ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0);
    ctx.fill();
    ctx.stroke();

  }




}();
