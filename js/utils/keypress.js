

function onKeyDown(event) {

		//console.log(event.keyCode);
    var keyCode = event.keyCode;

    // CHANGE FILE // keys a-z
    if (keyCode >= 65 && keyCode <= 90) {
      changeFile(keyCode - 65);

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
			Sound.volume_adjust -=1;
			Sound.peak_volume-=1;
			//if (Sound.volume_adjust < 0) Sound.volume_adjust = 0;
			console.log("volume_adjust: " + Sound.volume_adjust);
    } else if (keyCode == 190 ) {
			Sound.volume_adjust +=1;
			Sound.peak_volume+=1;
			console.log("volume_adjust: " + Sound.volume_adjust);
		}

}

// window.addEventListener('keydown', function(e) {
//     if (typeof onKeyDown == 'function') onKeyDown(e);
//   });
