const saveBtn = document.querySelector(".save");
const ingredient = document.querySelector(".ingredient-list");
const stock = document.querySelector(".stock-list");

let activeIngredient = {};

const saveIngredient = (ingredient) => 
    fetch('/api/fridge/:id', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
    });

    // fridge_id, ingredient_id; 

const addIngredient = (event) => {
    event.preventDefault();

    const targetIngredient = event.target;

    // Check if ingredient is already in the list. If not, add to stocks.
    for (let i = 0; i < AllIngredientsData.length; i++) {
        if (ingredientName === AllIngredientsData[i]) {
            break;
        } else {
            let fridge_id = document.location.search;
            let ingredient_id = AllIngredients[i].id;

                }
            });
        }
    }
}


saveBtn.addEventListener("click", );
// ingredient.addEventListener("click", addIngredient);
// stock.addEventListener("click", removeIngredient);