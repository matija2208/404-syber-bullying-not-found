const korisnik = require("../TEMPLATES/korisnik");
const radnik = require("../TEMPLATES/radnik");

const enigma = require("../BAZA/enigma");

async function post(req,res)
{
    try{
        const newKorisnik = new radnik({
            ime:req.body.ime,
            prezime:req.body.prezime,
            email:req.body.email,
            password:enigma(req.body.password),
            brojTelefona:req.body.brojTelefona,
            overa:"",
            profilna:req.body.profilna,
            idKorisnika:[],
            overen:false,
            opis:""
        });
        const savedKorisnik = await newKorisnik.save();

        res.json({
            uspesnost:true,
            id:savedKorisnik._id
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function login(req,res)
{
    try{
        const users= await radnik.find();
        const pass = enigma(req.body.password);
        let x = false;

        for(let i = 0; i<users.length;i++)
        {
            let e = users[i];
            if(req.body.email===e.email && pass === e.password)
            {
                const ID = (String)(e._id)
                x=true;
                res.json({
                    uspesnost:true,                    
                    id:ID
                });
                break;
            }
        }

        

        if(!x)
        {
            res.json({
                uspesnost:false
            });
        }
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function get(req,res)
{
    try{
        
        const id = req.params.id;

        const RADNIK = await radnik.findById(id);

        res.json({
            uspesnost:true,
            radnik:{
                ime:RADNIK.ime,
                prezime:RADNIK.prezime,
                email:RADNIK.email,
                brojTelefona:RADNIK.brojTelefona,
                overa:RADNIK.overa,
                profilna:RADNIK.profilna,
                idKorisnika:RADNIK.idKorisnika,
                overen:RADNIK.overen,
                opis:RADNIK.opis,

                id:RADNIK._id
            }
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function overavanje(req,res)
{
    try{
        
        const id = req.params.id;

        let RADNIK = await radnik.findById(id);

        RADNIK.overen=true;
        RADNIK.opis=req.body.opis;

        await RADNIK.save();

        res.json({
            uspesnost:true,
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function getNeoverene(req,res)
{
    try{
        let t=[];
        const radnici = await radnik.find();

        for(let i=0;i<radnici.length;i++)
        {
            if(!radnici[i].overen)
            {
                t.push({
                    ime:radnici[i].ime,
                    prezime:radnici[i].prezime,
                    email:radnici[i].email,
                    brojTelefona:radnici[i].brojTelefona,
                    overa:radnici[i].overa,
                    profilna:radnici[i].profilna,
                    idKorisnika:radnici[i].idKorisnika,
                    overen:radnici[i].overen,
                    opis:radnici[i].opis,

                    id:radnici[i]._id
                });
            }
        }

        res.json({
            uspesnost:true,
            radnici:t
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function dodajOveru(req,res)
{
    try{
        
        let RADNIK = (await radnik.findById(req.params.id));

        RADNIK.overa=req.body.overa;

        await RADNIK.save();

        res.json({
            uspesnost:true,
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

module.exports = new Object({
    "register":post,
    "login":login,
    "get":get,
    "overi":overavanje,
    "list":getNeoverene,
    "dodajOveru":dodajOveru
});