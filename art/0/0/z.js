rbvj = function () {

  var ctx = createCanvas('canvas1');
      var ctx2 = createCanvas('canvas2');
      ctx.background(0);
      // ctx.strokeWeight = 2;
      ctx.lineWidth = 2;
      ctx2.lineWidth = 2;
      ctx.background(0);


            //////////////////////// OBJECTS

            var MyCircle = function(x, y, r, c) {
              this.options = {
                friction: 0.9,
                restitution: 0.9,
                mass: r * 4,
                radius: r
              }
              this.r = r;
              this.c = c;
              // this.c = hsl(c, 90, 50);
              //this.c = randomGrey();

              this.body = Bodies.circle(x, y, this.r / 2, this.options);
              this.pos = this.body.position;

              World.add(world, this.body);
              //console.log(this.body);
              this.show = function() {
                this.pos = this.body.position;
                var angle = this.body.angle;

                this.r -= 0.08;
                this.body.radius = this.r/2;
                ctx.fillMe(this.c);
                ctx.save();
                ctx.translate(this.pos.x, this.pos.y);
                ctx.fillCircle(0, 0, this.r, this.r);
                // ctx.fillMe(255);
                // ctx.fillEllipse(0, 0, this.r/2, this.r/2);
                // ctx.strokeMe(255);
                // ctx.strokeEllipse(0, 0, this.r, this.r);
                ctx.restore();
                ctx2.fillMe(this.c);
                ctx2.fillCircle(this.pos.x, this.pos.y, this.r, this.r);
                // ctx2.strokeMe(0);
                // //ctx2.strokeCircle(this.pos.x, this.pos.y, this.r, this.r);
                // ctx2.fillMe(0);
                // ctx2.fillCircle(this.pos.x, this.pos.y, this.r/5, this.r/5);

              }
              this.isTooSmall = function() {
                var sz = this.r;
                //console.log(pos.y);
                return (sz < 2);
              }

              this.isOffScreen = function() {
                var pos = this.body.position;
                //console.log(pos.y);
                return (this.pos.y > h + 100);
              }

              this.removeFromWorld = function() {
                World.remove(world, this.body);
              }
            }


            function Obstacle(x, y, r) {

              this.x = x;
              this.y = y;
              this.r = r;

              this.options = {
                friction: 0.99,
                restitution: 0.1,
                isStatic: true
              }

              this.body = Bodies.circle(x, y, this.r/2, this.options);
              //this.body = Bodies.polygon(x, y, 3, this.r * 1.1, this.options);

              this.show = function() {

                ctx2.fillEllipse(0,0, this.r, this.r);
                // ctx2.restore();
              }

            }


      var colours5 = new colourPool()
        //

        //.add('#ECECEC')
        //.add('#CCCCCC')
        //.add('#CCFFCC')
        //.add('#333333')
        .add('#0095a8')
        .add('#00616f')
        .add('#FF3300')
        .add('#FF6600')
        //.add('#000000')
        .add('#ffc84f')
        .add('#FFFFFF')
        .add('#FFFF00')
        //.add('#FF00FF')
      ;


      var grid = new Grid(1, 1, w / 2, h / 2, w / 4, h / 4)

      var threshold_res = 4;
      var threshold_ammt = 81;

      var blur_ammt = 4;
      var blur_pass = 8;
      var contrast = 22;


      var MatterEngine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Body = Matter.Body,
        Bodies = Matter.Bodies;


      var engine, world;
      var circles = [];
      var boundries = [];

      var radius = 140;
      console.log(grid);


        matter_engine = MatterEngine.create();
        matter_engine.density = 0.008;
        //matter_engine.restitution = 0.5;
        //frictionAir: 0.06,
        //restitution: 0.3}
        world = matter_engine.world;
        MatterEngine.run(matter_engine);

        var offset = 5;


        options = {
          friction: 0.9,
          restitution: 0.4,
          isStatic: true
        }

        //var topWall = Bodies.rectangle(400, 0, 810, 30, options);
        var leftWall = Bodies.rectangle(-100, 0, 200, h * 2, options);
        var rightWall = Bodies.rectangle(w + 100, 0, 200, h * 2, options);
        var topWall = Bodies.rectangle(w / 2, -100, w, 200, options);

        World.add(matter_engine.world, [leftWall, rightWall, topWall]);


        for (var i = 0; i < grid.length; i++) {
          var g = grid.grid[i];
          var x = g.x;
          var y = g.y;
        }


        for (var i = 0; i < 10; i++) {
          addCircle(255);
        }

        matter_engine.timing.timeScale = 0.9;
        matter_engine.world.gravity.x = 0;
        matter_engine.world.gravity.y = -1;


      draw = function () {

        ctx.background(0, 0.06);
        //ctx.fillStyle = rgb(255);
        //ctx.clearRect(0, 0, w, h);
        //ctx.clearRect(0, 0, w, h);
        ctx2.clearRect(0, 0, w, h);


      //  if (Sound.getVol() > 90) matter_engine.world.gravity.x = (posNeg() * 1.4);

        if (Sound.getVol() > 70) {
          matter_engine.world.gravity.y = -0.2;
        }
        if (Sound.getVol() > 30) {
          addCircle();
        }
        if (Sound.getVol() < 40) {
          matter_engine.world.gravity.x = 0;
          matter_engine.world.gravity.y = 0.11;
        }


        for (var i = 0; i < boundries.length; i++) {
          boundries[i].show();
        }

        for (var i = 0; i < circles.length; i++) {
          var b = circles[i];
          b.show();

          if (b.isOffScreen() || b.isTooSmall()) {
            b.removeFromWorld();
            circles.splice(i, 1);
            i--;
          }

        }

        //ctx.drawImage(hidden_canvas, 0, 0, w, h);

      }



      function addCircle() {
        var spectrum = Sound.spectrum;
        var freq = getNoteFromFFT(spectrum);
        var note = getNoteFreqPerc(spectrum);
        var note1 = (freq.substring(0, 1)).charCodeAt(0) - 65;
        //num = Math.round(map(note1, 0, 7, 0, colours5.pool.length));
        //console.log(freq + " : " + note1);
        //num = Math.round(i/matter_engine.particles.length * 360);
        //console.log(num);
        var c = getColourFromNote();
        //var c = rgb(0, 0, 30 + note * 4)
        //var c = map(note, 0, 60, 90, 270);
        //var sz = map(note, 0, 80, 40, 180);
        var sz = 40;
        circles.push(new MyCircle(random(w), h + sz + random(30), sz, c));

      }




      function mouseMoved() {
        circles.push(new Box(mouseX, mouseY, 2));
      }



}();
