// Au lancement de la page game.html

const playerBlueImg = document.getElementById("playerBlueImg");
const playerRedImg = document.getElementById("playerRedImg");

// s'assurer que les img ont bien l'ID playerBlueImg et playerRedImg (deja fait dans mon html)

function setPlayerBlueImg(character) {
    switch (character.race) {
        case "human":
            playerBlueImg.setAttribute("src", "assets/img/js-rpg-human.png");
            break;
        case "elf":
            playerBlueImg.setAttribute("src", "assets/img/js-rpg-elf.png");
            break;
        case "orc":
            playerBlueImg.setAttribute("src", "assets/img/js-rpg-orc.png");
            break;
        case "vampire":
            playerBlueImg.setAttribute("src", "assets/img/js-rpg-vampire.png");
            break;
    }
}

function setPlayerRedImg(character) {
    switch (character.race) {
        case "human":
            playerRedImg.setAttribute("src", "assets/img/js-rpg-human.png");
            break;
        case "elf":
            playerRedImg.setAttribute("src", "assets/img/js-rpg-elf.png");
            break;
        case "orc":
            playerRedImg.setAttribute("src", "assets/img/js-rpg-orc.png");
            break;
        case "vampire":
            playerRedImg.setAttribute("src", "assets/img/js-rpg-vampire.png");
            break;
    }
}

var characterBlue = {name: "Arthur", race: "human"};
var characterRed = {name: "Christophe", race: "elf"};
console.log(characterBlue);
setPlayerBlueImg(characterBlue);
setPlayerRedImg(characterRed);
