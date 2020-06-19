class char {
    constructor(name, race, item) {
        this.name = name;
        this.race = race;
        this.item = item;
        this.currenthealth = 100;
        this.maxHealth = 100;
        this.min = 3;
        this.maxDamage = 20;
        this.maxHeling = 30;
        this.damagemodif = 1;
        this.vampiremod = 0;
        this.elfmod = 1;
    }
}

document.getElementById("startFight").addEventListener("click",() => {
    let charOneName = document.getElementById("charOneName").value;
    let charOneRace = document.getElementById("charOneRace").value;
    let charOneObj = document.getElementById ("charOneObj").value;
    let charTwoName = document.getElementById("charTwoName").value;
    let charTwoRace = document.getElementById("charTwoRace").value;
    let charTwoObj = document.getElementById ("charTwoObj").value;

    var player1 = new char(charOneName, charOneRace, charOneObj);
    var player2 = new char(charTwoName, charTwoRace, charTwoObj);

    function raceTrait (x){
        if (x.race==="vampire") {
            x.vampiremod = 0.1;
        }
        if (x.race==="orc") {
            x.maxHealth=x.maxHealth * 1.4;
            x.currenthealth=x.currenthealth * 1.4;
        }
        if (x.race==="human") {
            x.damagemodif=0.8;
        }
        if (x.race ==="elf") {
            x.elfmod =0;
        }

    }

    raceTrait(player1);
    raceTrait(player2);

    console.log(player1, player2);

    localStorage.setItem('joueur1', JSON.stringify(player1));
    localStorage.setItem('joueur2', JSON.stringify(player2));

    window.location = './game.html';


})