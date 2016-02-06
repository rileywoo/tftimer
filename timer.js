var output = document.getElementById("output");


document.addEventListener("keydown", function(event) {
	if (event.keyCode == 32) {
		startTimer();
	}
}
);

var start = new Date().getTime();

function startTimer() {
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
