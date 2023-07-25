import { PHPController as Controller } from "./controller/controller.js";
/**
 * Validates login form
 */
export function validateLogin() {
    createListeners();
}
/**
 * Creates event listeners on each form field
 */
function createListeners() {
    document.getElementById("login").noValidate = true;

    for (let i = 0; i < document.getElementById("login").length; i++) {
        if (document.getElementById("login")[i].id !== "condiciones") {
            document.getElementById("login")[i].addEventListener("blur", checkErrors, false);
            document.getElementById("login")[i].addEventListener("invalid", displayErrors, false);
            document.getElementById("login")[i].addEventListener("input", correctErrors, false);
        }
    }
    document.getElementById("submit").addEventListener("click", validateForm, false);
}

const FIELD_ERROR_ID = "error-";
/**
 * Validates form when submit
 * @param {submit} e 
 */
function validateForm(e) {
    e.preventDefault();
    let formValid = document.getElementById("login")[0].validity.valid;
    for (let i = 1; i < document.getElementById("login").length; i++) {
        formValid = document.getElementById("login")[i].validity.valid && formValid;
    }
    formValid = formValid;
    if (!formValid) {
        let formValid = true;
        const form = document.getElementById("login");
        for (let i = 0; i < form.length; i++) {
            const input = form[i];
            if (!input.validity.valid) {
                formValid = false;
                displayErrors(input);
            } else {
                removeErrors(input);
            }
        }
    } else {
        const username = document.getElementById("usuario").value;
        const password = document.getElementById("contraseña").value;
        login(username, password);
    }
}
/**
 * Sends form to API to check errors
 * @param {username} username 
 * @param {password} password 
 */
async function login(username, password) {
    const response = await Controller.login(username, password);
    if (response.status === "success") {
        localStorage.setItem('session', true);
        window.location.href = '/';
    } else {
        document.getElementById(FIELD_ERROR_ID + "servidor").innerHTML = response.message;
    }
}
/**
 * 
 * @param {formInput} e 
 */
function checkErrors(e) {
    const input = e.target;
    removeErrors(input);
    displayErrors(input);
}
/**
 * 
 * @param {formInput} e 
 */
function correctErrors(e) {
    const input = e.target;
    if (input.validity.valid) {
        removeErrors(input);
    }
}
/**
 * 
 * @param {formInput} input
 */
function removeErrors(input) {
    if (document.getElementById(FIELD_ERROR_ID + input.id)) {
        document.getElementById(FIELD_ERROR_ID + input.id).innerHTML = "";
    }
}
/**
 * 
 * @param {formInput} input 
 */
function displayErrors(input) {
    if (input.validity.valueMissing) {
        document.getElementById(FIELD_ERROR_ID + input.id).innerHTML = "El campo está vacío";
    } else if (input.validity.patternMismatch) {
        document.getElementById(FIELD_ERROR_ID + input.id).innerHTML = input.title;
    } else if (input.validity.tooShort) {
        document.getElementById(FIELD_ERROR_ID + input.id).innerHTML = "El campo es demasiado corto. Necesita " + input.minLength + " como minimo";
    }
}
