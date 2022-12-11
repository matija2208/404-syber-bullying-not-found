

// const LINK ="http://localhost"
const LINK = "http://localhost";

function potrebno()
{
    var messages = document.getElementsByClassName("message");

    for(var i = 0; i<messages.length;i++){
        messages[i].parentElement.style.height = (messages[i].offsetHeight.toString() + 'px');
    }
}

let sve_poruke = [];

function postojiUporukama(idPoruke)
{
    for(let i=0;i<sve_poruke.length;i++)
    {
        if(sve_poruke[i]._id===idPoruke)
        {
            return true;
        }
    }
    return false;
}

async function Ucitaj()
{
    let id = localStorage.getItem("key");
    const querry = window.location.search;
    const urlParams = new URLSearchParams(querry);
    let idTwo = urlParams.get("id")
    //let id = "63950c36014944ff24650908"
    var poruke = (await axios.get(LINK + "/api/poruke/"+id+"/" + idTwo)).data.poruke;
    
    let div="";
    
    for(let i=0;i<poruke.length;i++)
    {
        if(!postojiUporukama(poruke[i]._id))
        {
            if(poruke[i].sender==id)
            {
                div+=`
            
                <div class="messages">
                    <div class="message rightmessage">${poruke[i].text}</div>
                </div>
                `;
            }
            else
            {
                div+=`
                <div class="messages">
                    <div class="message leftmessage">${poruke[i].text}</div>
                </div>
                `;
            }


        }
    }
    document.getElementById("kumZorzo").innerHTML+=div;
    potrebno();
    const str = document.body;
    console.log(str);
    sve_poruke=poruke;
    // str.scrollTop = str.scrollHeight;
}

setInterval(() => {
Ucitaj();
    
}, 500);
Ucitaj();



var socket = io(LINK);

function posalji(){
    let text = document.getElementById("text").value;
    if(text !== ""){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var receiver = urlParams.get('id');
        socket.emit('chat message', {
            sender:localStorage.getItem("key"),
            tip:localStorage.getItem("tip"),
            receiver:receiver,
            // sender:"63950c36014944ff24650908",
            // tip:false,
            // receiver:"",
            text:text        
        });
        console.log({
            sender:localStorage.getItem("key"),
            tip:localStorage.getItem("tip"),
            receiver:receiver,
            // sender:"63950c36014944ff24650908",
            // tip:false,
            // receiver:"",
            text:text        
        })
        document.getElementById("text").value = "";
    }
}

const kkkk = localStorage.getItem("key")

socket.on(kkkk, async (mesg) => 
{
    console.log(mesg);
    try{
        let id = localStorage.getItem("key");
        let div=``;
        let msg = mesg.poruka;
        
        if(msg.sender==id)
        {
            div+=`
        
            <div class="messages">
                <div class="message rightmessage">${msg.text}</div>
            </div>
            `
        }
        else
        {
            div+=`
            <div class="messages">
                <div class="message leftmessage">${msg.text}</div>
            </div>
            `
        }
        document.getElementById("kumZorzo").innerHTML+=div;
        potrebno();
    }
    catch(err)
    {
        console.log(err.message);
    }
});

// socket.on("63950c36014944ff24650908", async function(mesg) 
// {
//     try{
//         let id ="63950c36014944ff24650908";
//         let div="";
//         let msg = mesg.poruka;
//         console.log(msg)
//         if(msg.sender==id)
//         {
//             div+=`
        
//             <div class="messages">
//                 <div class="message rightmessage">${msg.text}</div>
//             </div>
//             `
//         }
//         else
//         {
//             div+=`
//             <div class="messages">
//                 <div class="message leftmessage">${msg.text}</div>
//             </div>
//             `
//         }
//         document.getElementById("kumZorzo").innerHTML+=div;
//         potrebno();
//     }
//     catch(err)
//     {
//         console.log(err.message);
//     }
// });