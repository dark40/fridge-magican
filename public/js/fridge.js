const saveBtn = document.querySelector(".save");
const ingredient = document.querySelector(".ingredient-list");
const stock = document.querySelector(".stock-list");
const myFridge = document.querySelector("#my_fridge");
const fridge_id = myFridge.getAttribute("data-id");

let activeIngredient = {};

const saveIngredient = (fridgeIngredient) => 
    fetch('/api/fridge/' + fridgeIngredient.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fridgeIngredient)
    });


const addIngredient = (event) => {
    event.preventDefault();

    const target = event.target;
    const ingredient_id = target.getAttribute("data-id");

    let newIngredient = document.createElement('li');
    newIngredient.innerHTML = `${target.innerHTML} ✖`
    newIngredient.setAttribute("class", "list-group-item list-group-item-action")
    newIngredient.setAttribute("data-id", ingredient_id);

    stock.appendChild(newIngredient);

}

const removeIngredient = (event) => {
    event.preventDefault();

    const target = event.target;
    target.remove();

}

const handleIngredientSave = () => {
    
    const children = stock.children;
    let arr = [];
    for(let i = 0; i < children.length; i++) {
        let child_id = children[i].getAttribute("data-id");
        arr.push(child_id);
    }

    const fridgeIngredient = {
        id: fridge_id,
        ingredients: arr,
    };

    saveIngredient(fridgeIngredient).then(()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your ingredients have been saved',
            showConfirmButton: false,
            timer: 2500
          
          })
          .then(() => {
            location.reload();
          });
        
    })
}


saveBtn.addEventListener("click",handleIngredientSave);
ingredient.addEventListener("click", addIngredient);
stock.addEventListener("click", removeIngredient);

function searchIngredient() {
    // Declare variables
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = ingredient
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
