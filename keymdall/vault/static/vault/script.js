document.addEventListener("DOMContentLoaded", function(){

    const url = new.URL(document.URL);
    const base_path = url.pathname.split("/")[1];

    if (base_path== "login"){
        login_page();
    }
}); /*end of DOMContentLoaded */


function login_page(){
    const button = document.querySelector
}