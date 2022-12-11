async function ValidirajRegister(){
    valid_test = true;
    var entries = document.getElementById("forma");
    regex_valid_ime(entries);
    everything_filled(entries);
    regex_valid_mail(entries)
    regex_valid_pass(entries);
    regex_valid_repeat(entries);
    regex_valid_contact(entries);
   
    

    if(valid_test != true){
        console.log("Korisnik se ne registruje")
    }else{
        let imeIprezime = document.getElementById("ime_input").value;
        let email = document.getElementById("mail_input").value;
        let password = document.getElementById("pass_input").value;
        let broj_telefona = document.getElementById("kontakt_input").value;
        
        
        try{
            let info = (await axios.post(LINK+"/api/radnik/register",{
                ime:(imeIprezime.split(' '))[0],
                prezime:(imeIprezime.split(' '))[1],
                email:email,
                password:password,
                brojTelefona:broj_telefona,

            })).data;
            if(info.uspesnost)
            {
                localStorage.setItem("key",info.id);
                localStorage.setItem("tip",1);
                location.href="../index.html";
            }
            else
            {
                console.log("nece konju");
            }
        }catch(err)
        {
            console.log(err.message);
        }
    }
}