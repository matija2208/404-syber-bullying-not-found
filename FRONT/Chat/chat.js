var messages = document.getElementsByClassName("message");

for(var i = 0; i<messages.length;i++){
    console.log(messages[i].offsetHeight);
    messages[i].parentElement.style.height = (messages[i].offsetHeight.toString() + 'px');
    console.log(messages[i].parentElement.offsetHeight);
}