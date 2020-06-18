(function() {


    // création de persos temporaires comme un barbare pour test

    var player1 = {
        name : "Bob",
        race : "vampire",
        item : "sword",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
        damagemodif : 1,
        vampiremod : 0.1,

    }

    var player2 = {
        name : "Jimmy",
        race : "elf",
        item : "staff",
        currenthealth : 100,
        maxHealth : 100,
        min : 3,
        maxDamage : 20,
        maxHeling : 30,
        damagemodif : 0.8,
        vampiremod : 0,
    }

    console.log(player1); // test pour voir si ça marchait 

    //Récupérer la race et l'item et l'afficher
    document.getElementById("charOneRace").innerHTML = "Race : " + player1.race;
    document.getElementById("charOneObj").innerHTML = "Item : " + player1.item;
    document.getElementById("charTwoRace").innerHTML = "Race : " + player2.race;
    document.getElementById("charTwoObj").innerHTML = "Item : " + player2.item;
    document.getElementById("charOneName").innerHTML = "Name : " + player1.name;
    document.getElementById("charTwoName").innerHTML = "Name : " + player2.name;
    
    document.getElementById("log-panel").innerHTML = "";
    var logPanel = document.getElementById("log-panel").innerHTML;
    console.log("logPanel " + logPanel);

    function gotoBottom(){
        var element = document.getElementById("log-panel");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    function ajoutlog(x){
        var node = document.createElement("LI");                 
        var textnode = document.createTextNode(x);         // Create a text node
        node.appendChild(textnode);
        document.getElementById("log-panel").appendChild(node); 

        gotoBottom(); 
    }

    function calcHP() {
        document.getElementById("charOneHP").innerHTML = "HP : " + player1.currenthealth + "/" + player1.maxHealth;
        document.getElementById("charTwoHP").innerHTML = "HP : " + player2.currenthealth + "/" + player2.maxHealth;
    }
    calcHP();

    function updateHP () {
        document.getElementById("charOneHPBar").style["width"] = (player1.currenthealth/player1.maxHealth *100) + "%";
        document.getElementById("charTwoHPBar").style["width"] = (player2.currenthealth/player2.maxHealth *100) + "%";
    };
    updateHP();

    // création d'une variable turn pour déterminer le tour de jeu
    var turn = new Boolean();
    turn = Math.round(Math.random());
    console.log(turn);
    
    function turnchange(){
        if(turn === 0){
            document.getElementById("turn").innerHTML= "Tour de " + player1.name;
        }

        else { 
            document.getElementById("turn").innerHTML= "Tour de " + player2.name;
        }
    }

    turnchange();
    // création de deux variables non définies globales pour qu'elles fonctionnent dans l'entièreté du programme.
    var me;
    var opponent;

    

    // fonction vampire

    function vampire (){
        // calcul de l'absorbtion. 
        me.currenthealth += Math.floor(me.vampiremod * opponent.currenthealth);
        calcHP();
        updateHP();
        // cas ou la vie absorbée fait est plus élevée que la vie max
        if (me.currenthealth > me.maxHealth){
            me.currenthealth = me.maxHealth;
        }
        // déduction de la vie de l'adversaire. Math.floor pour prendre la valeur basse et ne jamais tuer sur une absorbtion de vie. 
        opponent.currenthealth -= Math.floor(me.vampiremod * opponent.currenthealth);
        calcHP();
        updateHP();
        
        // affichage uniquement si vampiremod != 0
        if (me.vampiremod !=0){
            ajoutlog("Enemy vampire sucks your blood !");

            console.log("enemy life is drained");
            console.log("your life is " + me.currenthealth);
            console.log("your enemy life is " + opponent.currenthealth);
        }
    }
    
    

    // fonction de calcul des dégats

    function damages() {
            
        // calcul de base 

        var degats = me.min + Math.round(Math.random()*(me.maxDamage - me.min));
        
        // vérification épée

        if (me.item ==="sword"){
            degats += Math.floor(degats*0.3);
            
            ajoutlog("Your attack is increased thanks to the sword !");
            console.log("power up")
        }

        // vérif si l'adversaire a les boots

        if (opponent.item === "boots"){
            // jet d'esquive
            var esq = Math.round(Math.random()* 100);
            if (esq <= 30){
                // si esquive réussie, les dégats égalent 0
                degats = 0;
                ajoutlog("You dodged the attack thanks to your boots !")
                console.log("esquivé")
            }
        }

        // calcul des dégats en tenant compte du modificateur de race

        const truedamages = Math.floor(degats*opponent.damagemodif);

        const chance = Math.round(Math.random()*100)
        console.log("chance is "+ chance)

        if (opponent.race === "elf" && chance <=30){
            me.currenthealth -= Math.floor(truedamages/2);
            calcHP();
            updateHP();
            ajoutlog("Your opponent returns 50% of your attack !");
            console.log(truedamages);
            console.log("backfired "+ Math.floor(truedamages/2));
            console.log("your life is " + me.currenthealth);

            if (me.currenthealth <= 0){
                me.currenthealth = 0; // pas de négatif affichés dans l'UI
                alert("you're dead") // à remplacer par le vrai script de victoire et de lancement d'une ature partie
            }
        }

        else {
            
            opponent.currenthealth -= truedamages;
            calcHP();
            updateHP();
            console.log (truedamages)
            console.log (opponent.currenthealth);

            // vérification de la vie de l'adversaire
            if (opponent.currenthealth <= 0){
                opponent.currenthealth = 0; // pas de négatif affichés dans l'UI
                alert("you've won") // à remplacer par le vrai script de victoire et de lancement d'une ature partie
            }
    
        }        
        
    }
    

    // creation function heal

    function heal() {

        // calcul de base 

        var restore = me.min + Math.round(Math.random()*(me.maxHeling - me.min));
        
        // vérification possession staff

        if (me.item ==="staff"){
            restore += Math.floor(restore*0.3);
            ajoutlog("Your healing power is increased thanks to your magical staff !");
            console.log("white mage rocks");
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

            // vampire mod
            vampire();

            console.log("attack")
            // appel fonction dégats
            damages();

            // vérification de l'arc pour seconde attaque
        
            if(me.item === "bow"){
                let bowchance = Math.round(Math.random() * 100)
                if (bowchance <= 30){
                    ajoutlog("Second attack thanks to the bow !");
                    console.log("second attack");
                    // appel fonction dégats
                    damages();
                }
            }

            console.log("player2 life is " + player2.currenthealth);
            // change le tour
            calcHP();
            updateHP();
            turn = 1;
            console.log(turn)
            turnchange();
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

            // vampire mod
            vampire();

            console.log("heal")
            // appelle fonction heal
            heal();
        

            console.log("player1 life is " + player1.currenthealth);
            // change le tour
            calcHP();
            updateHP();
            turn = 1;
            console.log(turn)
            
            turnchange();
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

            // vampire mod
            vampire();

            console.log("attack")
            damages();

            // vérif seconde attaque si bow
        
            if(me.item === "bow"){
                let bowchance = Math.round(Math.random() * 100)
                if (bowchance <= 30){
                    ajoutlog("Second attack thanks to the bow !");
                    console.log("second attack");
                    // appel fonction dégats
                    damages();
                }
            }

            console.log("player1 life is " + player1.currenthealth);
            calcHP();
            updateHP();
            turn = 0;
            console.log(turn)
            turnchange();
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

            // vampire mod
            vampire()

            console.log("heal")
            heal();
        

            console.log("player2 life is " + player2.currenthealth);
            calcHP();
            updateHP();
            turn = 0;
            console.log(turn)
            turnchange();
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });

    // player 2 yield

    document.getElementById("charTwoYield").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 1){
            alert("Player 2 has fled the game! Bou hou!")
        }

        else {
            alert("ce n'est pas votre tour");
        }    
    });

})();