rbvj = function(){

  var gw = 40;
  var gh = 30;
  var grid = new particleEngine(gw, gh);
  var grid2 = new particleEngine(gw, gh);
  var hit_dist = 140;
  var sz = 10;
  var tween_speed = 10;

  ctx.font="12px Arial";

  console.log(grid);

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    var g2 = grid.particles[i];
    g.sz = sz;
    g.orig = new Vector(g.pos.x, g.pos.y);
    g2.orig = new Vector(g2.pos.x, g2.pos.y);
    g.old_me = g.me;
    g2.old_me = g2.me;
    g.start_sz = sz;
    if(chance(2)) {
      g.on = true;
      g.open = false;
    } else {
      g.on = false;
      g.open = true;
    }
  }

  ctx.background(0);


  draw = function() {

    ctx.background(0, 0.1);
    ctx2.clearRect(0, 0, w, h);
    ctx.fillStyle = colours.get(colour_count);
    ctx2.fillStyle = colours.get(colour_count);
    //ctx.fillStyle = "white";
    //ctx2.fillStyle = "white";
    //ctx2.fillStyle = "black";

    if (chance(20)) shuffleGrid();
    moveGrid();
    drawGrid();

  }

  function newPosX(g){

    if (g.on) {
      //console.log(g);
      var row = g.row;
      var col = g.col;
      var old_pos = col + (row * grid.grid.num_items_horiz);
      var new_col = randomInt(grid.grid.num_items_horiz-1);
      var new_pos = new_col + ( row * (grid.grid.num_items_horiz));

      var p = grid.particles[new_pos];
      var g2 = grid2.particles[old_pos];
      //console.log(g2);
      if(col != new_col && p.open == true && !p.on) {
        p.open = false;
        p.on = true;
        g.open = true;
        g.on = false;
        p.pos.x = g.pos.x;
        p.target.x = p.start.x;
        p.old.x = g2.old.x;
        p.old_me = g2.old_me;
      }
    }
  }

  function newPosY(g){

    if (g.on) {
      //console.log(g);
      var row = g.row;
      var col = g.col;
      var old_pos = col + (row * grid.grid.num_items_horiz);
      var new_row = randomInt(grid.grid.num_items_vert-1);
      var new_pos = col + ( new_row * (grid.grid.num_items_horiz));

      var p = grid.particles[new_pos];
      var g2 = grid2.particles[old_pos];
      // console.log(g.me + " old: " + row + ":" + col + " - " + old_pos);
      // console.log(p.me + " new: " + new_row + ":" + col + " - " + new_pos);
      p.open = false;
      p.on = true;
      g.open = true;
      g.on = false;
      p.pos.y = g.pos.y;
      p.target.y = p.start.y;
      p.old.y = g2.old.y;
      p.old_me = g2.old_me;
    }

  }

  function shuffleGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      if (Math.round(g.pos.x) == Math.round(g.target.x) && Math.round(g.pos.y) == Math.round(g.target.y) && chance(10)) newPosX(g);
      if (Math.round(g.pos.x) == Math.round(g.target.x) && Math.round(g.pos.y) == Math.round(g.target.y) && chance(10)) newPosY(g);
      }
  }


  function moveGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      g.pos.x = tween(g.pos.x, g.target.x, tween_speed);
      g.pos.y = tween(g.pos.y, g.target.y, tween_speed);
    }
  }

  function drawGrid(){
    ctx.fillStyle = colours.get(colour_count);
    var c = ctx.getCurrentFillValues();
    ctx.strokeStyle = rgb( c.r, c.g, c.b, 0.2 );
    ctx2.strokeStyle = rgb( c.r, c.g, c.b, 0.2 );
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      var g2 = grid2.particles[i];
      //ctx.fillStyle = "white";


      //ctx.strokeStyle = rgba(255, 0.2);
      if(dist(g.old.x, g.old.y, g.pos.x, g.pos.y) < 150) {
      //ctx.line(g.old.x, g.old.y, g.pos.x, g.pos.y);
        //if(g.old.x != g.pos.x && g.old.y != g.pos.y)
        //ctx.fillStyle = rgba(255, 0.2);
        //ctx.fillEllipse(g.old.x, g.old.y, 26, 26);
      }
      //ctx.fillStyle = "red";
      //ctx.fillEllipse(g.start.x, g.start.y, 4, 4);

      if(g.on) {
        ctx.fillStyle = colours.get(colour_count);
        //ctx.fillStyle = "white";
        //ctx.fillText(g2.old_me, g.pos.x, g.pos.y + 20);
        // if (chance(4)) {
        //   var s = Sound.mapSound(i, grid.length * 2, 2, 7);
        // } else {
          var s = 6;
        //}

        ctx2.LfillEllipse(g.pos.x, g.pos.y, s, s);

      for (var j = i+1; j < grid.length-1; j++) {
        var gg = grid.particles[j];
        if(dist(gg.pos.x, gg.pos.y, g.pos.x, g.pos.y) < 30) {
          ctx.line(gg.pos.x, gg.pos.y, g.pos.x, g.pos.y);
          //ctx2.LfillEllipse(gg.pos.x, gg.pos.y, 6, 6);
        }
      }
      }

    }
  }


}();
