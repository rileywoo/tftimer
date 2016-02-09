var output = document.getElementById("output");
var running = false;
var time = "time";

document.addEventListener("keydown", function(event) {
	if (event.keyCode == 32 && !running) {
		running = true;
		startTimer();
	}
});


function startTimer() {

	var start = new Date().getTime();

	window.setInterval(function()
	{
	    var time = new Date().getTime() - start;
	    var secs = Math.floor(time / 1000 % 60);
	    var millis = time % 1000;

	    if (millis < 100) {
	    	millis = "0" + millis;
	    }
		if (millis < 10) {
			millis = "0" + millis;
		}
	    output.innerHTML = secs + "." + millis;
	    }, 10);
};