const backBtn = document.querySelector(".back");

const goBack = (event) => {
    event.preventDefault();

    document.location.replace("/");
}

backBtn.addEventListener("click", goBack);



