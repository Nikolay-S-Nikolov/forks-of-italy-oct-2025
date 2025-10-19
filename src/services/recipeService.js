import Recipe from '../models/Recipe.js'

export default {
    create(formData, userId){
        formData.owner = userId;
        return Recipe.create(formData);
    },
    
}