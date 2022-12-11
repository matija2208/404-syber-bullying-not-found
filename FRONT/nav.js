const LINK = "www.404sbnf.cf"
function loginbox(){
    if(document.getElementById("loginbox").getAttribute("open") == "da"){
        document.getElementById("loginbox").style.display="none";
        document.getElementById("loginbox").setAttribute('open', 'ne');
    }
    else{
        document.getElementById("loginbox").style.display="block";
        document.getElementById("loginbox").setAttribute('open', 'da');
    }
}


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
      if(document.getElementById("loginbox").getAttribute("open") == "da"){
        document.getElementById("loginbox").style.display="none";
        document.getElementById("loginbox").setAttribute('open', 'ne');
    }
    }
}

// async function Brisi()
// {
//     document.getElementById("loginbox").style.display="none";
//     document.getElementById("loginbox").setAttribute('open', 'ne');
//     let ID = localStorage.getItem("key");

//     let test = (await axios.post(LINK + '/api/user/delOne',{
//         id:ID
//     }));
//     console.log(test);
//     if(test.data.uspesnost)
//     {
//         localStorage.removeItem("key");
//         OdjaviSe();
//     }

// }

// function Pitaj()
// {
//     let div = `
//                 <h1 class="logboxdata">Da li ste sigurni da zelite da obrisete svoj nalog?</h1>
                
//                 <input class="dugme" type="button" value="NE" onclick="ifLogedIn()"/>
//                 <input class="dugme" style="float:right" type="button" value="DA" onclick="Brisi()"/>
//             `
//             document.getElementById("loginbox").innerHTML=div;
// }

async function ifLogedIn()
{
    let key = localStorage.getItem("key");
    console.log(key);
    if(key!=null)
    {
        console.log(key);
        let user;

        if(localStorage.getItem("tip") == 0)
        {
            user = (await axios.get(LINK + '/api/user/'+key)).data.korisnik;
        }
        else
        {
            user = (await axios.get(LINK + '/api/radnik/'+key)).data.radnik;
        }

        console.log(user);

        if(user != undefined)
        {
            document.getElementById("trebaMiId").innerHTML = "Moj Nalog";

            let div = `
                <h1 class="logboxdata">${user.email}</h1>
                <input class="dugme" type="button" value="ODJAVI SE" onclick="OdjaviSe()"/>
                
            `
            let tip = localStorage.getItem("tip");
            if(tip == 0 && user.idRadnika==""){
                div+=`<input class="dugme" type="button" value="KONTAKTIRAJ" onclick="DodajRadnika()"/>`
            }
                
            document.getElementById("loginbox").innerHTML=div;
        }
    }
}

async function DodajRadnika()
{
    try
    {
        await axios.put(LINK+"/api/user/dodajRadnika/"+localStorage.getItem("key"));
        let idRadnika = (await axios.get("www.404sbnf.cf/api/user/"+id)).data.korisnik.idRadnika;

            location.href="../Chat/chat.js/"+idRadnika;
    }
    catch(err)
    {
        console.log(err.message);
    }
}

function OdjaviSe()
{
    localStorage.removeItem("key");
    localStorage.removeItem("tip");
    document.getElementById("trebaMiId").innerHTML = "Prijavi se";

    let div = `
            <input class="polje_unos"type='text' id="korisnickoIme_input" placeholder='Korisničko ime ili email:'  /><br>
            <input class="polje_unos"type='password' id="pass_input" placeholder='Lozinka:'  /><br>
            <input class="dugme" type='button' value="PRIJAVI SE" id="registracija" onclick="Login()" />
            <a href="./reg.korisnik/reg.html" class="reg-nav">Registruj se</a>
            `
    document.getElementById("loginbox").innerHTML=div;

}

async function Login()
{
    var username = document.getElementById("korisnickoIme_input").value;
    var password = document.getElementById("pass_input").value;
    
    let login1 = (await axios.post(LINK + '/api/user/login',{
        
        email:username,
        password:password
    })).data;
    let login2 = (await axios.post(LINK+'/api/radnik/login',{
        email:username,
        password:password
    })).data;

    if(login1.uspesnost)
    {
        localStorage.setItem("key",login1.id);
        localStorage.setItem("tip", 0);
        loginbox();
        await ifLogedIn();
    }
    else if(login2.uspesnost)
    {
        localStorage.setItem("key", login2.id);
        localStorage.setItem("tip", 1);
        loginbox();
        await ifLogedIn();
    }
}

ifLogedIn();