rbvj = function () {

  clearAll();

  ctx.lineWidth = 1;


  var x = w / 2;
  var y = h / 2;
  ctx.background( 0 );
  var hue = 0;
  ctx.strokeStyle = hsl( hue, 60, 10 );
  var x_offset = 0;
  var y_offset = 0;

  draw = function () {

    ctx.globalCompositeOperation = "screen";
    // ctx.strokeStyle = rgba(255, 0.1);
    hue = Math.abs( Math.sin( frameCount / 1000 ) ) * 200
    ctx.strokeStyle = hsl( hue, 60, 10 );
    //if (chance(50)) ctx.strokeStyle = getColourFromNote();
    x_offset = Math.cos( frameCount / 100 );
    x = w / 2 + Math.sin( frameCount / 200 ) * ( w / 4 * x_offset );
    y = h / 2 + Math.sin( frameCount / 400 ) * h / 4;
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    //var note = getNoteNumberFromFFT( spectrum );
    var note1 = ( freq.substring( 0, 1 ) ).charCodeAt( 0 ) - 65;
    //num = Math.round( map( note1, 0, 7, 0, 4 ) );
    ctx.HstrokeEllipse( x, y, 200, 200 );

    //mirror();
    //mirror(2);

  }






}();
