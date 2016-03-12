var output = document.getElementById("output");
var running = false;
var time = "time";
var myVar;

document.addEventListener("keyup", function(event) {
	if (event.keyCode == 32 && !running) {
		running = true;
		startTimer();
	} else if (event.keyCode == 32 && running) {
		running = false;
	}
});

document.addEventListener("keydown", function(event) {
	if (event.keyCode == 32 && running) {
		stopTimer();
	}
})

function startTimer() {

	var start = new Date().getTime();

	myVar = setInterval(function()
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
		time = secs + "." + millis;
	    output.innerHTML = time;
	    }, 10);
};

function stopTimer() {
	clearInterval(myVar);
}