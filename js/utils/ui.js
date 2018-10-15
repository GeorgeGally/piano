var cursor = false;

function showMouse(){
  console.log("showMouse");
  cursor = !cursor;
  if(cursor) {
    window.document.body.style.cursor = 'auto';
  } else {
    window.document.body.style.cursor = 'none';
  }
}

var colours = new colourPool()
.add('#FFFFFF')
.add('#99B898')
.add('#FECEAB')
.add('#FF847C')
.add('#E84A5F')
.add('#2A363B');


var colours2 = new colourPool()
.add('#FFFFFF')
.add('#A8A7A7')
.add('#CC527A')
.add('#E8175D')
.add('#474747')
.add('#363636');

var colours3 = new colourPool()
.add('#FFFFFF')
.add('#E1F5C4')
.add('#EDE574')
.add('#F9D423')
.add('#FC913A')
.add('#FF4E50');

var colours4 = new colourPool()
.add('#FFFFFF')
.add('#E5FCC2')
.add('#9DE0AD')
.add('#45ADA8')
.add('#547980')
.add('#594F4F');


function changeColourFwd() {
  colour_count = (colour_count + 1);
  if (colour_count > colours.pool.length - 1 ) colour_count = 0;
  console.log("colour_count: " + colour_count);
  ctx.fillStyle = rgb( colours.get(colour_count) );
  ctx.strokeStyle = rgb( colours.get(colour_count) );
}

function changeColourBwd() {
  colour_count = (colour_count - 1);
  if( colour_count < 0 ) colour_count = colours.pool.length;
  console.log("colour_count: " + colour_count);
  ctx.fillStyle = rgb( colours.get(colour_count) );
  ctx.strokeStyle = rgb( colours.get(colour_count) );
}
