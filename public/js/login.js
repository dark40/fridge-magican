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
