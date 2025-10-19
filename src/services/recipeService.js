import Recipe from '../models/Recipe.js'

export default {
    create(formData, userId) {
        formData.owner = userId;
        return Recipe.create(formData);
    },

    getAll(filter = {}) {
        let query = Recipe.find()

        if (filter.search) {
            query = query.find({ title: { $regex: filter.search, $options: 'i' } })
        }

        return query
    },

    getLastThree() {
        return Recipe.find().sort('-_id').limit(3);
    },

    getOne(recipeId) {
        return Recipe.findById(recipeId);
    },

    async recomend(userId, recipeId) {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error('No such recipe');
        }

        if (recipe.owner.equals(userId)) {
            throw new Error('Creators can not like their recipe');
        }

        if (recipe.recommendList.some(id => id.equals(userId))) {
            throw new Error('You have already liked this recipe');
        }

        recipe.recommendList.push(userId);
        await recipe.save();
        return recipe;
    },

    edit(recipeId, recipeData) {
        const opt = { runValidators: true }
        const updatedRecipe = Recipe.findByIdAndUpdate(recipeId, recipeData, opt);
        return updatedRecipe;
    },

    delete(recipeId) {
        return Recipe.findByIdAndDelete(recipeId);
    },


}