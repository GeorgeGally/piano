rbvj = function() {

  clearAll();

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  var grid = new Grid(20, 10);
  var nums = [3, 3, 4, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 30, 32, 34]
  grid.sides = [];
  grid.r = [];

  for (var i = 0; i < grid.length; i++) {
    grid.sides[i] = 2;
    grid.r[i] = randomInt(4) * 90;
  }

  var counter = 0;

  draw = function() {
    ctx.background(0);

    if (frameCount % 4 == 0) {
      for (var i = grid.num_items_vert; i > 0; i--) {
        var pos = i * grid.num_items_horiz + counter;
        //var pos2 = i*grid.num_items_horiz + (counter+1)%grid.num_items_vert;
        var s = Math.round(Sound.mapSound(i / 2, grid.num_items_vert * 2, 0, 4));

        if (s < 2) {
          grid.sides[pos] = 1;
        } else {
          grid.sides[pos] = s - 2;
        }
        //grid.sides[pos2] = 2;
      }
      // counter = Math.round(grid.num_items_horiz/2 + Math.sin(frameCount/12)*grid.num_items_horiz/2);
      counter++;
    }
    for (var i = 0; i < grid.length; i++) {
      var sides = grid.sides[i];
      ctx.save();
      ctx.translate(grid.x[i], grid.y[i]);
      ctx.rotateDeg(grid.r[i]);
      Block(0, 0, grid.spacing.y, sides);
      ctx.restore();
    }

    if (counter >= grid.num_items_horiz) {
      counter = 0;
    }


  }



  function Block(startx, starty, block_size, num_stripes) {
    // if(num_stripes < 2) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";

    startx -= this.block_size / 2;
    starty -= this.block_size / 2;
    this.block_size = block_size;
    this.rot = 0;
    this.spacing = block_size / num_stripes;
    this.stripes = [];
    var count = 0;

    for (var x1 = 0; x1 < this.block_size; x1 += this.spacing) {
      this.stripes[count] = new Stripes(x1, 0, this.block_size, this.block_size - x1);
      count++;
    }

    for (var y1 = 0; y1 < this.block_size; y1 += this.spacing) {
      this.stripes[count] = new Stripes(0, y1, this.block_size - y1, this.block_size);
      count++;
    }

    function Stripes(x1, y1, x2, y2) {
      this.x1 = x1 || 0;
      this.y1 = y1 || 0;
      this.x2 = x2 || 0;
      this.y2 = y2 || 0;
    }

    this.drawStripes = function() {
      ctx.fillRect(startx, starty, this.block_size, this.block_size);
      for (var i = 0; i < this.stripes.length; i++) {
        ctx.line(startx + this.stripes[i].x1, starty + this.stripes[i].y1, startx + this.stripes[i].x2, starty + this.stripes[i].y2);
      }
      ctx.strokeRect(startx, starty, this.block_size, this.block_size);
    }

    this.drawStripes();
  }





}();
