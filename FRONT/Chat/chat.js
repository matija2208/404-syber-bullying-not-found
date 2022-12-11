const LINK ="http://localhost"

function potrebno()
{
    var messages = document.getElementsByClassName("message");

    for(var i = 0; i<messages.length;i++){
        console.log(messages[i].offsetHeight);
        messages[i].parentElement.style.height = (messages[i].offsetHeight.toString() + 'px');
        console.log(messages[i].parentElement.offsetHeight);
    }
}

async function Ucitaj()
{
    let id = localStorage.getItem("key");
    //let id = "63950c36014944ff24650908"
    var poruke = (await axios.get(LINK + "/api/poruke/"+id)).data.poruke;
    
    let div="";

    for(let i=0;i<poruke.length;i++)
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
    document.getElementById("kumZorzo").innerHTML=div;
    potrebno();

}
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
        document.getElementById("text").value = "";
    }
}

socket.on(localStorage.getItem("key"), async (msg) => 
{
    try{
        let id = localStorage.getItem("key");
        if(msg.sender==id)
        {
            div+=`
        
            <div class="messages">
                <div class="message rightmessage">${poruke[i].text}</div>
            </div>
            `
        }
        else
        {
            div+=`
            <div class="messages">
                <div class="message leftmessage">${poruke[i].text}</div>
            </div>
            `
        }
        document.getElementById("kumZorzo").innerHTML=div;
    }
    catch(err)
    {
        console.log("greska");
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