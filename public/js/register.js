let password = document.getElementById("password");
let message = document.getElementById("message");
let strength = document.getElementById("strength");
const registerButton = document.getElementById("register-now");
const username = document.getElementById('username');
const email = document.getElementById('email');


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


registerButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  const userData = {
    name: username.value,
    email: email.value,
    password: password.value
  };
  
  fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then((res) => res.json())
  .then((data) => {
    window.location.replace("/");
  })
});