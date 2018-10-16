rbvj = function () {


  var balls = [];
  var grid;

  ctx.lineWidth = 0.2;
  var mode = 7;
  var speed = 2;
  var pix = false;

  // create particles
  reset();


  function addBall(x, y, i){
    var ball = {
      x: x,
      y: y,
      sz: 10,
      me: i
    }
    balls.push(ball);
  }

  draw = function(){
    if (chance(200)) {
      mode = randomInt(0,8);
      console.log("mode: " + mode);
    }
    if (chance(500)) speed *=-1;
    if (chance(500)) pix = !pix;
    if (chance(100)) reset();
    if (mode == 7) {
      ctx.background(0);
    } else {
      ctx.background(0, 0.2);
    }

    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      moveBall(b);
    }

    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      drawBall(b);
    }
    //mirror();
    if (pix) pixelate(20);
    //triangulate(40);
  }


  function moveBall(b){
      //var m = Math.round(Mic.spectrum.length/2);
      if (mode == 0) {
        var new_me = b.me%50;
        //var s = map(audioChannelVolume[new_me], 0, 200, 4, grid.spacing_y/2);
        var s = Sound.mapRawSound(b.me, balls.length *2, 10, 100);
      } else if (mode == 1) {
        var s = Sound.mapSound(b.me, balls.length * 1, 10, 100);
        var new_me = b.me%50;
        //var s = map(audioChannelVolume[new_me], 0, 200, 4, grid.spacing_y/2);
      } else if (mode == 5) {
        var new_me = b.me%150;
        var s = Sound.mapSound(new_me, 150, 10, 100);
        //var s = map(audioChannelVolume[new_me], 0, 200, 1, grid.spacing_y-2);
      } else if (mode == 6) {
        var s = Sound.mapSound(b.me, balls.length, 10, 100);
        var new_me = b.me%50;
        //var s = map(audioChannelVolume[new_me], 0, 200, 1, grid.spacing_x);
      } else if (mode == 7) {
        var new_me = b.me%50;
        //var s = map(mapSound(new_me, 50), 0, 200, 1, grid.spacing_y-2);
        var s = Sound.mapSound(new_me, 100, 0, 200);
      } else {
        var s = Sound.mapSound(b.me, balls.length, 10, 100);
        //var s = map(Mic.spectrum[b.me%(m-1)], 0, 255, 4, grid.spacing_y - 2);
      }

      if(s > 0) {

      b.sz = tween(b.sz, s, 2);
      }
      if (mode == 6) {
      b.x -= speed;
      } else {
      b.y += speed;
      }
      if( b.x > w) b.x = 0;
      if( b.x < 0) b.x = w;
      if( b.y > h) b.y = 0;
      if( b.y < 0) b.y = h;
  }


  function drawBall(b){
    ctx.fillStyle = colours.get(colour_count);
    var c = ctx.getCurrentFillValues();
      if (mode == 2 || mode == 1) {
        //ctx.fillStyle = hsl(b.sz*2, 80, 50);
        //ctx.fillStyle = rgb(b.sz*5, 0, 0);
      } else if (mode == 4) {
        //ctx.fillStyle = hsl(b.sz*2, 80, 50);
        //ctx.fillStyle = rgb(0, 0, 200);
      } else {
        //ctx.fillStyle = rgb(b.sz*5);
      }
      if (mode == 6) {
        ctx.fillEllipse(b.x, b.y - b.sz, b.sz/2, b.sz/2);
      } else if (mode == 7) {

        //ctx.fillStyle = rgb(255);
        ctx.fillRect(b.x, b.y, b.sz, grid.spacing_y/2);
      } else {
        ctx.fillRect(b.x, b.y - b.sz, grid.spacing_x - 2, b.sz);
      }


  }

  function reset(){
    var gw = randomInt(20, 100);
    var gh = randomInt(10, 80);
    grid = new Grid(gw, gh);
    balls = [];
    var number_of_balls = gw * gh;
    for (var i = 0; i < number_of_balls; i++) {
      addBall(grid.x[i], grid.y[i], i);
    }

  }
}();
