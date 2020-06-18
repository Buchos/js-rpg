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
        this.stealHP = 0.1;
        // Steal HP object property (modifier) (0= no steal, 1 = steal 100%) (!0 if vamp or object)
    }
}

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
            character.dodge = function() {
                // if (rand numb btw 0 & 99) <= 29m return 0 (30% of having a 0 modifier to attack)
                if ((Math.floor(Math.random() * 100)) <= 29) {
                    return 0;
                }
                else {return 1;}
            };
            break;
        case "sword":
            character.atk = 1.3;
            break;
    }
}

// Base Damage
const baseDMG = Math.floor(Math.random() * 100) + 60; // returns a random integer from 60 to 100 ;
// Total damage of current attack
var dmg;
// Vars for obect & race modifiers
const bowDouble = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3
var ctrAtkMod = .5; // half the damage for counterattack

// Strike (Defender HP-)
function strike () {
    dmg = baseDMG * attacker.atk * defender.def * defender.dodge;
    if (dmg != 0) {
        console.log(`${attacker} deals ${dmg} of damage to ${defender}`);
    }
    else {
        console.log(`${defender} evades!!!`);
    }
    defender.hp -= dmg;
}
// Steal HP (Attacker HP+)
function stealHP () {
    if (attacker.stealHP != 0) {
        hpStolen = dmg * attacker.stealHP;
        console.log(`${attacker} stole ${hpStolen}HP from ${defender}`);
        attacker.hp += hpStolen;
        if (hpAttacker > hpAttackerMax) {
            hpAttacker = hpAttackerMax;
        }
    }
}

function attack () {
    strike();
    stealHP();
    if (attacker.double == 1) {
        console.log(`${attacker} strikes a second time!`);
        strike();
        stealHP();
    }
    if (defender.ctrAtk == 1) {
        console.log(`${defender} counter-attacks!`);
        dmg = baseDMG * defender.atk * attacker.def * ctrAtkMod; // defender attacking attacker
        console.log(`${defender} deals ${dmg} of damage to ${attacker}`);
        attacker.hp -= dmg;
    }
}

const playerBlue = new Human("Michel", "boots");
const playerRed = new Vampire("Grom", "sword");

applyItemModifiers(playerBlue, playerBlue.item);
applyItemModifiers(playerRed, playerRed.item);

var attacker;
var defender;

document.getElementById("playerBlueHit").addEventListener("click", function() {
    attacker = playerBlue;
    defender = playerRed;
    attack();
})

console.log(playerBlue);
console.log(playerRed);