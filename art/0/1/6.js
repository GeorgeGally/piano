rbvj = function () {

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
  ctx.background(0);

  function addBall(_x, _y){

    var ball = {
      x:  width/2,
      y: height/2,
      speed_x: random(-2, 2),
      speed_y: random(-2, 2),
      c: rgb(random(255), 0, 0),
      size: 20
    }

    balls.push(ball);
    if (balls.length > maxballs) removeBall();
  }

  function removeBall(){
    balls.splice(0,1);

  }

  function update(){

    for (var i = 0; i < number_of_balls; i++) {
      addBall(w/2, h/2);
    }


    for (var i = 0; i < balls.length; i++) {
      b = balls[i];

      b.x += b.speed_x;
      b.y += b.speed_y;

      if (b.x > width - b.size/2  || b.x < b.size/2  ) {
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

    // ctx.fillStyle = "#00aeef";
    // for (var i = 0; i < motion.length; i++) {
    //   m = motion[i];
    //   ctx.fillRect(m.x, m.y, block_size, block_size)
    // }

    for (var i = 0; i < balls.length; i++) {
      b = balls[i];

      ctx.fillStyle = b.c;
      ctx.fillEllipse(b.x, b.y, b.size, b.size);

    } // end for loop

    //pixelate(10);
  } // end draw



}();
