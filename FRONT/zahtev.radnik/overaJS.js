var valid_test;
const LINK = "http://404antinasilje.cf";

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
async function ValidirajRegister(){
    valid_test = true;
    everything_filled();
    

    if(valid_test != true){
        console.log("Korisnik se ne registruje")
    }else{
        try{
            let info = (await axios.put(LINK+"/api/radnik/register/"+localStorage.getItem("key"),{
                overa:SLIKA
            })).data;
            if(info.uspesnost)
            {
                localStorage.setItem("key",info.id);
                localStorage.setItem("tip",1);
                location.href="overa.html";
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

