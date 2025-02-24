document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("loginButton").addEventListener("click", login);

window.addEventListener("resize", pageWidth);

// Declarando variables
var loginRegister = document.querySelector(".loginRegister");
var loginForm = document.querySelector(".loginForm");
var registerForm = document.querySelector(".registerForm");
var backBoxLogin = document.querySelector(".backBoxLogin");
var backBoxRegister = document.querySelector(".backBoxRegister");

function pageWidth() {
  if (window.innerWidth > 850) {
    backBoxLogin.style.display = "block";
    backBoxRegister.style.display = "block";
  } else {
    backBoxRegister.style.display = "block";
    backBoxRegister.style.opacity = "1";
    backBoxLogin.style.display = "none";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginRegister.style.left = "0px";
  }
}
pageWidth();

function login() {
  if (window.innerWidth > 850) {
    registerForm.style.display = "none";
    loginRegister.style.left = "410px";
    loginForm.style.display = "block";
    backBoxRegister.style.opacity = "1";
    backBoxLogin.style.opacity = "0";

    // Activar el formulario de login
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  } else {
    registerForm.style.display = "none";
    loginRegister.style.left = "0px";
    loginForm.style.display = "block";
    backBoxRegister.style.display = "block";
    backBoxLogin.style.display = "none";

    // Activar el formulario de login
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  }
}

function register() {
  if (window.innerWidth > 850) {
    registerForm.style.display = "block";
    loginRegister.style.left = "410px";
    loginForm.style.display = "none";
    backBoxRegister.style.opacity = "0";
    backBoxLogin.style.opacity = "1";

    // Activar el formulario de registro
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  } else {
    registerForm.style.display = "block";
    loginRegister.style.left = "0px";
    loginForm.style.display = "none";
    backBoxRegister.style.display = "none";
    backBoxLogin.style.display = "none";
    backBoxLogin.style.opacity = "1";

    // Activar el formulario de registro
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  }
}

console.log(registerForm);
