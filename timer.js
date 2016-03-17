var output = document.getElementById("output");
var totalSolvesDisplay = document.getElementById("total_solves");
var bestTimeDisplay = document.getElementById("best_solve");
var worstTimeDisplay = document.getElementById("worst_solve");
var bestAvg5Display = document.getElementById("best_avg5");
var currentAvg5Display = document.getElementById("current_avg5");
var bestAvg12Display = document.getElementById("best_avg12");
var currentAvg12Display = document.getElementById("current_avg12");
var bestAvg100Display = document.getElementById("best_avg100");
var currentAvg100Display = document.getElementById("current_avg100");
var inspectionDisplay = document.getElementById("use_inspection");
var lastScrambleDisplay = document.getElementById("lastScrambleText");
var times_list = document.getElementById("times_list");
var running = false;
var use_inspection = false
var lastScramble = "";
var lastScrambleActual = "";
var time;
var times = [];
var totalSolves = 0;
var myVar;
var bestTime = Number.POSITIVE_INFINITY;
var worstTime = -1;
var bestAvg5 = Number.POSITIVE_INFINITY;
var bestAvg12 = Number.POSITIVE_INFINITY;
var best_avg100 = Number.POSITIVE_INFINITY;
var best_averages={ 
     "best_avg5":Number.POSITIVE_INFINITY, 
     "best_avg12":Number.POSITIVE_INFINITY, 
     "best_avg100":Number.POSITIVE_INFINITY
};

scramble();

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
		lastScrambleDisplay.innerHTML = "";
		stopTimer();
	} else if (event.keyCode == 32 && !running) {
		output.innerHTML = "Ready";
	}
});

function showLastScramble() {
	lastScrambleDisplay.innerHTML = lastScrambleActual;
}

function useInspection() {
	if (!use_inspection) {
		inspectionDisplay.innerHTML = "Inspection: On";
		use_inspection = true;
	} else {
		inspectionDisplay.innerHTML = "Inspection: Off";
		use_inspection = false;
	}
}

function plusTwo() {
	times[times.length - 1] += 2;
	times_list.value = times.toString();
	// working on this later
}

function reset() {
	output.innerHTML = "tfti";
	times = [];
	times_list.value = times.toString();
	totalSolves = 0;
	bestTime = Number.POSITIVE_INFINITY;
	worstTime = -1;
	bestAvg5 = Number.POSITIVE_INFINITY;
	bestAvg12 = Number.POSITIVE_INFINITY;
	bestAvg100 = Number.POSITIVE_INFINITY;
	bestTimeDisplay.innerHTML = "Best time: n/a";
	worstTimeDisplay.innerHTML = "Worst time: n/a";
	bestAvg5Display.innerHTML = "Best average of 5: n/a";
	bestAvg12Display.innerHTML = "Best average of 12: n/a";
	bestAvg100Display.innerHTML = "Best average of 100: n/a";
	currentAvg5Display.innerHTML = "Current average of 5: n/a";
	currentAvg12Display.innerHTML = "Current average of 12: n/a";
	currentAvg100Display.innerHTML = "Current average of 100: n/a";
	totalSolvesDisplay.innerHTML = "Total solves: 0";
	scramble();
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
	lastScrambleActual = lastScramble;
	scramble();
}

function calcStats(value) {
	totalSolves += 1;
	totalSolvesDisplay.innerHTML = "Total Solves: " + totalSolves;
	if (value < bestTime) {
		bestTime = value;
		bestTimeDisplay.innerHTML = "Best solve: " + value;
	}
	if (value > worstTime) {
		worstTime = value;
		worstTimeDisplay.innerHTML = "Worst solve: " + value;
	}
	if (times.length >= 5) {
		var avg5 = calcAvg(5);
		bestAvg5Display.innerHTML = "Best average of 5: " + best_averages["best_avg5"];
		currentAvg5Display.innerHTML = "Current average of 5: " + avg5;
	}
	if (times.length >= 12) {
		var avg12 = calcAvg(12);
		bestAvg12Display.innerHTML = "Best average of 12: " + best_averages["best_avg12"];
		currentAvg12Display.innerHTML = "Current average of 12: " + avg12;
	}
	if (times.length >= 100) {
		var avg100 = calcAvg(100);
		bestAvg100Display.innerHTML = "Best average of 100: " + best_averages["best_avg100"];
		currentAvg100Display.innerHTML = "Current average of 100: " + avg100;
	}
}

