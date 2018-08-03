rbvj = function () {

  ctx.strokeStyle = rgba(0,0.8);
  ctx.lineWidth = 3;


  var time = 0;


  draw = function(){
      ctx.background(0, 0.02);
      ctx.fillStyle = rgb(255);
      ctx.save();
    	ctx.translate(w/2, h/2);

      for (var i = 0; i < 50; i++) {
      	ctx.rotate(radians(time));
          ctx.fillRect( 10+i*2, 0 ,  i*3+10,i*3+10);
          ctx.strokeRect( 10+i*2, 0 ,  i*3+10,i*3+10);
          time+=0.0005;
      }

      ctx.restore();

  }
}();
