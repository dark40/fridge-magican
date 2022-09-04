
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
      let timerInterval
Swal.fire({
  title: 'Logging you in safely... <br> Please be patient!',
  html: 'You will be logged in <strong></strong> seconds.',
  timer: 3000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const content = Swal.getHtmlContainer()
    const $ = content.querySelector.bind(content)
    timerInterval = setInterval(() => {
      Swal.getHtmlContainer().querySelector('strong')
        .textContent = (Swal.getTimerLeft() / 1000)
          .toFixed(0)
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
})
      
      .then(() => {
        document.location.replace("/");
    })
    } else {
      document.getElementById("login-errors").classList.remove("d-none")

    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
