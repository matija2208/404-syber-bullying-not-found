const korisnik = require("../TEMPLATES/korisnik");
const radnik = require("../TEMPLATES/radnik");

const enigma = require("../BAZA/enigma");

async function post(req,res)
{
    try{
        const newKorisnik = new korisnik({
            email:req.body.email,
            password:enigma(req.body.password),
            idRadnika:"",
            nadimak:""
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
        const users= await korisnik.find();
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

        const KORISNIK = await korisnik.findById(id);

        res.json({
            uspesnost:true,
            korisnik:{
                email:KORISNIK.email,
                idRadnika:KORISNIK.idRadnika,
                nadimak:KORISNIK.nadimak,
                id:KORISNIK._id
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

async function dodajRadnika(req,res)
{
    try{
        
        const id = req.params.id;

        let KORISNIK = await korisnik.findById(id);

        let radnici = await radnik.find();

        let t = radnici[0];

        for(let i = 1;i<radnici.length;i++)
        {
            if(radnici[i].idKorisnika.length<t.idKorisnika.length)
            {
                t=radnici[i];
            }
        }

        KORISNIK.idRadnika = t._id;
        t.idKorisnika.push(KORISNIK._id);
        await t.save();
        await KORISNIK.save();

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

async function promeniRadnika(req,res)
{
    try{
        
        const id = req.params.id;

        let KORISNIK = await korisnik.findById(id);

        let radnici = await radnik.find();

        let t = radnici[0];

        for(let i = 1;i<radnici.length;i++)
        {
            if(radnici[i].idKorisnika.length<t.idKorisnika.length && radnici[i]._id !== KORISNIK.idRadnika)
            {
                t=radnici[i];
            }
        }
        
        let g = await radnik.findById(KORISNIK.idRadnika);

        g.idKorisnika.filter(ID=>ID!=id);

        KORISNIK.idRadnika = t._id;
        t.idKorisnika.push(KORISNIK._id);
        
        await t.save();
        await KORISNIK.save();

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

async function dodajNadimak(req,res)
{
    try{
        
        const id = req.params.id;
        const nadimak = req.body.nadimak;

        let KORISNIK = await korisnik.findById(id);

        KORISNIK.nadimak = nadimak;
        
        await KORISNIK.save();

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

module.exports = new Object({
    "get":get,
    "login":login,
    "register":post,
    "dodajRadnika":dodajRadnika,
    "promeniRadnika":promeniRadnika,
    "dodajNadimak":dodajNadimak
})