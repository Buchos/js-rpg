class Character {
    constructor(name, race, item) {
        this.name = name;
        this.race = race;
        this.item = item;
    }
}
const orc = {hpModifier: 1.4, }

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
// Steal HP object property (modifier) (0= no steal, 1 = steal 100%) (!0 if vamp or object)
attacker.stealHP;
defender.stealHP;
// Double (only the attacker can do a double attack)
attacker.double;
// Counter Strike (only defender can counter) (Attacker HP-)
defender.counterStrike;

// Strike (Defender HP-)
function strike () {
    dmg = baseDMG * dmgModAttacker * defModDefender;
    console.log(`${attacker} deals ${dmg} of damage to ${defender}`);
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
    if (defender.counterStrike == 1) {
        console.log(`${defender} counter-attacks!`);
        dmg = baseDMG * dmgModDefender * defModAttacker; // Here it's the defender attacking the attacker
        console.log(`${defender} deals ${dmg} of damage to ${attacker}`);
        hpAttacker -= dmg;
    }
}