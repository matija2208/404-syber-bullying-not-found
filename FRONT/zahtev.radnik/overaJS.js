var valid_test;
const LINK = 'http://localhost';

function everything_filled(entries){
    /**Lukaaaaaaaaaaaaa */
    let x = document.getElementById("dropit").getAttribute('ubacena');
    console.log(x);
    if(x != "da"){
        valid_test = false;
        document.getElementById("EmptyProfileWarning").classList.remove("hidden");
    } else document.getElementById("EmptyProfileWarning").classList.add("hidden");
}

////
function ValidirajRegister(){
    valid_test = true;
    everything_filled();
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

