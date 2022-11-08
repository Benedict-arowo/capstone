document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const base_path = url.pathname.split("/")[1];


  //   on access if not autheticated, will be redirected to login page
  if (base_path == "login") {
    sign_in_or_register();
  } else if (base_path == "") {
    vault_page();
  }
}); /*end of DOMContentLoaded */

// ========================================================================================================

function sign_in_or_register() {
  const toggle = document.querySelector("#login-register-toggle");
  toggle.onclick = () => {
    if (toggle.value == "register_form") {
      document.querySelector("#login_form").style.display = "none";
      document.querySelector("#register_form").style.display = "block";
      toggle.value = "login_form";
      toggle.textContent = "Log-in";
    } else {
      document.querySelector("#login_form").style.display = "block";
      document.querySelector("#register_form").style.display = "none";
      toggle.value = "register_form";
      toggle.textContent = "Register";
    }
  };
}

// ========================================================================================================

function vault_page() {
  // on vault_section only login list content is set to block, everything else is hidden

  // launches function to load the content for logins
  show_logins();

  // select the Sidebar list of toggles, for each button listents to click and calls function that hides all section, except the one in button value
  const view_toggles_list = document.querySelector("#view_toggles");
  view_toggles_list
    .querySelectorAll("button")
    .forEach((button) =>
      button.addEventListener("click", main_view_switch, false)
    );

  // on press of Add Item button, hides element in the aside column and only shows Form to add new login
  const add_item_btn = document.querySelector("#add-login");
  add_item_btn.onclick = () => {
    const aside = document.querySelector("aside");
    aside.querySelector("#element-content").style.display = "none"
    aside.querySelector("#new-item").style.display = "block";
  };
}

// ========================================================================================================

function show_logins() {
  //  GET request from server to get serialized content of each login by user
  fetch(`/login_vault`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        // for each creates a card and populates it with element's values
        card = create_card();
        card.querySelector(".title").textContent = element.title;
        card.querySelector(".username").textContent = element.username;
        let psw_btn = card.querySelector(".password");
        // FIX fix security around cleartext password not be stored in value cleartext (maybe fetch other request for password)
        // pws_btn click calls function to copy password to user's clipboard
        psw_btn.value = element.password;
        psw_btn.addEventListener("click", copy_password, false);

        // on view_element button calls function that hides other section except the one of this element type
        let view_elem_btn = card.querySelector(".view-content");
        view_elem_btn.setAttribute("data", element.id);
        view_elem_btn.value = element.type;
        view_elem_btn.addEventListener("click", view_element, false);

        // after populating element-card values, sets card to block and appends to vault content
        card.style.display = "block";
        document.querySelector("#logins-view").append(card);
      }); /* end foreach */
    }); /* end fetch request*/
} /* end function */

// ========================================================================================================

function view_element(event) {
  // hides all section in aside, shows the one for element display
  const aside = document.querySelector("aside");
  aside.querySelector('#new-item').style.display = "none";
//   aside.querySelector('#new-item').remove();
  const element_content = document.querySelector("#element-content");
  element_content.style.display = "block";

  //   gets the ID from the button data= attribute
  const elem_id = event.currentTarget.getAttribute("data");
  //   gets the type from the button value
  const elem_type = event.currentTarget.value;

//   would be fetch('edit/login/id')
  fetch(`edit/${elem_type}=${elem_id}`)
    .then((response) => response.text())
    .then((form) => {
        //   qua si distacca come vorrei farlo, una volta preso il valore del coso, dovrei inserirlo in un template, ma senza la modifica, per poi inserire la modifica solo quando richiesto da EDIT
      const edit_form = document.querySelector('#edit')

      edit_form.innerHTML = form;

      element_content.append(edit_form);

    //   edit_form is an object, that doesn't have direct children but we select All items inside it that are either textarea, input or select, and on their change we add edited class
      const form_fields = edit_form.querySelectorAll('textarea, input, select');
      form_fields.forEach((field) =>{
        field.addEventListener('change', () => field.classList.add('edited'));
        })


    //   addEventlistener Function.prototype.bind() avoids invoking a function directly as the script gets read
    // this allows for binding parameters that will get sent to the function only at execution
    // NOTE .bind() evita che venga invocata la funzione direttamente da js, in modo da poter passare parametri
    // ma sta diventando confusionario, comunque, qui chiama put_edit solo quando c'è click (once=true oppure false non so cosa faccia)
      edit_form.addEventListener('submit', put_edit.bind(elem_id), false);

    });
}

// ========================================================================================================
// NOTE una volta chiamato, prende l'event, mentre l'elem_id è il contesto di questa funzione cioè this console.log(`questo È l'id: ${this}`);
// l'event è sempre il click, mentre il parametro è diventato il contesto (ma non capisco il resto, cercare Currying)
function put_edit(event){
    // evita submission
    event.preventDefault();

    // dichiara un body vuoto
    const body = {};
    //seleziona tutti i field con l'edit e costruisce il body con i suoi key[field.name] = value[field.value]
    const edited_fields = event.target.querySelectorAll('.edited');
    edited_fields.forEach((field) => {
        body[field.name]= field.value;
    })
    console.log("csrf token 3 different ways, none working");
    console.log(` 1st way ${event.target.querySelector('[name=csrfmiddlewaretoken]').value}`);
    console.log(` 2nd way ${csrftoken}`);
    console.log(` 3rd way ${getCookie("csrftoken")}`);


    fetch(`edit/login=${this}`, {
        method : "PUT",
        Headers:{
            "X-CSRFToken":csrftoken,
            "Content-type": "application/json",
        },
        mode:"same-origin",
        body : JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
}

// ========================================================================================================
// function build_template(type) {
//   switch (type) {
//     case "login":
//       const template = document
//         .querySelector(".login-base-template")
//         .cloneNode(true);
//       template.setAttribute("id", "login-template");
//       return template;

//     case "note":
//       console.log("NOTE ON SWITCH STATEMENT 2");
//     case "card":
//       console.log("CARD ON SWITCH STATEMENT 2");
//   }
// }
// ========================================================================================================

// gets the value of the element that triggered it
function copy_password(event) {
  // TODO add decryption by key
  let password = event.currentTarget.value; //MAYBE minimize skipping assignment
  navigator.clipboard.writeText(password);
}

// ========================================================================================================

// creates card template by copying node from default template
function create_card() {
  const template = document.querySelector(".login-box");
  const card = template.cloneNode(true);
  return card;
}

// ========================================================================================================
// the sidebar toggles automatically hide all vault content, but then displays the view containing the name of the button

function main_view_switch(event) {
  // selects vault content, sets all section to hidden
  const vault_content = document.querySelector("#vault-content");
  vault_content.querySelectorAll("section").forEach((elem) => (elem.style.display = "none"));
  // using the button event value, only shows section of the one clicked by user
  vault_content.querySelector(`#${event.currentTarget.value}-view`).style.display = "block";
}



function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + "=") {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}