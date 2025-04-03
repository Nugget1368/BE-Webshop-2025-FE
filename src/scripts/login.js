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
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  let errorMessage = document.querySelector("#error-message");
  errorMessage.textContent = "";

  if(username.classList.contains("error")) 
    username.classList.remove("error");
  if(password.classList.contains("error")) 
    password.classList.remove("error");

  let usernameValue = username.value;
  let passwordValue = password.value;

  let response = await auth.login(usernameValue, passwordValue);
  if (response.status !== 200) {
    username.classList.add("error");
    password.classList.add("error");
    errorMessage.textContent = "Incorrect username or password";
  }
  else {
    username.classList.add("success");
    password.classList.add("success");
    auth.saveToken(response.data.token);
    //TODO Go to Admin-page or go to User page
    // window.location.href = "index.html";
  }
}