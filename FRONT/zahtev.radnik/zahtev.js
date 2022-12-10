var SLIKA=""; 
var realWidth;
var realHeight;
function reportInfo(vars, showType = false) {
    if (showType === true); //console.log(typeof vars);
    //console.log(vars);
}

function addImg(ele, content) {
    var myDIV = document.querySelector(ele);
    var newContent = document.createElement('div');
    newContent.innerHTML = content;

    while (newContent.firstChild) {
        myDIV.appendChild(newContent.firstChild);
    }
}

var feedback = function(res) {
    reportInfo(res, true);
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        var content =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' 
             + '<img class="img" alt="Imgur-Upload" id="slika" src=\"' + get_link + '\"/>';
        addImg('.status', content);
        SLIKA = get_link;
        realWidth = document.querySelector("#slika").offserWidth;
        realHeight = document.querySelector("#slika").offsetHeight;
        document.querySelectorAll('.dropzone').ubacena = 'da';
        console.log(realWidth + ', ' + realHeight);
    }
};

new Imgur({
    clientid: 'a08fd223eb9d597', //You can change this ClientID
    callback: feedback
});