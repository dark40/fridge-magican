let password = document.getElementById("password");
let passwordConfirmation = document.getElementById("password-confirmation");
let termsCheckbox = document.getElementById("terms");
let message = document.getElementById("message");
let strength = document.getElementById("strength");
const regErrors = document.getElementById("reg-errors");
const registerForm = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");

password.addEventListener("input", () => {
  if (password.value.length > 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
  if (password.value.length < 6) {
    strength.innerHTML = "weak";
    password.style.borderColor = "#ff5925";
    message.style.color = "#ff5925";
  } else if (password.value.length > 6 && password.value.length < 8) {
    strength.innerHTML = "medium";
    password.style.borderColor = "yellow";
    message.style.color = "yellow";
  } else if (password.value.length >= 10) {
    strength.innerHTML = "strong";
    password.style.borderColor = "#26d730";
    message.style.color = "#26d730";
  }
});

// Register user and redirect to the home page with loggin in status
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    name: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    terms_confirmed: termsCheckbox.checked,
  };

  fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.hasOwnProperty("errors")) {
        return showErrors(data.errors);
      }
      document.location.replace("/");
    });
});

const showErrors = (errors) => {
  regErrors.innerHTML = "";
  let errorsList = "";
  for (i = 0; i < errors.length; i++) {
    errorsList += `<li>${errors[i]}</li>`;
  }
  regErrors.innerHTML = errorsList;
  regErrors.classList.remove("d-none") 
};

