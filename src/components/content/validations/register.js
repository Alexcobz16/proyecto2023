import { PHPController as Controller } from "./controller/controller.js";
/**
 * Validates register form
 */
export function validateRegister() {
    createListeners();
}
/**
 * Creates event listeners on each form field
 */
function createListeners() {
    document.getElementById("register").noValidate = true;

    for (let i = 0; i < document.getElementById("register").length; i++) {
        if (document.getElementById("register")[i].id !== "condiciones") {
            document.getElementById("register")[i].addEventListener("blur", checkErrors, false);
            document.getElementById("register")[i].addEventListener("invalid", displayErrors, false);
            document.getElementById("register")[i].addEventListener("input", correctErrors, false);
        }
    }
    document.getElementById("fecha").addEventListener("change", validateAge);
    document.getElementById("fecha").addEventListener("blur", validateAge);
    document.getElementById("condiciones").addEventListener("click", checkErrors, false);
    document.getElementById("submit").addEventListener("click", validateForm, false);
}

const FIELD_ERROR_ID = "error-";

/**
 * Validates form when submit
 * @param {submit} e 
 */
function validateForm(e) {
    e.preventDefault();
    let formValid = document.getElementById("register")[0].validity.valid;
    for (let i = 1; i < document.getElementById("register").length; i++) {
        formValid = document.getElementById("register")[i].validity.valid && formValid;
    }
    formValid = document.getElementById("condiciones").checked && formValid;

    let ageValid = true;
    let ageError = false;

    if (!formValid || !ageValid) {
        const form = document.getElementById("register");
        for (let i = 0; i < form.length; i++) {
            const input = form[i];
            if (input.id !== "condiciones") {
                if (!input.validity.valid) {
                    formValid = false;
                    displayErrors(input);
                } else {
                    removeErrors(input);
                }
            }
        }

        formValid = false;

        if (ageError) {
            document.getElementById(FIELD_ERROR_ID + "fecha").innerHTML = "Debes tener al menos 18 años";
        }

        if (!document.getElementById("condiciones").checked) {
            document.getElementById(FIELD_ERROR_ID + "condiciones").innerHTML = "Acepta los términos de servicio";
        } else {
            document.getElementById(FIELD_ERROR_ID + "condiciones").innerHTML = "";
        }
    } else {
        const username = document.getElementById("usuario").value;
        const password = document.getElementById("contraseña").value;
        register(username, password);
    }
}
/**
 * Sends form to API to check errors
 * @param {username} username 
 * @param {password} password 
 */
async function register(username, password) {
    const response = await Controller.register(username, password);
    if (response.status === "success") {
        localStorage.setItem('session', true);
        window.location.href = '/';
    } else {
        document.getElementById(FIELD_ERROR_ID + "servidor").innerHTML = response.message;
    }
}

let ageValid = true;
let ageError = false;
/**
 * Check if age is greater than 18 
 */
function validateAge() {
    const dateInput = document.getElementById("fecha");
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();
    const minimumAge = 18;

    const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();

    if (ageDifference < minimumAge) {
        document.getElementById(FIELD_ERROR_ID + dateInput.id).innerHTML = "Debes tener al menos 18 años";
        ageValid = false;
        ageError = true;
    } else {
        removeErrors(dateInput);
        ageValid = true;
        ageError = false;
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
