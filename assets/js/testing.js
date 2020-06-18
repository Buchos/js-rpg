const orcModif;
// const hpRaceMod = {human: 1, orc: 1.4, elf: 1, vampire: 1};
// const defRaceMod = {human: 0.8, orc: 1, elf: 1, vampire: 1}; // humans -20%dmg
// const defItemMod = {boots: 1, staff: 1, sword: 1, bow: 1};
var ctrAtkMod = .5; // half the damage for counterattack

class Character {
    constructor(name, race, item) {
        this.name = name;
        this.race = race;
        this.item = item;
        // races
        this.hpMax = 100;
        this.def = 1; // percentage
        this.stealHP = 0; // percentage
        this.ctrAtk = 0; // 0/1 boolean
        // objects
        this.double = 0; // 0/1 boolean
    }
}

class Human extends Character {
    constructor() {
        super();
        this.def = 0.8;
    }
}

class Orc extends Character {
    constructor() {
        super();
        this.hpMax = 140;
    }
}

class Elf extends Character {
    constructor() {
        super();
        this.ctrAtk = 1;
    }
}

class Vampire extends Character {
    constructor() {
        super();
        this.stealHP = 0.1;
    }
    // Steal HP object property (modifier) (0= no steal, 1 = steal 100%) (!0 if vamp or object)
}


const bowDouble = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3
// Boots
// 30% chance to dodge an attack 

// Staff	
// 20% increase in healing

// Sword	
// 30% more damage

// Bow
// 30% chance to attack twice

// Total damage of current attack
var dmg;
// Base Damage
const baseDMG = 100;
// HP
var hpAttacker;
var hpAttackerMax;
var hpDefender;
var hpDefenderMax;
// Damage Modifier (>1 critical, <1 weak)
var dmgModAttacker;
var dmgModDefender;
// Defense Modifier (<1 = armored, >1 = vulnerable)
var defModAttacker;
var defModDefender;
// Evade
var evadeDefender;
var evadeAttacker;
// Double (only the attacker can do a double attack)
attacker.double;
// Counter Strike (only defender can counter) (Attacker HP-)
defender.ctrAtk;

// Strike (Defender HP-)
function strike () {
    dmg = baseDMG * dmgModAttacker * defModDefender * evadeDefender;
    if (dmg != 0) {
        console.log(`${attacker} deals ${dmg} of damage to ${defender}`);
    }
    else {
        console.log(`${defender} evades!!!`);
    }
    hpDefender -= dmg;
}
// Steal HP (Attacker HP+)
function stealHP () {
    if (attacker.stealHP != 0) {
        hpStolen = dmg * attacker.stealHP;
        console.log(`${attacker} stole ${hpStolen}HP from ${defender}`);
        hpAttacker += hpStolen;
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
        dmg = baseDMG * dmgModDefender * defModAttacker * ctrAtkMod; // Here it's the defender attacking the attacker
        console.log(`${defender} deals ${dmg} of damage to ${attacker}`);
        hpAttacker -= dmg;
    }
}