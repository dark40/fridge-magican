let password = document.getElementById("password");
let message = document.getElementById("message");
let strenght = document.getElementById("strenght");

password.addEventListener("input", () => {
  if (password.value.length > 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
  if (password.value.length < 6) {
    strenght.innerHTML = "weak";
    password.style.borderColor = "#ff5925";
    message.style.color = "#ff5925";
  } else if (password.value.length > 6 && password.value.length < 8) {
    strenght.innerHTML = "medium";
    password.style.borderColor = "yellow";
    message.style.color = "yellow";
  } else if (password.value.length >= 10) {
    strenght.innerHTML = "strong";
    password.style.borderColor = "#26d730";
    message.style.color = "#26d730";
  }
});
