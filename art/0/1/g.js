rbvj = function () {

  clearAll();

  var block_size = 20;
  var rect_size = 60;
  var frameRate = 60;
  var number_of_balls = 15;
  var maxballs = 5000;
  var balls = [];
  var motion = [];

  for (var i = 0; i < number_of_balls; i++) {
    addBall();
  }


  function addBall(_x, _y){

    var ball = {
      x:  width/2,
      y: height/2,
      speed_x: random(-1, 1),
      speed_y: random(-1, 1),
      // c: rgb(random(255), 0, 0),
      c: getColourFromNote(),
      size: Sound.mapSound(balls.length, maxballs, 5, 20),
      a: random(1)
    }

    balls.push(ball);
    if (balls.length > maxballs) removeBall();
  }

  function removeBall(){
    balls.splice(0,1);

  }

  function update(){

    //for (var i = 0; i < number_of_balls; i++) {
      if(Sound.getVol() > 80) addBall(w/2, h/2);
    //}


    for (var i = balls.length-1; i >0 ; i--) {
      b = balls[i];
      b.size -= 0.02;
      if (b.size < 0.5) balls.splice(i,1);
      b.x += b.speed_x;
      b.y += b.speed_y;

      if (b.x > width - b.sz/2  || b.x < b.sz/2  ) {
        b.speed_x = b.speed_x *-1;
      }

      if (b.y > height - b.size/2 || b.y < b.size/2 ) {
        b.speed_y = b.speed_y *-1;
      }

    } // end for loop

  }


  draw = function(){

    ctx.background(0, 0.05);
    update();

    ctx.fillStyle = colours.get(colour_count);
    var c = ctx.getCurrentFillValues();



    for (var i = 0; i < balls.length; i++) {
      b = balls[i];
      ctx.fillStyle = b.c;
      ctx.fillEllipse(b.x, b.y, b.size, b.size);

    } // end for loop

    //pixelate(10);
  } // end draw



}();
