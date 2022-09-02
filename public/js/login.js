function showPassword() {
  let password = document.getElementById("password");
  let hidePsw = document.getElementById("hidePsw");
  let showPsw = document.getElementById("showPsw");
  if (password.type === "password") {
    password.type = "text";
    hidePsw.style.display = "block";
    showPsw.style.display = "none";
  } else {
    password.type = "password";
    hidePsw.style.display = "none";
    showPsw.style.display = "block";
  }
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      document.getElementById("login-errors").classList.remove("d-none")

    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
