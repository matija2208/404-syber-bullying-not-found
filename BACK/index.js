const ex = require("express");
const cors = require("cors");
const http = require("http");
const  socketio  = require("socket.io");

//const poruka = require("../TEMPLATES/poruka");

const app=ex();
app.use(ex.static("../FRONT"))
app.use(cors());
//io.use(cors());
app.use(ex.json());

const server = http.createServer(app);

const io = socketio(server,{
    cors:{
        origin:"http://127.0.0.1:5501",
        methods:["GET","POST"]
    }
});

const PORT=80;
server.listen(PORT, function(){
    console.log("Server slusa na portu: "+PORT);
});

const baza = require("./BAZA/baza");
const korisnik=require("./FUNCTIONS/korisnik");
const radnik=require("./FUNCTIONS/radnik");
const poruka=require("./TEMPLATES/poruka");

baza();

app.get("/api/user/:id", korisnik.get);
app.post("/api/user/register", korisnik.register);
app.post("/api/user/login", korisnik.login);
app.put("/api/user/dodajRadnika/:id", korisnik.dodajRadnika);
app.put("/api/user/promeniRadnika/:id", korisnik.promeniRadnika);
app.put("/api/user/dodajNadimak/:id", korisnik.dodajNadimak);

app.get("/api/radnik/:id", radnik.get);
app.post("/api/radnik/register", radnik.register);
app.post("/api/radnik/login",radnik.login);
app.put("/api/radnik/overi/:id",radnik.overi);
app.get("/api/user/list", radnik.list);
app.put("/api/radnik/dodajOveru/:id", radnik.dodajOveru);

app.get("/api/poruke/:one/:two", async function(req,res){
    try{
        let t=[];
        const idOne=req.params.one;
        const idTwo=req.params.two;
        let poruke = await poruka.find();
        for(let i=0;i<poruke.length;i++)
        {
            if((poruke[i].sender===idOne || poruke[i].receiver===idOne)&&(poruke[i].sender===idTwo || poruke[i].receiver===idTwo))
            {
                t.push(poruke[i]);
            }
        }
        res.json({
            uspesnost:true,
            poruke:t
        })
    }catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
})
//za front
//<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>

io.on('connection',async function(socket){
    socket.on('chat message', async (msg) => 
    {
        //console.log(msg);
        try{
            let t=new poruka({
                sender:msg.sender,
                tip:msg.tip,
                text:msg.text,
                receiver:msg.receiver
            })
            let y = await t.save();

            console.log("rec",msg.receiver);
            console.log("send",msg.sender);
            socket.emit(msg.receiver, {
                poruka:y
            });
            
            // socket.emit(msg.sender, {
            //     poruka:y
            // });  
        }
        catch(err)
        {
            console.log(err.message);
        }
    });
  });
