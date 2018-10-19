

function onKeyDown(event) {

		//console.log(event.keyCode);
    var keyCode = event.keyCode;
    //console.log(event);
    // CHANGE FILE // keys a-z
    if (keyCode >= 65 && keyCode <= 90) {
      ctx.background(0);
      ctx2.clearRect(0, 0, w, h);
      ctx3.clearRect(0, 0, w, h);
      changeFile(event.key);

      // CHANGE SET AND BANK // keys 0-9
    } else if (keyCode >= 48 && keyCode <= 57) {

			if(event.shiftKey) {
	      changeSet(keyCode-48);
			} else {
				changeBank(keyCode-48);
			}

      // ~ SHOW MOUSE
    } else if (keyCode == 192) {
      showMouse();
      // CHANGE SET AND BANK // keys 0-9
    } else if (keyCode == 219) {
      changeColourBwd();
    } else if (keyCode == 221) {
      changeColourFwd();
      // <> sign volume adjust
    } else if (keyCode == 188 ) {
      speedAdjust(-0.1);
			// Sound.volume_adjust -=1;
			// Sound.peak_volume-=1;
			// //if (Sound.volume_adjust < 0) Sound.volume_adjust = 0;
			console.log("speedAdjust: " + speed_reduce);
    } else if (keyCode == 190 ) {
      speedAdjust(0.1);
			// Sound.volume_adjust +=1;
			// Sound.peak_volume+=1;
			console.log("speedAdjust: " + speed_reduce);
		}

}

function speedAdjust(speed){

  speed_reduce *=  1 + speed;

}
// window.addEventListener('keydown', function(e) {
//     if (typeof onKeyDown == 'function') onKeyDown(e);
//   });
