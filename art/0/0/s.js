rbvj = function () {

  clearAll();
  resize();
  var circSize= 30;
  var t = 0;
  var numDots = 120;
  var circs = [];
  // var hiFreq = 0;
  // var loFreq = 1000;
  var r = 250;
  var dir = 1;
  var counter = 0;
  var start = 0;
  ctx.lineWidth = 1;


    for (var i=0; i<numDots; i++){

      var circle =  {
        r: r,
        r2: r/22,
        me: i,
        x: r * Math.cos(t),
        y: r * Math.sin(t),
        x2: r/2 * Math.cos(t),
        y2: r/2 * Math.sin(t),
        theta: t
      }
      circs.push(circle);
      t  +=  radians(360/numDots);
    }

    for (var i=0; i<numDots; i++){
      drawCirc(circs[i],80);
    }


  draw = function ()  {

    ctx.background(0);

    for (var i = Math.abs(start); i < Math.round(Math.abs(counter)); i++){

      var vol = Sound.mapSound(i*2, 500, 0, 100);
      drawCirc(circs[i],vol);
      drawCirc2(circs[i],vol);
      ctx.save();
      ctx.translate(width/2, height/2);
      ctx.line(circs[i].x,circs[i].y,circs[i].x2,circs[i].y2);
      ctx.restore();

    }

    if (dir == 1) {

      if (counter<numDots ) {
        start = 0;
        counter+=0.2;
      } else {
        counter = numDots;
        dir =-1;
      }

    } else {

      if (start < numDots ) {
        start += 1;
      } else {
        counter = 0;
        dir = 1;
        start = 0;
      }

    }
    //console.log(counter);
  }



  function drawCirc2( p, _rr){
      // noStroke();
      p.r2 -= (p.r2-_rr)/5;
      p.r2 = clamp(p.r2, 80,400);

      ctx.strokeStyle = "#fff";
      ctx.strokeEllipse(p.x2+width/2, p.y2+height/2, p.r2/4, p.r2/4);

      ctx.strokeEllipse(p.x2+width/2, p.y2+height/2, 6, 6);

      p.x2 = p.r2 * Math.cos(p.theta);
      p.y2 = p.r2 * Math.sin(p.theta);

    }


  function drawCirc( p, _rr){
      // noStroke();
      p.r -= (r-_rr)/5;
      p.r = clamp(p.r, 140,400);
      //console.log(_rr)
      // //noFill();
      // //stroke(255,200);
      ctx.strokeStyle = "#fff";
      ctx.strokeEllipse(p.x+width/2, p.y+height/2, p.r/4, p.r/4);
      // //fill(255);

      ctx.strokeEllipse(p.x+width/2, p.y+height/2, 2, 2);
      // //stroke(255);
      // //pushMatrix();
      // translate(width/2, height/2);
      p.x = p.r * Math.cos(p.theta);
      p.y = p.r * Math.sin(p.theta);

    }


}();
