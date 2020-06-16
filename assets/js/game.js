(function() {


    // création de persos temporaires comme un barbare pour test

    var player1 = {
        race : "elf",
        item : "sword",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
        damagemodif : 1,
    }

    var player2 = {
        race : "human",
        item : "staff",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
        damagemodif : 0.8,
    }

    console.log(player1); // test pour voir si ça marchait 

    // création d'une variable turn pour déterminer le tour de jeu
    var turn = new Boolean();
    turn = Math.round(Math.random());
    console.log(turn);

    // création de deux variables non définies globales pour qu'elles fonctionnent dans l'entièreté du programme.
    var me;
    var opponent;
    
    

    // fonction de calcul des dégats

    function damages() {
            
        // calcul de base 

        var degats = me.min + Math.round(Math.random()*(me.maxDamage - me.min));
        
        // vérification épée

        if (me.item ==="sword"){
            degats += Math.floor(degats*0.3);
            console.log("power up")
        }

        // vérif si l'adversaire a les boots

        if (opponent.item === "boots"){
            // jet d'esquive
            var esq = Math.round(Math.random()* 100);
            if (esq <= 30){
                // si esquive réussie, les dégats égalent 0
                degats = 0;
                console.log("esquivé")
            }
        }

        // calcul des dégats en tenant compte du modificateur de race

        const truedamages = Math.round(degats*opponent.damagemodif);
        opponent.currenthealth -= truedamages;
        console.log (truedamages)
        console.log (opponent.currenthealth);


        // vérification de la vie de l'adversaire
        if (opponent.currenthealth <= 0){
            opponent.currenthealth = 0; // pas de négatif affichés dans l'UI
            alert("you've won") // à remplacer par le vrai script de victoire et de lancement d'une ature partie
        }

        
    }

    // creation function heal

    function heal() {

        // calcul de base 

        var restore = me.min + Math.round(Math.random()*(me.maxHeling - me.min));
        
        // vérification possession staff

        if (me.item ==="staff"){
            restore += Math.floor(restore*0.3);
            console.log("white mage rocks")
        }

        // ajout des hps au personnage

        me.currenthealth += restore;
        console.log ("vie rendue " + restore);
        console.log (me.currenthealth);

        // prise en compte du cas d'overheal
        if (me.currenthealth > me.maxHealth){
            me.currenthealth = me.maxHealth;
        }
    }




    // bouton attaque player1

    document.getElementById("charOneHit").addEventListener("click", function() {
        if (turn == 0){ // vérif du tour
            
            // choix de quel joueur est nous, quel est l'ennemi. va changer selon le jouer d'où l'intérêt de créer les variables en global et ne pas les définir.
            me = player1;    
            opponent = player2;

            console.log("attack")
            // appel fonction dégats
            damages();

            // vérification de l'arc pour seconde attaque
        
            if(me.item === "bow"){

                console.log("second attack");
                // appel fonction dégats
                damages();
            }

            console.log("player2 life is " + player2.currenthealth);
            // change le tour
            turn = 1;
            console.log(turn)
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });


    // bouton heal player 1 

    document.getElementById("charOneHeal").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 0){
            me = player1;
            opponent = player2;

            console.log("heal")
            // appelle fonction heal
            heal();
        

            console.log("player1 life is " + player1.currenthealth);
            // change le tour
            turn = 1;
            console.log(turn)
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });


    // yield player 1

    document.getElementById("charOneYield").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 0){
            alert("Player 1 has fled the game! Bou hou!")
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });




    // bouton attaque player 2

    document.getElementById("charTwoHit").addEventListener("click", function() {
        // vérif du tour
        if (turn == 1){

            // choix de quel joueur est nous, quel est l'ennemi

            me = player2;
            opponent = player1;

            console.log("attack")
            damages();

            // vérif seconde attaque si bow
        
            if(me.item === "bow"){

                console.log("second attack");
            
                damages();
            }

            console.log("player1 life is " + player1.currenthealth);
            turn = 0;
            console.log(turn)
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });

    

    // heal player 2

    document.getElementById("charTwoHeal").addEventListener("click", function() {
        // vérif le tour
        if (turn == 1){            
            
            me = player2;    
            opponent = player1;

            console.log("heal")
            heal();
        

            console.log("player2 life is " + player2.currenthealth);
            turn = 0;
            console.log(turn)
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });

    // player 2 yield

    document.getElementById("charOneYield").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 1){
            alert("Player 2 has fled the game! Bou hou!")
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });

})();