// const saveBtn = document.querySelector(".save");
// const ingredient = document.querySelector(".ingredient-list");
// const stock = document.querySelector(".stock-list");
// const AllIngredients = require("../../seeds/ingredientData.json");
// const fridgeIngredient = require("../../seeds/fridgeIngredientData.json");
// const fs = require("fs");

// const AllIngredientsData = JSON.parse(AllIngredients).name;

// const handleSave = (event) => {
//     event.preventDefault();

    // add render 
// }

// const addIngredient = (event) => {
//     event.preventDefault();

//     const targetIngredient = event.target;
//     const ingredientName = JSON.parse(targetIngredient.parentElement.getAttribute('name'))

//     // Check if ingredient is already in the list. If not, add to stocks.
//     for (let i = 0; i < AllIngredientsData.length; i++) {
//         if (ingredientName === AllIngredientsData[i]) {
//             break;
//         } else {
//             let fridge_id = document.location.search;
//             let ingredient_id = AllIngredients[i].id;

//             fs.readFile(fridgeIngredient, 'utf8', function readFileCallback(err, data) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     let obj = {
//                         table: []
//                     };
//                     obj = JSON.parse(data); //now it an object
//                     obj.table.push({ fridge_id: fridge_id, ingredient_id: ingredient_id }); //add some data
//                     json = JSON.stringify(obj); //convert it back to json
//                     fs.writeFile(fridgeIngredient, json, 'utf8', callback); // write it back 
//                 }
//             });
//         }
//     }
// }

// const removeIngredient = (event) => {
//     event.preventDefault();



// }



// saveBtn.addEventListener("click", handleSave);
// ingredient.addEventListener("click", addIngredient);
// stock.addEventListener("click", removeIngredient);