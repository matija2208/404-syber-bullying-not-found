var valid_test;
const LINK = "http://404antinasilje.cf";

function everything_filled(entries){

    if(entries.mail_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyMailWarning").classList.remove("hidden");
    } else document.getElementById("EmptyMailWarning").classList.add("hidden");

    if(entries.pass_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyPassWarning").classList.remove("hidden");
    } else document.getElementById("EmptyPassWarning").classList.add("hidden");

    if(entries.pass_repeat.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyRepeatWarning").classList.remove("hidden");
    } else document.getElementById("EmptyRepeatWarning").classList.add("hidden");

    if(entries.ime_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyImeWarning").classList.remove("hidden");
    } else document.getElementById("EmptyImeWarning").classList.add("hidden");

    if(entries.kontakt_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyContactWarning").classList.remove("hidden");
    } else document.getElementById("EmptyContactWarning").classList.add("hidden");
    
    
}

function regex_valid_ime(entries){
    var pattern = /^[A-Za-z0-9 ]{1,100}$/;
    var tekst = entries.ime_input.value;
    var test = tekst.match(pattern);
    
    if (test==null){
        document.getElementById("ErrorImeWarning").classList.remove("hidden");
        valid_test = false;
    } else{
        console.log("validirano ime korisnika...");
        document.getElementById("ErrorImeWarning").classList.add("hidden");
    }
}

function regex_valid_mail(entries){
    var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var tekst = entries.mail_input.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorMailWarning").classList.remove("hidden");
        valid_test = false;
    } else{
      console.log("validiran email korisnika...");
      document.getElementById("ErrorMailWarning").classList.add("hidden");
    }
}

function regex_valid_pass(entries){
   var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
   var tekst = entries.pass_input.value;
   var test = tekst.match(pattern);

   if (test == null) {
        document.getElementById("ErrorPassWarning").classList.remove("hidden");
        valid_test = false;
    } else{
      console.log("validirana lozinka korisnika...");
      document.getElementById("ErrorPassWarning").classList.add("hidden");
    }
}

function regex_valid_repeat(entries){
    var password = entries.pass_input.value;
    var repeatPass = entries.pass_repeat.value;
    if(password != repeatPass){
        valid_test = false;
        document.getElementById("ErrorRepeatWarning").classList.remove("hidden");
    } else{
        console.log("validirana ponovljena lozinka korisnika...");
        document.getElementById("ErrorRepeatWarning").classList.add("hidden");
    }
}

function regex_valid_contact(entries){
    var pattern = /^[0-9]{10}$/;
    var tekst = entries.kontakt_input.value;
    var test = tekst.match(pattern);

    if(test == null){
        document.getElementById("ErrorContactWarning").classList.remove("hidden");
        valid_test = false;
    } else{
        console.log("validiran kontakt info korisnika");
        document.getElementById("ErrorContactWarning").classList.add("hidden");
    }
}


function regex_valid_profile(varA, varB) {
    if (typeof varB !== 'undefined') {
       if(varA == varB){
        document.getElementById("ErrorProfileWarning").classList.add("hidden");
       }else{
        document.getElementById("ErrorProfileWarning").classList.remove("hidden");
        valid_test = false;
       }
    } else {
       var img = new Image();
       img.src = varA;
       img.onload = function() {
        regex_valid_profile(this.width, this.height);
       }
    }
}

////
function ValidirajRegister(){
    valid_test = true;
    var entries = document.getElementById("forma");
    regex_valid_ime(entries);
    everything_filled(entries);
    regex_valid_mail(entries)
    regex_valid_pass(entries);
    regex_valid_repeat(entries);
    regex_valid_contact(entries);
    regex_valid_profile(document.getElementById("slika").src);
    if(valid_test){
        location.href="overa.html";
    }

    // if(valid_test != true){
    //     console.log("Korisnik se ne registruje")
    // }else{
    //     let imeIprezime = entries.ime_input.value;
    //     let password = entries.pass_input.value;
    //     let mail = entries.mail_input.value;
    // todo

    //     let ispis = await axios.post(LINK+'/api/user',{
    //         ime:imeIprezime,
    //         prezime:"",
    //         username:username,
    //         password:password,
    //         mail:mail
    //     });


    //     console.log(ispis);
    //     if(ispis.data.uspesnost)
    //     {
    //         console.log("Korisnik se registruje");
    //         let id = ispis.data.id;

    //         localStorage.setItem("key",id);
    //         location.href="../pocetna/pocetna.html"
    //     }

        
    // }
}

