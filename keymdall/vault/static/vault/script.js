document.addEventListener("DOMContentLoaded", function(){

    const url = new URL(document.URL);
    const base_path = url.pathname.split("/")[1];

    if (base_path== "login"){
        login_toggle();
    }
    else if (base_path == ""){
        vault_page();
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

        };
    };
}

function vault_page(){
    const login_view = document.querySelector('#login-view').style.display = "block";
    const notes_view = document.querySelector('#notes-view').style.display = "none";
    const cards_view = document.querySelector('#cards-view').style.display = "none";

    const list = document.querySelector('#view_toggles');
    list.onclick = (e) => {
        console.log(this.event.target.value)
        if(this.event.target.value == "logins"){
            document.querySelector('#login-view').style.display = "block";
            document.querySelector('#notes-view').style.display = "none";
            document.querySelector('#cards-view').style.display = "none";

            get_logins();
        }else if (this.event.target.value == "notes"){
            document.querySelector('#login-view').style.display = "none";
            document.querySelector('#notes-view').style.display = "block";
            document.querySelector('#cards-view').style.display = "none";

            get_notes();
        }else if (this.event.target.value == "cards"){
            document.querySelector('#login-view').style.display = "none";
            document.querySelector('#notes-view').style.display = "none";
            document.querySelector('#cards-view').style.display = "block";

            get_cards();
        };
    };
}

function get_logins(){

}
