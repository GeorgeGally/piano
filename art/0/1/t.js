rbvj = function () {

  var number_of_balls = 10;
  var balls = [];
  ctx.lineWidth = 1;
  var colours = new colourPool()
  		//

  		//.add('#ECECEC')
  		//.add('#CCCCCC')
  		.add('#CCFFCC')
  		.add('#333333')
  		.add('#0095a8')
  		.add('#00616f')
  		.add('#FF3300')
  		.add('#FF6600')
  		//.add('#000000')
  		.add('#ffc84f')
  		.add('#FFFFFF')
  		.add('#FFFF00')
  		.add('#FF00FF')
  	;


  // push a ball and it's values into the array
  for (var i = 0; i < number_of_balls; i++) {
    addBall();
  }


  function addBall(){
    var ball = {
      x: random(w),
      y: random(h),
      speed_x: random(3,5),
      speed_y: random(3,5),
      size: 70,
      colour: rgb(255),
      rotation: random(1)
    }
    balls.push(ball);
  }

  draw = function (){
  	ctx2.clear();
    //ctx.background(255, 0.2);
    moveBall();
    drawBall();
  }


  function moveBall(){
  	var spectrum = Sound.spectrum;
  	var freq = getNoteFromFFT(spectrum);
  	var note = getNoteNumberFromFFT(spectrum);

  	num = Math.round(note/60 * colours.pool.length);
  	//num = Math.round(i/engine.particles.length * 360);
  	//console.log(num);
  	var c = colours.get(num);
  	var sz = Sound.getVol(10, 50);
    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
  		b.colour = c;
  		b.size = sz;
      b.x += b.speed_x;
      b.y += b.speed_y;
      b.rotation += 2;
      if (bounce(b.x, 0, w, b.size)) {
        b.speed_x *=-1;
      }

      if (bounce(b.y, 0 ,h, b.size)) {
        b.speed_y *=-1;
      }

    }

  }


  function drawBall(){
    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      ctx.fillStyle = b.colour;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotateDegrees(b.rotation);
      ctx.fillCircle(0, 0, b.size);
      ctx.strokeStyle = "black";
      ctx.strokeCircle(0, 0, b.size);
      ctx.restore();
  		ctx2.fillStyle = colours.get(1);
      ctx2.save();
      ctx2.translate(b.x, b.y);
      ctx2.rotateDegrees(b.rotation);
      ctx2.fillCircle(0, 0, b.size);
      ctx2.strokeStyle = "black";
      ctx2.strokeCircle(0, 0, b.size);
      ctx2.restore();
    }
  }


}();