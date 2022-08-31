module.exports = {
    // recipeIngredientData = [1,2,3,4,5,6,7,8]
    // fridgeData = [1,3,5]
    compare_ingredient: (fridgeData, recipeIngredientData) => {
        let count = 0;

        for (let i = 0; i < fridgeData.length; i++) {
            for (let j = 0; i < recipeIngredientData.length; j++) {
                if (fridgeData[i] === recipeIngredientData[j]) {
                    count += 1;
                    break;
                }
            }
        }

        return count + "/" + recipeIngredientData.length
    }
};