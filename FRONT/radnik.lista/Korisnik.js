/*          <div class="div-prica1">
                <div class="prica">
                    <button class="editbutton" onclick="doShit();">EDIT</button>
                    <h1> NADIMAK </h1>         
                </div>
            </div> 
*/
//let poruka = (await axios.get(LINK+"/api/poruke/"+idKorisnika[i]+"/"+localStorage.getItem("key"))).data.poruke;



async function ucitaj()
{
    let idKorisnika = (await axios.get(LINK+"/api/radnik/"+localStorage.getItem("key"))).data.radnik.idKorisnika;

    let div=``;
    console.log(idKorisnika);

    for(let i =0; i<idKorisnika.length;i++)
    {
        let user = (await axios.get(LINK+"/api/user/"+idKorisnika[i])).data.korisnik;
        console.log(user);
        let t = (user.nadimak!="")?user.nadimak:"Nema Nadimak";
        console.log(t);
        div+=`
        <div class="div-prica1" >
            <div class="prica">
                <button class="editbutton" onclick="doShit('${user.id}');">EDIT</button>
                <h1 onclick="location.href = '../Chat/chat.html?id=${user.id}'"> ${t} </h1>         
            </div>
        </div>
        `
    }
    document.getElementById("idejazaajdi").innerHTML=div;
}

ucitaj();


async function doShit(id)
{
    let nadimak = prompt("Molim vas unesite novi nadimak za korisnika: ");

    try{
        await axios.put(LINK+"/api/user/dodajNadimak/"+id,{
            nadimak:nadimak
        });
        location.reload();
    }catch(err)
    {
        console.log(err.message);
    }
}