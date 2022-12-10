var state = "";
var counter = 0;
var question = document.getElementById("questionDiv");
var ans1 = document.getElementById("option1Div");
var ans2 = document.getElementById("option2Div");
var ans3 = document.getElementById("option3Div");

function optionAChoose(){
    state = (state + "A");
    reloadQuestion();
}

function optionBChoose(){
    state = (state + "B");
    reloadQuestion();
}

function optionCChoose(){
    state = (state + "C");
    reloadQuestion();
}

function reloadPage(){
    location.reload();
}

function reloadQuestion(){
    console.log(state);
    switch(state){
        case "A":
            question.textContent = "Ostale poruke su iste, pa čak i još gore! Osećate se vrlo povređeno, i dan vam je malo gori.\nNemojte da čitate poruke onih koji vrše nasilje nad vama, jer nema ničeg korisnog.";

            ans1.textContent = "A - Blokirajte nalog";
            ans2.textContent = "B - Pošaljite par poruka kao odgovor";
            ans3.textContent = "C - Ignorišite ostatak poruka odmah";
        break;

        case "AB":
            question.textContent = "Posle tih poruka, nasilnik nastavlja da vam šalje vrlo uvredljive poruke.\nNikad nemojte da odgovarate ovakvim osobama, jer samo traže reakciju od vas.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "AA":
            question.textContent = "Nalog je blokiran, i ne dobijate više uznemiravajućih poruka od te osobe.\nBlokiranje naloga je uvek dobra ideja, jer sasvim zaustavlja bilo kakav kontakt sa osobom koja vrši nasilje nad vama.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "AC":
            question.textContent = "Napravili ste objavu, i ta ličnost ostavlja nove komentare koji su podjednako loši kao i druge koje su vam slali pre.\nUvek je dobra ideja da se razgovara sa nekim o nasilju, ali pravljenje javne objave je loš potez, jer daje mnogo više pažnje njihovom nasilju.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "B":
            question.textContent = "Posle tih poruka, nasilnik nastavlja da vam šalje vrlo uvredljive poruke.\nNikad nemojte da odgovarate ovakvim osobama, jer samo traže reakciu od vas.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "C":
            question.textContent = "Videli ste koliko su napadni i koliko se trude da te uvrede, pa niste hteli da nastavite sa čitanjem.\nKada god dobijete uvredljive poruke online, nemojte da ih čitate do kraja i ignorišite sve što pričaju.";

            ans1.textContent = "A - Blokirajte nalog";
            ans2.textContent = "B - Prijavite nasilje bližem centru za socialni rad";
            ans3.textContent = "C - Nastavi sa ignorisanjem";
        break;

        case "CA":
            question.textContent = "Takođe ste i blokirali nalog, da ne biste dobili ostale poruke. Ovo je odlična ideja zato što ukidate bilo kakav kontakt sa ovom osobom na virtuelnom svetu, što sprečava bilo koje buduće nasilje od njihovog trenutnog naloga.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "CB":
            question.textContent = "Prijavili ste ovo nasilje centru za socialni rad. Oni će proslediti ovu prijavu adekvatnim radnicima i dobićete podršku od stručnih lica.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;

        case "CC":
            question.textContent = "Odlučili ste da ne radite ništa posle ovoga. Čak iako ste ignorisali naslje ne znači da će prestati u budućnosti o ovog naloga.\nUvek je dobra ideja da se nalog blokira ili prijavi, da bi se sprečili pokušaji za nove poruke.";

            ans1.textContent = "nil";
            ans2.textContent = "nil";
            ans3.textContent = "nil";
        break;     
    }
    if(ans1.textContent == "nil"){
        ans1.classList.add("hidden");
        counter++;
    }else{ans1.classList.remove("hidden");}
    if(ans2.textContent == "nil"){
        ans2.classList.add("hidden");;
        counter++;
    }else{ans2.classList.remove("hidden");}
    if(ans3.textContent == "nil"){
        ans3.classList.add("hidden");
        counter++;
    }else{ans3.classList.remove("hidden");}

    if(counter == 3){
        document.getElementById("finalDiv").classList.remove("hidden");
    }
}

//addEventListener('click', (event) => {reloadQuestion();});