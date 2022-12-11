function statsLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var mail = urlParams.get('email');
    console.log(mail);
}