function calcAvg(value) {
	var last_x = times.slice(times.length - value, times.length);
	var total = 0;
	var best = parseFloat(last_x[0]);
	var worst = best;
	for (i = 0; i < last_x.length; i += 1) {
		var current_time = parseFloat(last_x[i]);
		if (current_time > worst) {
			worst = current_time;
		} else if (current_time < best) {
			best = current_time;
		}
		total += current_time;
	}
	total -= best + worst;
	var subtract = value - 2;
	var avg = (total / subtract).toFixed(3);
	var avg_name = "best_avg" + value;
	var bestAvg = best_averages[avg_name];
	if (avg < bestAvg) {
		best_averages[avg_name] = avg;
	}
	return avg;
}

function calcAvg5() {
	var last_five = times.slice(times.length - 5, times.length);
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
	var avg5 = (total / 3).toFixed(3);
	if (avg5 < bestAvg5) {
		bestAvg5 = avg5;
		bestAvg5Display.innerHTML = "Best average of 5: " + avg5;
	}
	currentAvg5Display.innerHTML = "Current average of 5: " + avg5;
}

function scramble() {
    var newScramble = '';
    var prevMove = '';
    var prevPrevMove = '';
    if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "3x3") {
        var moves = ["U", "D", "R", "L", "F", "B", "U\'", "D\'", "R\'", "L\'", "F\'", "B\'", "U2", "D2", "R2", "L2", "F2", "B2"];

        for (var i = 0; i < 20; i++) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
            if (prevMove == 'U' & prevPrevMove != 'D' || prevMove == 'D' && prevPrevMove != 'U' || prevMove == 'L' && prevPrevMove != 'R' || prevMove == 'R' && prevPrevMove != 'L' || prevMove == 'F' && prevPrevMove != 'B' || prevMove == 'B' && prevPrevMove != 'F') {
                prevPrevMove = '';
            }
            while (move.charAt(0) == prevMove || move.charAt(0) == prevPrevMove) {
                var randomInt = Math.floor((Math.random() * moves.length));
                move = moves[randomInt];
            }
            prevPrevMove = prevMove.charAt(0);
            prevMove = move.charAt(0);
            newScramble = newScramble + move + ' ';
        scrambleText.innerHTML = newScramble;
        }
    }
    else if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "2x2") {
        var moves = ["U", "R", "F", "U\'", "R\'", "F\'", "U2", "R2", "F2"];

        for (var i = 0; i < 11; i++) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
            while (move.charAt(0) == prevMove) {
                var randomInt = Math.floor((Math.random() * moves.length));
                move = moves[randomInt];
            }
            prevMove = move.charAt(0);
            newScramble = newScramble + move + ' ';
        scrambleText.innerHTML = newScramble;
        }
    }
    else if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "skewb") {
        scrambleText.innerHTML = "Why would you practice skewb";
    }
    else {
        rMoves = ["R++ ", "R-- "];
        dMoves = ["D++ ", "D-- "];
        uMoves = ["U<br>", "U\'<br>"];

        for (var i = 0; i < 7; i++) {
            for (var k = 0; k < 10; k++) {
                if (k % 2 == 0) {
                    var randomInt = Math.floor((Math.random() * rMoves.length));
                    newScramble += rMoves[randomInt];
                }
                else {
                    var randomInt = Math.floor((Math.random() * dMoves.length));
                    newScramble += dMoves[randomInt];
                }
            }
        var randomInt = Math.floor((Math.random() * uMoves.length));
        newScramble += uMoves[randomInt];
        }
        scrambleText.innerHTML = newScramble;
    }
    lastScramble = newScramble;
}
