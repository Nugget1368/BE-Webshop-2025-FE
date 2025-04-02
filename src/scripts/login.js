import { auth } from "../utils/auth.js";
import { User } from "../classes/user.js";
document.addEventListener("DOMContentLoaded", initLogin);

function initLogin() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin();
  });
}

function handleRegister() {
  // let user = new User("Robert", "Bobert", "bobert@example.com", "12345678");
  let user = {
    firstname: "Robert",
    lastname: "Bobert",
    email: "bobert@example.com",
    password: "12345678",
    isAdmin: false
  }
  console.log(user);
  auth.register(user);
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.login(username, password);

  // Basic demo login - NOT SECURE
  // if (username === "admin" && password === "admin") {
  //   window.location.href = "admin.html";
  // } else {
  //   alert("Invalid credentials: LOGGING IN ANYWAY");
  //   window.location.href = "admin.html";
  // }
}

let registerBtn = document.querySelector("button#registerButton");
console.log(registerBtn);
registerBtn.addEventListener("click", handleRegister);