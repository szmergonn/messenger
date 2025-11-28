const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

document.querySelector("#show-register").onclick = () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
};

document.querySelector("#show-login").onclick = () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};