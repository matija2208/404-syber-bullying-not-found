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