rbvj = function () {

  clearAll();
  var balls = [];
  var grid;

  ctx.lineWidth = 0.2;
  var mode = 7;
  var speed = 1;
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
    if (chance(300)) reset();

      ctx.background(0);

    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      moveBall(b);
    }

    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      drawBall(b);
    }
    //mirror();
    if (pix) pixelate(40);
    //triangulate(40);
  }


  function moveBall(b){
      //var m = Math.round(Mic.spectrum.length/2);
      if (mode == 0) {
        var new_me = b.me%50;
        //var s = map(audioChannelVolume[new_me], 0, 200, 4, grid.spacing_y/2);
        var s = Sound.mapSound(b.me, balls.length *2, 10, 100);
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

      if(s > 0) b.sz = tween(b.sz, s, 32);


      b.y -= speed;

      if( b.x > w) b.x = 0;
      if( b.x < 0) b.x = w;
      if( b.y > h) b.y = 0;
      if( b.y < 0) b.y = h;
  }


  function drawBall(b){
    var s = Math.round(map(b.sz, 0, grid.spacing_y, 0, colours.pool.length-1))
    //console.log(s);
    ctx.fillStyle = colours.get(s);
      if (mode == 6) {
        ctx.fillEllipse(b.x, b.y - b.sz, b.sz/2, b.sz/2);
      } else if (mode == 7) {
        //ctx.fillStyle = rgb(255);
        ctx.fillRect(b.x - b.sz/2, b.y, b.sz, grid.spacing_y/2);
      } else {
        ctx.fillRect(b.x - b.sz/2, b.y - b.sz, grid.spacing_x - 2, b.sz);
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
