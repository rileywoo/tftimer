var scramble = document.getElementById("scramble");
var button = document.getElementById("button");
var selectedEvent = document.getElementById("selectedEvent");

button.addEventListener("click", function() {
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
        scramble.innerHTML = newScramble;
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
        scramble.innerHTML = newScramble;
        }
    }
    else if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "skewb") {
        scramble.innerHTML = "Why would you practice skewb";
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
        scramble.innerHTML = newScramble;
    }
}
);
