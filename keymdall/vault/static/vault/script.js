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
  const add_item = document.querySelector("#add-login");
  add_item.onclick = () => {
    const aside = document.querySelector("aside");
    aside.querySelector("#element-content").style.display = "none"
    aside.querySelector("#new-item").style.display = "block";
  };

  //   REMOVE this is the test for a get request empty form+

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
  const element_content = document.querySelector("#element-content");
  element_content.style.display = "block";

  //   gets the ID from the button data= attribute
  const elem_id = event.currentTarget.getAttribute("data");
  //   gets the type from the button value
  const elem_type = event.currentTarget.value;

  fetch(`edit/${elem_type}=${elem_id}`)
    .then((response) => response.text())
    .then((form) => {

        element_content.lastChild.remove();
        //   qua si distacca come vorrei farlo, una volta preso il valore del coso, dovrei inserirlo in un template, ma senza la modifica, per poi inserire la modifica solo quando richiesto da EDIT
      const edit_form = document.createElement('form');
      edit_form.setAttribute("method", "post");
      edit_form.innerHTML = form;

      element_content.append(edit_form);
    });
}

// ========================================================================================================


// ========================================================================================================
function build_template(type) {
  switch (type) {
    case "login":
      const template = document
        .querySelector(".login-base-template")
        .cloneNode(true);
      template.setAttribute("id", "login-template");
      return template;

    case "note":
      console.log("NOTE ON SWITCH STATEMENT 2");
    case "card":
      console.log("CARD ON SWITCH STATEMENT 2");
  }
}
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
  vault_content
    .querySelectorAll("section")
    .forEach((elem) => (elem.style.display = "none"));
  // using the button event value, only shows section of the one clicked by user
  vault_content.querySelector(
    `#${event.currentTarget.value}-view`
  ).style.display = "block";
}

// -------------- DEPRECATED -------------
// old code that dinamically generated the template based on the object model but allowed limited interaction and is too clunky

// NOTE THIS APPROACH IS slower than clone NODE BUT MIGTH make sense not to rely on pre existing template, will mean that changing the structure of the model probably won't break the code, rather will require minor tweaks in the UI, although we can say that fixing a fixed template might be easier than catching and handling the js behavior.

// NOTE can add a check to see if the current template being displayed is already a login template in order to skip the building of it and only handling the inner content, while build template will take action if user switches view between login>card>note etc...
// function build_template(keys, type) {

//   // from the call, create the div, set its class dinamically based on the response object
//   // MAYBE switch to ID instead of class for template (setAttribute('id', `${type}-template` )
//   const template = document.createElement("div");
//   template.classList.add(type + "-template");
//   // for every key in it append a div with that className (for OF returns the key, for IN returns the index)
//   for (const key of keys) {
//     const div = document.createElement("div");
//     div.classList.add(key);
//     template.append(div);
//   }
//   return template;
// }

function fetch_test(id) {
  fetch(`/edit_form/${id}`)
    .then((response) => response.text())
    .then((html) => {
        console.log(html);
        let form = document.createElement('form');
        form.setAttribute("method", "post");
        form.innerHTML = html;

      document.querySelector("#element-content").append(form);
    });
}
