var strength = {
    0: "Worst ☹",
    1: "Bad ☹",
    2: "Weak ☹",
    3: "Good ☺",
    4: "Strong ☻"
}

var password = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

password.addEventListener('input', function () {
    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if (val !== "") {
        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span";
    }
    else {
        text.innerHTML = "";
    }
});
function showPassword() {
    var showHidePass = document.getElementById("showHidePass");
    var passwordObj = document.getElementById("password");

    if (showHidePass.textContent == "Show password") {
        passwordObj.type = "text";
        showHidePass.innerHTML = "Hide password";
    }
    else {
        passwordObj.type = "password";
        showHidePass.innerHTML = "Show password";
    }
}
function validateName() {
    var status = true;
    var regex = new RegExp(/^([a-z]+(-| )?)+$/i);
    var nName = document.getElementById("fullName").value;
    var nameError = document.getElementById("nameError");
    if (nName == "") {
        status = false;
        nameError.innerHTML = "";
    }
    else if (!regex.test(nName)) {
        status = false;
        nameError.innerHTML = "Invalid Input!";
        nameError.style.color = "red";
    }
    else
        nameError.innerHTML = "";
    return status;
}
function validateFName() {
    var status = true;
    var regex = new RegExp(/^([a-z]+(-| )?)+$/i);
    var nName = document.getElementById("fatherName").value;
    var nameError = document.getElementById("fatherNameError");
    if (nName == "") {
        status = false;
        nameError.innerHTML = "";
    }
    else if (!regex.test(nName)) {
        status = false;
        nameError.innerHTML = "Invalid Input!";
        nameError.style.color = "red";
    }
    else
        nameError.innerHTML = "";
    return status;
}
function validateMName() {
    var status = true;
    var regex = new RegExp(/^([a-z]+(-| )?)+$/i);
    var nName = document.getElementById("motherName").value;
    var nameError = document.getElementById("motherNameError");
    if (nName == "") {
        status = false;
        nameError.innerHTML = "";
    }
    else if (!regex.test(nName)) {
        status = false;
        nameError.innerHTML = "Invalid Input!";
        nameError.style.color = "red";
    }
    else
        nameError.innerHTML = "";
    return status;
}
function validateEmail() {
    var status = true;
    var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    if (email == "") {
        status = false;
        emailError.innerHTML = "";
    }
    else if (!regex.test(email)) {
        status = false;
        emailError.innerHTML = "Invalid email id";
        emailError.style.color = "red";
    }
    else
        emailError.innerHTML = "";
    return status;
}
function validateCEmail() {
    var status = true;
    var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    var email = document.getElementById("confirmEmail").value;
    var email2 = document.getElementById("email").value;
    var emailError = document.getElementById("confirmEmailError");
    // var emailError2 = document.getElementById("emailError");
    if (email == "") {
        status = false;
        emailError.innerHTML = "";
    }
    else if (email != email2) {
        status = false;
        emailError.innerHTML = "Email Miss-Match!";
        emailError.style.color = "red";
    }
    else if (!regex.test(email)) {
        status = false;
        emailError.innerHTML = "Invalid email id";
        emailError.style.color = "red";
    }
    else
        emailError.innerHTML = "";
    return status;
}
function validateMobile() {
    var status = true;
    var regex = new RegExp('^[0-9]{10}$');
    var number = document.getElementById("number").value;
    var numberError = document.getElementById("numberError");
    if (number == "") {
        status = false;
        numberError.innerHTML = "";
    }
    else if (!regex.test(number)) {
        status = false;
        numberError.innerHTML = "Invalid Mobile Number!";
        numberError.style.color = "red";
    }
    else
        numberError.innerHTML = "";
    return status;
}
function validateState() {
    var status = true;
    var state = document.getElementById("state").value;
    var stateError = document.getElementById("sta   teError");

    if (state == "0") {
        status = false;
        stateError.innerHTML = "Please State State!";
        stateError.style.color = "red";
    }
    else
    stateError.innerHTML = "";
    return status;
}
function validateCPassword() {
    var status = true;
    var password = document.getElementById("confirmPassword").value;
    var password2 = document.getElementById("password").value;
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    if (password == "") {
        status = false;
        confirmPasswordError.innerHTML = "";
    }
    else if (password != password2) {
        status = false;
        confirmPasswordError.innerHTML = "Password Miss-Match!";
        confirmPasswordError.style.color = "red";
    }
    else
        confirmPasswordError.innerHTML = "";
    return status;
}
function validateData(){
    var validateTitle = validateTitle();
    var validateName = validateName();
    var validateFName = validateFName();
    var validateMName = validateMName();
    var validateEmail = validateEmail();
    var validateCEmail = validateCEmail();
    var validateMobile = validateMobile();
    var validateCPassword = validateCPassword();
    var expStatus = validateExpereince();
    if(validateTitle && validateName && validateFName && validateMName
        && validateEmail && validateCEmail && passwordStatus && validateMobile
        && validateCPassword)
      return true;
    return false;
}