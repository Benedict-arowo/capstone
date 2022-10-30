document.addEventListener("DOMContentLoaded", function(){

    const url = new URL(document.URL);
    const base_path = url.pathname.split("/")[1];

    if (base_path== "login"){
        login_toggle();
    }
}); /*end of DOMContentLoaded */


function login_toggle(){
    const toggle = document.querySelector('#toggle-view');
    toggle.onclick = () =>{
        if (toggle.value == "register_form"){
            document.querySelector("#login_form").style.display = "none";
            document.querySelector("#register_form").style.display = "block";
            toggle.value = "login_form"
            toggle.textContent = "Log-in"
        }
        else {
            document.querySelector("#login_form").style.display = "block";
            document.querySelector("#register_form").style.display = "none";
            toggle.value = "register_form"
            toggle.textContent = "Register"
            
        }
    }
}