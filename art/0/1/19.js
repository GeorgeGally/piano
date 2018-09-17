rbvj = function () {

  ctx.strokeStyle = rgb(255);

  var particles = [];
  var radius = 50;
  var num_particles = 8;
  var cols = ['#fdea00', '#50bfe8', '#f06724', '#8cc640'];
  var angle = 360/num_particles;
  var circ_sz = 300;
  var t_size = 350;
  var top_offset = 0;

  var s1 = 1;
  var s2 = -1;
  var extra = -6;
  var rr = 0;
  var t_size = 2;
  var rot = 0;
  var radius =200;
  var r = 0;
  ctx.lineWidth = 10;

  draw = function(){

  	rr+=0.01;

  	rot = Sound.mapSound(10, 100, 0, 40);
  	r = tween(r, rot, 10);
  	x = w/2;
  	y= h/2;

  	ctx.fillStyle = rgb(0);
  	ctx.fillRect(0, 0, w, h);
    //ctx.strokeStyle = rgb(255);
    ctx.strokeStyle = rgb( colours[colour_count] );


  var c = r;


  ctx.translate(w/2,h/2);
  drawBez(c*0.6, r*0.6);
  drawBez(c*0.8, r*0.8);
  drawBez(c, r);
  drawBez(c*1.2, r*1.2);
  drawBez(c*1.4, r*1.4);
  ctx.translate(-w/2,-h/2);

  }


  function drawBez(c, r){
  	drawCBez(0,-r, c*r,-r, r,-c*r, r,0);
  	drawCBez(r,0, r,c*r, c*r,r, 0,r);
  	drawCBez(0,r, -c*r,r, -r,c*r, -r,0);
  	drawCBez(-r,0, -r,-c*r, -c*r,-r, 0,-r);
  }

  function drawCBez(x0,y0,x1,y1,x2,y2,x3,y3){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    ctx.stroke();
  };


}();
