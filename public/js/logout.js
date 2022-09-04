const logout = async () => {
  const response = await fetch("/logout", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logged Out Succesfully!",
            text: "Thanks for visiting! See you next time!",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            document.location.replace("login");
          });
        }
      })

  }
};

document.querySelector("#logout").addEventListener("click", logout);
