rbvj = function () {

  var camera, tick = 0,
    scene, renderer, clock = new THREE.Clock(),
    controls, container;

  var sphere, texture, material, geometry;

  var particles = new particleEngine( 8000 );

  hidden_ctx.lineWidth = 0.2;
  ctx.clearRect( 0, 0, w, h );
  ctx2.clearRect( 0, 0, w, h );
  ctx3.clearRect( 0, 0, w, h );

  hidden_ctx.background( 0 );
  //hidden_ctx.strokeStyle = rgba(0, 0,0, 0.5);
  var cnt = particles.particles.length;
  for ( var i = 0; i < cnt; i++ ) {
    p = particles.particles[ i ];

    p.pos = new Vector( random( -w / 2, w ), randomSticky( -800, 0, 100 ) );
    p.old = new Vector( p.pos.x, p.pos.y );
    p.vel = new Vector( 0, 0 );
    p.acc = new Vector( 0, 0 );
    p.speed = random( 1, 5 ) / 1001;
    var c = random( 50, 225 );
    //p.c = rgb(c, random(0,125), 0);
    p.c = randomGrey( 100, 255, 0.8, 50 );
    p.l = random( 0.1, 1 );
    p.noisy = random( 1, 8 ) / 10001;

  }
  dirx = 10;


    container = document.getElementById( 'canvas3D' );
    camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( {
      alpha: true,
      //antialias: true
    } );
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight( 0xaaaaaa );
    scene.add( ambientLight );

    // add spotlight for the shadows
    var spotLight = new THREE.DirectionalLight( 0xffffff );
    spotLight.position.set( -20, 30, 40 );
    spotLight.intensity = 0.8;
    scene.add( spotLight );

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 2.2;
    controls.panSpeed = 1;
    controls.dynamicDampingFactor = 0.3;
    window.addEventListener( 'resize', onWindowResize, false );

    texture = new THREE.Texture( canvas );

    geometry = new THREE.SphereGeometry( 12, 80, 80 );
    material = new THREE.MeshPhongMaterial( {
      color: 0xefefef,
      map: texture
    } );
    material.map.minFilter = THREE.LinearFilter;
    material.generateMipmaps = false;
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

  draw = function () {

    hidden_ctx.background( 0, 0.1 );
    dirx = tween( dirx, Sound.getVol( 0, 60 ) - 30, 2 );
    for ( var i = 0; i < cnt; i++ ) {

      p = particles.particles[ i ];

      hidden_ctx.strokeStyle = rgb( Sound.mapSound( i, cnt * 2, 0, 255 ), 0.5 );
      p.l = tween( p.l, Sound.mapSound( i, cnt * 2, 0, 1 ), 2 );
      hidden_ctx.lineWidth = p.l;
      p.old.x = p.pos.x;
      p.old.y = p.pos.y;

      p.vel.x = 10 * PerlinNoise.noise( 90 + p.pos.x * .005, 50 + p.pos.y * p.speed, p.noisy * .07 ) * Math.cos( 0.7 * PerlinNoise.noise( p.pos.x * .007, p.pos.y * .007, p.noisy * .9 ) );
      p.vel.y = 20 * PerlinNoise.noise( 90 + p.pos.x * .0007, 20 + p.pos.y * .0007, p.noisy * 19 ) * Math.sin( 0.3 * 22 / 7 * PerlinNoise.noise( p.pos.x * .007, p.pos.y * .007, p.noisy * 5 ) );

      p.pos.x += p.vel.x;
      p.pos.y += p.vel.y;
      hidden_ctx.line( p.pos.x, p.pos.y, p.old.x, p.old.y );

      if ( p.pos.y > h ) {
        p.pos.y = p.old.y = 0;
      }
      if ( p.pos.x > w ) {
        p.pos.x = 0;
        p.old.x = 0;
      }
      if ( p.pos.y < -h / 2 ) {
        p.pos.y = h;
        p.old.y = 0;
      }
      if ( p.pos.x < -w ) {
        p.pos.x = w;
        p.old.y = 0;
      }

      p.acc.x = 0;
      p.acc.y = 0;
      p.noisy += p.speed;
    }


    render();

  }

  function render() {
    texture.needsUpdate = true;
    var delta = clock.getDelta();
    tick += delta;
    scene.rotation.y -= 0.014;
    controls.update();
    renderer.render( scene, camera );
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

}();
