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

// ========================================================================================================

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

// ========================================================================================================

function vault_page(){
    // on vault_section only login list content is set to block, everything else is hidden

    // launches function to load the content for logins
    login_vault()

    // select the list of toggles, for each button listents to click and calls function that hides all section, except the one in button value
    const toggles_list = document.querySelector('#view_toggles');
    toggles_list.querySelectorAll('button').forEach(button => button.addEventListener('click', main_view_switch, false));

    // on press of Add Item button, hides element in the aside column and only shows Form to add new login
    const add_item = document.querySelector('#add-login');
    add_item.onclick = () =>{
        const aside_section = document.querySelector('aside');
        aside_section.querySelectorAll('section').forEach(section => section.style.display="none");
        aside_section.querySelector('#new-item').style.display="block";

    };
}

// ========================================================================================================

function login_vault(){
    //  GET request from server to get serialized content of each login by user
    fetch(`/login_vault`)
    .then((response)=> response.json())
    .then((data)=>{

        data.forEach(element => {
            // for each creates a card and populates it with element's values
            card = create_card();
            card.querySelector('.title').textContent = element.title;
            card.querySelector('.username').textContent = element.username;
            let psw_btn = card.querySelector('.password')
            // FIX fix security around cleartext password not be stored in value cleartext (maybe fetch other request for password)
            // pws_btn click calls function to copy password to user's clipboard
            psw_btn.value = element.password
            psw_btn.addEventListener('click', copy_password, false)

            // on view_element button calls function that hides other section except the one of this element type
            let view_elem_btn = card.querySelector('.view-content')
            view_elem_btn.setAttribute('data', element.id);
            view_elem_btn.value = element.type;
            view_elem_btn.addEventListener('click', view_element, false)

            // after populating element-card values, sets card to block and appends to vault content
            card.style.display = "block";
            document.querySelector('#logins-view').append(card);
        }); /* end foreach */
    }); /* end fetch request*/

} /* end function */

// ========================================================================================================

function view_element(event){
    const element_preview = document.querySelector('aside')
    element_preview.querySelectorAll('section').forEach(el => el.style.display = "none");

    // on view button click after hiding every section, based on the values calls dedicated function
    const elem_type = event.currentTarget.value
    switch (elem_type) {
        case 'login':
            // get the id from data attribute of the button
            let id = event.currentTarget.getAttribute('data')
            login_content(id)
            break;
        case 'note':
            note_content()
            break;
        case 'card':
            card_content()
            break;

        default:
            console.log("error SWITCH case")
            break;
    }
}

// ========================================================================================================

function login_content(id){
    document.querySelector('#login-template').style.display = "block"
    fetch()
    const template = document.querySelector('.login-template')
    // template.querySelector('.title') =
    console.log(id);
}

// ========================================================================================================

// called on button press for every login box element
function copy_password(event){
    console.log(event.currentTarget)
    let password = event.currentTarget.value //MAYBE minimize skipping assignment
    navigator.clipboard.writeText(password)

}

// ========================================================================================================

// creates card template by copying node from default template
function create_card(){
    const template = document.querySelector('.login-box');
    const card = template.cloneNode(true);
    return card;
}

// ========================================================================================================

function main_view_switch(event){
    // selects vault content, sets all section to hidden
    const vault_content = document.querySelector('#vault-content');
    vault_content.querySelectorAll('section').forEach(elem => elem.style.display = "none");
    // using the button event value, only shows section of the one clicked by user
    vault_content.querySelector('#' + event.currentTarget.value + '-view').style.display = "block";

}
