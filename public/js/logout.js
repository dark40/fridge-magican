const logout = async () => {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
  })
    
  if (result.isConfirmed) {
    const response = await fetch("/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

  const message = await Swal.fire({
      title: "Logged Out Succesfully!",
      text: "Thanks for visiting! See you next time!",
      icon: "success",
      showConfirmButton: false,
      timer: 2500,
    });

    document.location.replace("/login");
  }
};

if(document.querySelector("#logout")) {
  document.querySelector("#logout").addEventListener("click", logout);
}

