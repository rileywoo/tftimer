var time = 0;
var running = 0;

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
	document.getElementById("output").innerHTML = "00:00:00";

}

function increment() {
	if (running == 1) {
		setTimeout(function() {
			time++;
			var mins = Math.floor(time/100/60);
			var secs = Math.floor(time/100);
			var millis = time;

			if (millis == 100) {
				millis = 0;
			}

			if (secs < 10) {
				secs = "0" + secs;
			}

			document.getElementById("output").innerHTML = secs + "." + millis;
			increment();
		}, 10)
	}
}