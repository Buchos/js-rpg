class Character {
    constructor(name, item) {
        this.name = name;
        this.item = item;
        this.hp = 100;
        // races
        this.hpMax = 100;
        this.def = 1; // percentage
        this.stealHP = 0; // percentage
        this.ctrAtk = 0; // 0/1 boolean
        // objects
        this.double = 0; // 0/1 boolean (bow)
        this.atk = 1; // percentage (sword)
        this.dodge = 1; // (boots) 1=no dodge
        this.heal = 1; // percentage (staff)
    }
}

class Human extends Character {
    constructor(name, item) {
        super(name, item);
        this.race = "human";
        this.def = 0.8;
    }
}

class Orc extends Character {
    constructor(name, item) {
        super(name, item);
        this.race = "orc";
        this.hp = 140;
        this.hpMax = 140;
    }
}

class Elf extends Character {
    constructor(name, item) {
        super(name, item);
        this.race = "elf";
        this.ctrAtk = 1;
    }
}

class Vampire extends Character {
    constructor(name, item) {
        super(name, item);
        this.race = "vampire";
        this.stealHP = 0.2;
        // Steal HP object property (modifier) (0= no steal, 1 = steal 100%) (!0 if vamp or object)
    }
}

function testFunction() {
    // if (rand numb btw 0 & 99) <= 29m return 0 (30% of having a 0 modifier to attack)
    if ((Math.floor(Math.random() * 100)) <= 29) {
        return 0;
    }
    else {return 1;}
};

// Items Function
function applyItemModifiers(character, item) {
    switch (item) {
        case "bow":
            character.double = 1;
            break;
        case "staff":
            character.heal = 1.2;
            break;
        case "boots":
            character.dodge = testFunction();
            break;
        case "sword":
            character.atk = 1.3;
            break;
    }
}

// Base Damage
var baseDMG =  function calculateBaseDMG() {return Math.floor(Math.random() * 10) + 1};
// Total damage of current attack
var dmg;
// Vars for obect & race modifiers
const bowDouble = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3
var ctrAtkMod = .5; // half the damage for counterattack

// Strike (Defender HP-)
function strike () {
    dmg = Math.round(baseDMG() * attacker.atk * defender.def * defender.dodge);
    if (dmg != 0) {
        console.log(`${attacker.name} deals ${dmg} of damage to ${defender.name}`);
    }
    else {
        console.log(`${defender.name} evades!!!`);
    }
    defender.hp -= dmg;
}
// Steal HP (Attacker HP+)
function stealHP () {
    if (attacker.stealHP != 0) {
        hpStolen = Math.ceil(dmg * attacker.stealHP);
        console.log(`${attacker.name} stole ${hpStolen}HP from ${defender.name}`);
        attacker.hp += hpStolen;
        if (attacker.hp > attacker.hpMax) {
            attacker.hp = attacker.hpMax;
        }
    }
}

function attack () {
    strike();
    stealHP();
    if (attacker.double == 1) {
        console.log(`${attacker.name} strikes a second time!`);
        strike();
        stealHP();
    }
    if (defender.ctrAtk == 1) {
        console.log(`${defender.name} counter-attacks!`);
        dmg = baseDMG * defender.atk * attacker.def * ctrAtkMod; // defender attacking attacker
        console.log(`${defender.name} deals ${dmg} of damage to ${attacker.name}`);
        attacker.hp -= dmg;
    }
}

// Init Characters
const playerBlue = new Human("Michel", "boots");
const playerRed = new Vampire("Shana", "sword");

// Apply item modifiers to Characters
applyItemModifiers(playerBlue, playerBlue.item);
applyItemModifiers(playerRed, playerRed.item);

var attacker;
var defender;

console.log(playerBlue);
console.log(playerRed);

// Turn counter
var turn = 0;
function turnPlayerAssign() {
    if (turn % 2 == 0) {
        attacker = playerBlue;
        defender = playerRed;
    }
    else {
        attacker = playerRed;
        defender = playerBlue;
    }
}

// BUTTONS - ACTIONS
document.getElementById("playerBlueHit").addEventListener("click", function() {
    if (turn % 2 == 0) {
        turnPlayerAssign();
        attack();
        turn += 1;
    }
    else {console.log("It's not your turn!")}
})
document.getElementById("playerRedHit").addEventListener("click", function() {
    if (turn % 2 == 1) {
        turnPlayerAssign();
        attack();
        turn += 1;
    }
    else {console.log("It's not your turn!")}
})

// quand je console log, faire un effet typewriter??