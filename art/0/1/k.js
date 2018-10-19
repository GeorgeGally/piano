rbvj = function () {

  var grid = new Grid( 1, 1, w / 2, h / 2, w / 4, h / 4 )

  ctx.background( 0 );
  hidden_ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );
  
  colour_count = 4;

  var MatterEngine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

  var matter_engine, world;
  var circles = [];
  var boundries = [];

  var radius = 140;


  //////////////////////// OBJECTS

  var MyCircle = function ( x, y, r, c ) {
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
      this.r -= 0.1;
      ctx.fillMe( this.c );
      ctx.save();
      ctx.translate( this.pos.x, this.pos.y );
      ctx.fillCircle( 0, 0, this.r, this.r );

      ctx.restore();
      ctx2.fillMe( 0 );
      ctx2.fillCircle( this.pos.x, this.pos.y, this.r, this.r );
      ctx2.strokeMe( 255 );
      ctx2.strokeCircle( this.pos.x, this.pos.y, this.r, this.r );
      ctx2.fillMe( 255 );
      ctx2.fillCircle( this.pos.x, this.pos.y, this.r / 5, this.r / 5 );

    }

    this.isTooSmall = function () {
      var sz = this.r;
      return ( sz < 2 );
    }

    this.isOffScreen = function () {
      var pos = this.body.position;
      return ( this.pos.y > h + 100 );
    }

    this.removeFromWorld = function () {
      World.remove( world, this.body );
    }
  }


  matter_engine = MatterEngine.create();
  matter_engine.density = 0.008;

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

  matter_engine.timing.timeScale = 0.4;
  matter_engine.world.gravity.x = 0;
  matter_engine.world.gravity.y = -1;


  for ( var i = 0; i < grid.length; i++ ) {
    var g = grid.grid[ i ];
    var x = g.x;
    var y = g.y;
  }


  for ( var i = 0; i < 10; i++ ) {
    addCircle( 255 );
  }




  draw = function () {

    ctx.background( 0, 0.09 );
    ctx2.clearRect( 0, 0, w, h );


    if ( Sound.getVol() > 90 ) matter_engine.world.gravity.x = ( posNeg() * 1.02 );

    if ( Sound.getVol() > 70 ) {
      matter_engine.world.gravity.y = -0.4;
    }

    if ( Sound.getVol() > 50 ) {
      //appParticle(x, random(200));
      addCircle();
    }

    if ( Sound.getVol() < 60 ) {
      matter_engine.world.gravity.x = 0;
      matter_engine.world.gravity.y = 0.2;
    }


    for ( var i = 0; i < boundries.length; i++ ) {
      boundries[ i ].show();
    }

    for ( var i = 0; i < circles.length; i++ ) {
      var b = circles[ i ];
      b.show();

      if ( b.isOffScreen() || b.isTooSmall() ) {
        b.removeFromWorld();
        circles.splice( i, 1 );
        i--;
      }

    }

  }



  function addCircle() {
    var spectrum = Sound.spectrum;
    var note = getNoteFreqPerc( spectrum );
    var c = getColourFromNote();
    //var c = rgb(0, 0, 30 + note * 4)
    //var c = map(note, 0, 60, 90, 270);
    var sz = map( note, 0, 80, 50, 150 );
    circles.push( new MyCircle( random( w ), h + sz + random( 30 ), sz, c ) );

  }



  function mouseMoved() {
    circles.push( new Box( mouseX, mouseY, 2 ) );
  }

}();
