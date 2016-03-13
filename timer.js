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
		stopTimer();
	}
});

function reset() {
	output.innerHTML = "tfti";
	times = [];
	times_list.value = times.toString();
	bestTime = Number.POSITIVE_INFINITY;
	bestTimeDisplay.innerHTML = "Best time: n/a";
	worstTime = -1;
	worstTimeDisplay.innerHTML = "Worst time: n/a";
	bestAvg5 = Number.POSITIVE_INFINITY;
	bestAvg5Display.innerHTML = "Best average of 5: n/a";
	currentAvg5Display.innerHTML = "Current average of 5: n/a";
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
	scramble();
}

function calcStats(value) {
	if (value < bestTime) {
		bestTime = value;
		bestTimeDisplay.innerHTML = "Best solve: " + value;
	}
	if (value > worstTime) {
		worstTime = value;
		worstTimeDisplay.innerHTML = "Worst solve: " + value;
	}
	if (times.length >= 5) {
		calcAvg5();
	}
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
	console.log(bestAvg5);
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
}
