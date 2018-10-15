rbvj = function () {

  var fov = 240;

  var point = [];
  var points = [];
  var point3d = [];
  var angleX = 0;
  var angleY = 0;
  var HALF_WIDTH = width / 2;
  var HALF_HEIGHT = height / 2;

  var x3d = 0;
  var y3d = 0;
  var z3d = 0;

  var lastScale = 0;
  var lastx2d = 0;
  var lasty2d = 0;

  var size = 150;
  var dim = 80;
  var spacing;
  var numPoints;

  spacing = ( ( Math.PI * 2 ) / dim );
  numPoints = dim * dim;
  points = [];
  ctx.fillStyle = colours.get(colour_count);
  ctx.strokeStyle = rgb(0);

  for ( var i = 0; i < dim; i++ ) {

    var z = size * Math.cos( spacing / 2 * i );
    var s = size * Math.sin( spacing / 2 * i );

    for ( var j = 0; j < dim; j++ ) {

      var point = [ Math.cos( spacing * j ) * s, Math.sin( spacing * j ) * s, z ];
      points.push( point );


    }

  }



  draw = function () {

    ctx.background( 0, 0.08 );


  }




}();
