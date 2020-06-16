(function() {

    var player1 = {
        race : "elf",
        item : "bow",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
    }
    var player2 = {
        race : "human",
        item : "staff",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
    }

    console.log(player1);

    var turn = new Boolean();
    turn = Math.round(Math.random());
    console.log(turn);

    document.getElementById("charOneHit").addEventListener("click", function() {
        var me = player1;
        var opponent = player2;

        if (me.object == "bow"){
            console.log("first attack");
        }

        console.log("normal attack");

    });


    function damages() {
        var degats = 0;
    }




})();