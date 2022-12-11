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

    for(let i =0; i<idKorisnika.length;i++)
    {
        let user = (await axios.get(LINK+"/api/user/"+idKorisnika[i])).data.korisnik;

        let t = (user.nadimak!=="")?user.nadimak:"Nema Nadimak";

        div+=`
        <div class="div-prica1" onclick="locatio.href = '../Chat/chat.html/id=${user._id}'">
            <div class="prica">
                <button class="editbutton" onclick="doShit(${user._id});">EDIT</button>
                <h1> ${t} </h1>         
            </div>
        </div>
        `
    }
}

ucitaj();


async function doShit(id)
{
    let nadimak = prompt("Molim vas unesite novi nadimak za korisnika: ");

    try{
        await axios.put(LINK+"/api/user/dodajNadimak/"+id,{
            nadimak:nadimak
        });
    }catch(err)
    {
        console.log(err.message);
    }
}