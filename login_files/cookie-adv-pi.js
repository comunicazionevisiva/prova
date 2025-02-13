
function getCookie(nome) {
    var name = nome + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function returnObjFromId(id){
    if (document.getElementById)
        var returnVar = document.getElementById(id);
    else if (document.all)
        var returnVar = document.all[id];
    else if (document.layers)
        var returnVar = document.layers[id];
    return returnVar;
}

var chk = getCookie('cookie_pi_accept');
var chiudi = returnObjFromId('alertCookie-confirm');
var avviso = returnObjFromId('content-alert-cookie');

if (chk == '') {
    returnObjFromId('content-alert-cookie').style.display = 'block';

} else {
    returnObjFromId('content-alert-cookie').style.display = 'none';
}

chiudi.onclick = function(){
    //document.cookie = "cookie_pi_accept=true;domain=" + window.location.hostname + ";expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    document.cookie = "cookie_pi_accept=true;domain=poste.it;expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    avviso.style.display = 'none';
}
