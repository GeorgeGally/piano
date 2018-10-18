var rbvj;

// add drawing canvases
var hidden_canvas;
var ctx = createCanvas( 'canvas1' );
var ctx2 = createCanvas( 'canvas2' );
var ctx3 = createCanvas( 'canvas3' );
var renderer;
var hidden_ctx = createHiddenCanvas( 'canvas4' );



// setFileLocation to defaults
// keys A-Z change files
// keys 0-9 change banks
// keys SHIFT 0-9 change sets

// files are stored in /art
// art/currentSet/currentBank/currentFile

var art_location = "/art";

var fileref;
var current_file = 'a';
var current_set = 0;
var current_bank = 0;

var colour_count = 0;

function setup() {
  renderer = new THREE.WebGLRenderer( {
    alpha: true,
    antialias: true
  } );

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.localClippingEnabled = true;
  document.getElementById( "canvas3D" ).appendChild( renderer.domElement );

  checkLocationHash();


}


// FILE LOADER FUNCTIONS

function changeFile( file ) {
  reset();
  console.log(file);
  current_file = file;
  // var loc = current_set + '/' + current_bank + '/' + current_file;
  var loc = current_bank + '/' + current_file;
  var filename = 'art/0/' + loc + '.js';
  loadJS( filename );
  document.location.hash = loc;
  ctx.background(0);
  ctx2.clearRect( 0, 0, w, h );
  ctx3.clearRect( 0, 0, w, h );
  //console.log("File: " + loc);
}


function changeSet( set ) {
  current_set = set;
  current_bank = 0;
  console.log( "changeSet: " + current_bank );
  // reset
  //changeFile( 'a' );
}


function changeBank( bank ) {
  current_bank = bank;
  console.log( "changeBank: " + current_bank );
  changeFile( 'a' );
}


function reset(){

  ctx.background(0);
  ctx2.clearRect( 0, 0, w, h );
  ctx3.clearRect( 0, 0, w, h );
  ctx.lineCap = "butt";
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation = "normal";
  frameRate = 30;
}


function checkLocationHash(){
  if (window.location.hash) {
  //var set = window.location.hash.substr(1, 1);
  var bank = window.location.hash.substr(1, 1);
  file = window.location.hash.substr(3);
  console.log("bank:" + bank);

  //changeSet( set );
  changeBank( bank );
  current_file = file;
  console.log("current_file:" + current_file);
  changeFile( current_file );
  } else {
  changeFile( current_file );
  }
}

// INJECT JS ONTO PAGE


function loadJS( filename ) {

  if ( fileref != undefined ) document.getElementsByTagName( "head" )[ 0 ].removeChild( fileref );
  fileref = document.createElement( 'script' );
  fileref.setAttribute( "type", "text/javascript" );
  fileref.setAttribute( "src", filename );
  document.getElementsByTagName( "head" )[ 0 ].appendChild( fileref );

}
