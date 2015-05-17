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

document.addEventListener('keyup', function(event) {
	if (event.keyCode == 32 && running == 0) {
		running = 1;
		increment();
	}
});

document.addEventListener('keydown', function(event) {
	if (event.keyCode == 32 && running == 1 && paused == false) {
		running = 0;
		time = 0;
	}
});