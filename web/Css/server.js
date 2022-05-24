function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    let name = getCookie("userName");
    if (name != "") {
        document.getElementById("e1").innerHTML = "Welcome again " + name;
    }
    let mail = getCookie("userMail");
    if (mail != "") {
        document.getElementById("e2").innerHTML = "Your mail is " + mail;
    }
    let country = getCookie("userCountry");
    if (country != "") {
        document.getElementById("e3").innerHTML = "You are living in " + country;
    }
    let time = getCookie("lastEntry")
    if (time != "") {
        let time1 = parseInt(time);
        let newTime = today.getTime();
        let t = (newTime - time1) / 1000;
        document.getElementById("e4").innerHTML = "Your last entry was " + t + " seconds ago";
        setCookie("lastEntry", newTime);
    }
}
let today = new Date();
let expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
function setCookie(cname, value) {
    document.cookie = cname + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}
function putCookie (form) {
    setCookie("userName", form.usrname.value);
    setCookie("userMail", form[0].usrmale.value);
    setCookie("userCountry", form[0].usrcountry.value);
    let now = new Date(today.getTime());
    setCookie("lastEntry", now);
    return true;
}