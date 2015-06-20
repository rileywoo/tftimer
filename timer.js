/*
var time = 0;
var running = 0;
paused = true;

function startPause() {
	if (running == 0) {
		running = 1;
		increment();
		document.getElementById("startPause").innerHTML = "Pause";
	}
	else
	{
		running = 0;
		document.getElementById("startPause").innerHTML = "Pause";
	}
}

function reset() {
	running = 0;
	time = 0;
	document.getElementById("startPause").innerHTML = "Start";
	document.getElementById("output").innerHTML = "00:00.00";

}

function increment() {
	if (running == 1) {
		setTimeout(function() {
			paused = false;
			time++;
			var mins = Math.floor(time / 100 / 60);
			var secs = Math.floor(time / 100 % 60);
			var millis = time % 100;

			if (secs < 10) {
				secs = "0" + secs;
			}

			if (millis < 10) {
				millis = "0" + millis;
			}

			document.getElementById("output").innerHTML = mins + ":" + secs + "." + millis;
			increment();
		}, 10)
	}
}
*/


var start = new Date().getTime(),
    elapsed = '0.0';

document.addEventListener('keydown', function(event) {
	if (event.keyCode == 32) {
		startTimer();
	}
}
function startTimer() {
	setInterval(function()
	{
	    var time = new Date().getTime() - start;
	    var secs = Math.floor(time / 1000 % 60);
	    var millis = time % 1000;

	    if (millis < 100)
	    {
	    	millis = "0" + millis;
	    }
		if (millis < 10) {
			millis = "0" + millis;
				}
	    // document.getElementById("output").innerHTML = elapsed;
	    document.getElementById("output").innerHTML = secs + "." + millis;
	    }
	}, 10);
}
