import { auth } from "../utils/auth.js";
// import { User } from "../classes/user.js";

document.addEventListener("DOMContentLoaded", initRegister);

function initRegister() {
  const registerForm = document.querySelector("#registerForm");
  registerForm.addEventListener("submit", handleRegistration);
}

async function handleRegistration(event) {
  event.preventDefault();

  const firstname = document.querySelector("#firstName").value;
  const lastname = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = {
    firstname,
    lastname,
    email,
    password,
    isAdmin: false,
  };

  let response = await auth.register(user);
  console.log("registreringssvar:", response);
  console.log(user);

  console.log(err.response.data);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
  
}