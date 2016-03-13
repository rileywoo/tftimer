var output = document.getElementById("output");
var running = false;
var myVar;
var time;
var times = [];
var times_list = document.getElementById("times_list");
var bestTime = Number.POSITIVE_INFINITY;
var bestTimeDisplay = document.getElementById("best_solve")
var worstTime = -1;
var worstTimeDisplay = document.getElementById("worst_solve");
var bestAvg5 = Number.POSITIVE_INFINITY;
var bestAvg5Display = document.getElementById("best_avg5");
var currentAvg5Display = document.getElementById("current_avg5");

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
});

function reset() {
	output.innerHTML = "tfti";
	times = [];
	times_list.value = times.toString();
}

function startTimer() {

	var start = new Date().getTime();

	myVar = setInterval(function()
	{
	    time = new Date().getTime() - start;
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
}

function stopTimer() {
	clearInterval(myVar);
	times.push(time);
	times_list.value = times.toString();
	calcStats(parseFloat(time));
}

function calcStats(value) {
	if (value < bestTime) {
		bestTime = value;
		bestTimeDisplay.innerHTML = "Best solve: " + value;
	}
	console.log("hi");
	if (value > worstTime) {
		worstTime = value;
		worstTimeDisplay.innerHTML = "Worst solve: " + value;
	}
	if (times.length >= 5) {
		calcAvg5();
	}
}

function calcAvg5() {
	var last_five = times.slice(times.length-5, times.length);
	var total = 0;
	var best = parseFloat(last_five[0]);
	var worst = best;
	for (i = 0; i < last_five.length; i += 1) {
		var current_time = parseFloat(last_five[i]);
		if (current_time > worst) {
			worst = current_time;
		} else if (current_time < best) {
			best = current_time;
		}
		total += current_time;
	}
	total -= best + worst;
	var avg5 = total / 3;
	console.log(bestAvg5);
	if (avg5 < bestAvg5) {
		bestAvg5 = avg5;
		bestAvg5Display.innerHTML = "Best average of 5: " + avg5;
	}
	currentAvg5Display.innerHTML = "Current average of 5: " + avg5;
}
