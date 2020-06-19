var playerBlue = {name: "Legolasse", HP: 50};
var playerRed = {name: "BeauRohmir", HP: 90};

function displayWinScreen () {
    document.getElementById("winScreen").classList.toggle("unhide");
    if (playerBlue.HP > playerRed.HP) {
        document.getElementById("winStripe").style.backgroundColor = "blue";
        document.getElementById("winner").innerHTML= playerBlue.name + " won!";
    }
    else {
        document.getElementById("winStripe").style.backgroundColor = "red";
        document.getElementById("winner").innerHTML= playerRed.name + " won!";
    }
}

console.log(playerRed.HP);
console.log(playerBlue.HP);
// displayWinScreen();
// mettre la fonction displayWinScreen a l'endroit ou l'on teste si HP<=0

var turn = 1;

function displayYieldScreen () {
    document.getElementById("winScreen").classList.toggle("unhide");
    if (turn == 0) {
        document.getElementById("winStripe").style.backgroundColor = "red";
        document.getElementById("winner").innerHTML= playerBlue.name + " abandoned! <br>" + playerRed.name + " won!";
    }
    else {
        document.getElementById("winStripe").style.backgroundColor = "blue";
        document.getElementById("winner").innerHTML= playerRed.name + " abandoned! <br>" + playerBlue.name + " won!";
    }
}

displayYieldScreen();