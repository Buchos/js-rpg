(function() {

    // récupération des personnages de la page index

    player1JSON = localStorage.getItem('joueur1');
    player1 = player1JSON && JSON.parse(player1JSON);
    player2JSON = localStorage.getItem('joueur2');
    player2 = player2JSON && JSON.parse(player2JSON);

    // retransformer en Nombres les strings récupérés sur la page index
    function stringToNumber (x){
        x.currenthealth = Number(x.currenthealth);
        x.maxHealth = Number(x.maxHealth);
        x.min = Number(x.min);
        x.maxDamage = Number(x.maxDamage);
        x.maxHeling = Number(x.maxHeling);
        x.damagemodif = Number(x.damagemodif); 
        x.vampiremod =Number(x.vampiremod);

    } 

    stringToNumber (player1);
    stringToNumber (player2);

    // GET Player Img Src
    const playerBlueImg = document.getElementById("playerBlueImg");
    const playerRedImg = document.getElementById("playerRedImg");

    // Function for setting Img Src for Player Images
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
    // Set Imgs for Players
    setPlayerBlueImg(player1);
    setPlayerRedImg(player2);

    // Function Display Win Screen
    function displayWinScreen () {
        console.log(player1.currenthealth + " player1");
        console.log(player2.currenthealth + " player2");

        document.getElementById("winScreen").classList.toggle("unhide");
        if (player1.currenthealth > player2.currenthealth) {
            document.getElementById("winStripe").style.backgroundColor = "blue";
            document.getElementById("winner").innerHTML= player1.name + " won!";
        }
        else {
            document.getElementById("winStripe").style.backgroundColor = "red";
            document.getElementById("winner").innerHTML= player2.name + " won!";
        }
    }
    // Function Display Yield Screen
    function displayYieldScreen () {
        document.getElementById("winScreen").classList.toggle("unhide");
        if (turn == 0) {
            document.getElementById("winStripe").style.backgroundColor = "red";
            document.getElementById("winner").innerHTML= player1.name + " abandoned! <br>" + player2.name + " won!";
        }
        else {
            document.getElementById("winStripe").style.backgroundColor = "blue";
            document.getElementById("winner").innerHTML= player2.name + " abandoned! <br>" + player1.name + " won!";
        }
    }
    // Restart Button Listener
    document.getElementById("restartButton").addEventListener("click", function() {
        window.location = './index.html';
    })
    

    //Récupérer la race et l'item et l'afficher
    document.getElementById("charOneRace").innerHTML = "Race : " + player1.race;
    document.getElementById("charOneObj").innerHTML = "Item : " + player1.item;
    document.getElementById("charTwoRace").innerHTML = "Race : " + player2.race;
    document.getElementById("charTwoObj").innerHTML = "Item : " + player2.item;
    document.getElementById("charOneName").innerHTML = "Name : " + player1.name;
    document.getElementById("charTwoName").innerHTML = "Name : " + player2.name;
    
    document.getElementById("loglist").innerHTML = "";
    
    // fonction pour garder la barre de scroll du log en bas
    function gotoBottom(){
        let element = document.getElementById("log-panel");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    // fonction pour ajouter les logs par en bas
    function ajoutlog(x){
        let node = document.createElement("LI");                 
        let textnode = document.createTextNode(x);         // Create a text node
        node.appendChild(textnode);
        document.getElementById("loglist").appendChild(node); 

        gotoBottom(); 
    }

    // fonction pour les HP en chiffres
    function calcHP() {
        document.getElementById("charOneHP").innerHTML = "HP : " + player1.currenthealth + "/" + player1.maxHealth;
        document.getElementById("charTwoHP").innerHTML = "HP : " + player2.currenthealth + "/" + player2.maxHealth;
    }
    calcHP();

    // fonction pour la barre d'HP
    function updateHP () {
        document.getElementById("charOneHPBar").style["width"] = (player1.currenthealth/player1.maxHealth *100) + "%";
        document.getElementById("charTwoHPBar").style["width"] = (player2.currenthealth/player2.maxHealth *100) + "%";
    };
    updateHP();

    // création d'une variable turn pour déterminer le tour de jeu
    var turn = new Boolean();
    turn = Math.round(Math.random());
    
    // fonction pour alterner les tours entre le joueur 1 et 2
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
        let logVie = Math.floor(me.vampiremod * opponent.currenthealth);
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
            ajoutlog(me.name +" suck " + opponent.name + "'s blood");
            ajoutlog(logVie + " HP are drained");

        }
    }
    
    

    // fonction de calcul des dégats

    function damages() {
            
        // calcul de base 

        let degats = me.min + Math.round(Math.random()*(me.maxDamage - me.min));
        
        // vérification épée

        if (me.item ==="sword"){
            degats += Math.floor(degats*0.3);
            
            ajoutlog("Your attack is increased thanks to the sword !");

        }

        // vérif si l'adversaire a les boots

        if (opponent.item === "boots"){
            // jet d'esquive
            let esq = Math.round(Math.random()* 100);
            if (esq <= 30){
                // si esquive réussie, les dégats égalent 0
                degats = 0;
                ajoutlog("You dodged the attack thanks to your boots !")

            }
        }

        // calcul des dégats en tenant compte du modificateur de race

        const truedamages = Math.floor(degats*opponent.damagemodif);

        const chance = Math.round(Math.random()*100)

        if (opponent.race === "elf" && chance <=30){
            me.currenthealth -= Math.floor(truedamages/2);
            calcHP();
            updateHP();
            ajoutlog(opponent.name + " avoids your attack and returns 50% of the damages !");
            ajoutlog(me.name + " lost " + truedamages + " HP");


            if (me.currenthealth <= 0){
                me.currenthealth = 0; // pas de négatif affichés dans l'UI
                setTimeout(() => {
                    displayWinScreen ();
                    
                }, 1000); 
            }
        }

        else {
            
            opponent.currenthealth -= truedamages;
            calcHP();
            updateHP();
            ajoutlog(opponent.name + " lost " + truedamages + " HP");


            // vérification de la vie de l'adversaire
            if (opponent.currenthealth <= 0){
                setTimeout(() => {
                    displayWinScreen ();
                    
                }, 1000); 
                opponent.currenthealth = 0; // pas de négatif affichés dans l'UI

            }
    
        }        
        
    }
    

    // creation function heal

    function heal() {

        // calcul de base 

        var restore = me.min + Math.round(Math.random()*(me.maxHeling - me.min));
        ajoutlog(me.name + " heals himself")
        
        // vérification possession staff

        if (me.item ==="staff"){
            restore += Math.floor(restore*0.3);
            ajoutlog("Your healing power is increased thanks to your magical staff !");

        }

        // ajout des hps au personnage

        me.currenthealth += restore;
        ajoutlog(me.name + " gets " + restore + " HP back")

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

            ajoutlog(me.name + " attack his opponent");

            // appel fonction dégats
            damages();

            

            // vérification de l'arc pour seconde attaque
            
        
            if(me.item === "bow"){
                let bowchance = Math.round(Math.random() * 100)
                if (bowchance <= 30){
                    ajoutlog("Second attack thanks to the bow !");

                    // appel fonction dégats
                    damages();

                }
            }

            // change le tour
            calcHP();
            updateHP();
            turn = 1;
            turnchange();
        }

        else {
            
            ajoutlog("It's " + player2.name + "'s turn!");
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

            // appelle fonction heal
            heal();
        

            // change le tour
            calcHP();
            updateHP();
            turn = 1;
            
            turnchange();
        }

        else {
            ajoutlog("It's " + player2.name + "'s turn!");
        }    
    });


    // yield player 1

    document.getElementById("charOneYield").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 0){
            displayYieldScreen ();
        }

        else {
            ajoutlog("It's " + player2.name + "'s turn!");
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

            ajoutlog(me.name + " attack his opponent");

            damages();

            // vérif seconde attaque si bow
        
            if(me.item === "bow"){
                let bowchance = Math.round(Math.random() * 100)
                if (bowchance <= 30){
                    ajoutlog("Second attack thanks to the bow !");
                    // appel fonction dégats
                    damages();
                }
            }

            calcHP();
            updateHP();
            turn = 0;
            turnchange();
        }

        else {
            ajoutlog("It's " + player1.name + "'s turn!");
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

            heal();
        

            calcHP();
            updateHP();
            turn = 0;
            turnchange();
        }

        else {
            ajoutlog("It's " + player1.name + "'s turn!");
        }    
    });

    // player 2 yield

    document.getElementById("charTwoYield").addEventListener("click", function() {
        
        // vérif que c'est votre tour. 
        if (turn == 1){
            displayYieldScreen ();
        }

        else {
            ajoutlog("It's " + player1.name + "'s turn!");
        }    
    });

})();   