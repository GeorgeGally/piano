rbvj = function () {

  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );
  hidden_ctx.lineWidth = 2;
  ctx.background( 0 );
  colour_count = 2;
  colours = palettes [ colour_count];
  var grid = new Grid( 1, 1, w / 2, h / 2, w / 4, h / 4 )

  var MatterEngine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

  var world;
  var circles = [];
  var boundries = [];

  var radius = 140;

  matter_engine = MatterEngine.create();
  matter_engine.density = 0.008;
  //matter_engine.restitution = 0.5;
  //frictionAir: 0.06,
  //restitution: 0.3}
  world = matter_engine.world;
  MatterEngine.run( matter_engine );

  var offset = 5;


  options = {
    friction: 0.9,
    restitution: 0.4,
    isStatic: true
  }

  //var topWall = Bodies.rectangle(400, 0, 810, 30, options);
  var leftWall = Bodies.rectangle( -100, 0, 200, h * 2, options );
  var rightWall = Bodies.rectangle( w + 100, 0, 200, h * 2, options );
  var topWall = Bodies.rectangle( w / 2, -100, w, 200, options );

  World.add( matter_engine.world, [ leftWall, rightWall, topWall ] );


  //////////////////////// OBJECTS

  var Circ = function ( x, y, r, c ) {
    this.options = {
      friction: 0.9,
      restitution: 0.2,
      mass: r * 4
    }
    this.r = r;
    this.c = c;

    this.body = Bodies.circle( x, y, this.r / 2, this.options );
    this.pos = this.body.position;

    World.add( world, this.body );

    this.show = function () {
      this.pos = this.body.position;
      var angle = this.body.angle;

      ctx.fillMe( this.c );
      ctx.save();
      ctx.translate( this.pos.x, this.pos.y );
      ctx.fillEllipse( 0, 0, this.r, this.r );
      ctx.restore();
      ctx2.fillMe( 0 );
      ctx2.fillEllipse( this.pos.x, this.pos.y, this.r, this.r );
      // ctx2.strokeMe(255);
      // ctx2.strokeEllipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.isOffScreen = function () {
      var pos = this.body.position;
      return ( this.pos.y > h + 100 );
    }

    this.removeFromWorld = function () {
      World.remove( world, this.body );
    }
  }



  for ( var i = 0; i < grid.length; i++ ) {
    var g = grid.grid[ i ];
    var x = g.x;
    var y = g.y;
  }


  for ( var i = 0; i < 10; i++ ) {
    addCircle( 255 );
  }

  matter_engine.timing.timeScale = 0.6;
  matter_engine.world.gravity.x = posNeg() * 0.4;
  matter_engine.world.gravity.y = -1;

  draw = function () {

    ctx2.clearRect( 0, 0, w, h );
    if ( chance( 100 ) ) matter_engine.world.gravity.x *= posNeg();

    if ( Sound.getVol() > 65 ) {

      matter_engine.world.gravity.y = -0.3;
      addCircle();

    } else if ( Sound.getVol() < 55 ) {
      matter_engine.world.gravity.x = matter_engine.world.gravity.x *= posNeg();
      matter_engine.world.gravity.y = 0.28;

    }


    for ( var i = 0; i < boundries.length; i++ ) {
      boundries[ i ].show();
    }

    for ( var i = 0; i < circles.length; i++ ) {
      var b = circles[ i ];
      b.show();

      if ( b.isOffScreen() ) {
        b.removeFromWorld();
        circles.splice( i, 1 );
        i--;
      }

    }

  }



  function addCircle() {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteNumberFromFFT( spectrum );
    var c = getColourFromNote();
    var sz = map( note, 0, 60, 30, 60 );
    circles.push( new Circ( random( w ), h + sz + random( 30 ), sz, c ) );

  }



}();
