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
    const toggle = document.querySelector('#login-register-toggle');
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
    // on vault page default to login view and hide notes
    const login_view = document.querySelector('#login-view').style.display = "block";
    const notes_view = document.querySelector('#notes-view').style.display = "none";
    const cards_view = document.querySelector('#cards-view').style.display = "none";
    document.querySelector('#new-item').style.display="none";


    const list = document.querySelector('#view_toggles');
    list.onclick = (e) => {
        console.log(this.event.target.value)
        if(this.event.target.value == "logins"){
            document.querySelector('#login-view').style.display = "block";
            document.querySelector('#notes-view').style.display = "none";
            document.querySelector('#cards-view').style.display = "none";

            listen_logins();
        }else if (this.event.target.value == "notes"){
            document.querySelector('#login-view').style.display = "none";
            document.querySelector('#notes-view').style.display = "block";
            document.querySelector('#cards-view').style.display = "none";

            listen_notes();
        }else if (this.event.target.value == "cards"){
            document.querySelector('#login-view').style.display = "none";
            document.querySelector('#notes-view').style.display = "none";
            document.querySelector('#cards-view').style.display = "block";

            listen_cards();
        };
    };

    const add_item = document.querySelector('#add-item');
    add_item.onclick = () =>{
        document.querySelector('#item-content').style.display="none";
        document.querySelector('#new-item').style.display="block";

    };
}

function logindata(){

// with this I want to load the reposne from server then lookfor the hiddent listing-card and send cloneNode on each iteration
    fetch(`/logindata/`)
    .then((response)=> response.json())
    .then((data)=>{

    })

}
