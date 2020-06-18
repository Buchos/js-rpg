<<<<<<< HEAD

// let charOneRace;
// let charOneItem;
// let charTwoRace;
// let charTwoItem;
// let charOne;
// let charTwo;
// let charOneName;
// let charTwoName;
// let charOneHealth;
// let charTwoHealth;

// document.getElementById("run").addEventListener("click", create);

// function create() {
//     let charOneHit = document.getElementById("charOneHit");
//     let charOneHeal = document.getElementById("charOneHeal");
//     let charOneYield = document.getElementById("charOneYield");
//     let charTwoHit = document.getElementById("charTwoHit");
//     let charTwoHeal = document.getElementById("charTwoHeal");
//     let charTwoYield = document.getElementById("charTwoYield");

//     charOneRace = document.getElementById("charOneRace").value;
//     charOneItem = document.getElementById("charOneItem").value;
//     charTwoRace = document.getElementById("charTwoRace").value;
//     charTwoItem = document.getElementById("charTwoItem").value;

//     charOne = new Person(charOneRace, charOneItem);
//     charTwo = new Person(charTwoRace, charTwoItem);
//     document.getElementById("charOneRace").innerHTML += charOneRace;
//     document.getElementById("charOneItem").innerHTML += charOneItem;
//     document.getElementById("charTwoRace").innerHTML += charTwoRace;
//     document.getElementById("charTwoItem").innerHTML += charTwoItem;

//     charOneName = document.getElementById("charOneNameInput").value;
//     document.getElementById("charOneName").innerHTML += charOneName;

//     fighter2Name = document.getElementById("charTwoNameInput").value;
//     document.getElementById("charTwoName").innerHTML += fighter2Name;
// }

class char {
    constructor(name, race, item) {
        this.name = name;
        this.race = race;
        this.item = item;
        this.currenthealth = 100;
        this.maxHealth = 100;
        this.min = 3;
        this.maxDamage = 20;
        this.maxHealing = 30;
        this.damagemodif = 1;
        this.vampiremod = 0;
    }
}

document.getElementById("startFight").addEventListener("click",() => {
    let charOneName = document.getElementById("charOneName").value;
    let charOneRace = document.getElementById("charOneRace").value;
    let charOneObj = document.getElementById ("charOneObj").value;
    let charTwoName = document.getElementById("charTwoName").value;
    let charTwoRace = document.getElementById("charTwoRace").value;
    let charTwoObj = document.getElementById ("charTwoObj").value;

    var charOne = new char(charOneName, charOneRace, charOneObj);
    var charTwo = new char(charTwoName, charTwoRace, charTwoObj);

    function raceTrait (x){
        if (x.race==="vampire") {
            x.vampiremod = 0.1;
        }
        if (x.race==="orc") {
            x.maxHealth=x.maxHealth*1.4;  
            x.currenthealth=x.currenthealth*1.4;  
        }
        if (x.race==="human") {
            x.damagemodif=0.8;
        }

    }

    raceTrait(charOne);
    raceTrait(charTwo);

    console.log(charOne, charTwo);
    
})
=======
>>>>>>> origin/arti
