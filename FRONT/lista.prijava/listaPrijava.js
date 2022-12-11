var destination = "../expandedStats/stats.html"

function swapWindows(mail){
    console.log(mail);
    location.href = destination + "?email=" + mail;
}