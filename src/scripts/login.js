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
    isadmin: false
  }
  console.log(user);
  auth.register(user);
}

async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let response = await auth.login(username, password);
  auth.saveToken(response.token);
  //TODO Go to Admin-page or go to User page
  window.location.href = "index.html";
}

let registerBtn = document.querySelector("button#registerButton");
console.log(registerBtn);
registerBtn.addEventListener("click", handleRegister);