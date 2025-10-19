import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required'],
        minLength: [2, 'The Title should be at least 2 characters'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients field is required'],
        minLength: [10, 'The Ingredients should be minimum 10 characters long'],
        maxLength: [850, 'The Ingredients should be maximum 850 characters long'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions field is required'],
        minLength: [10, 'The Instructions should be at least 10 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [10, 'The Description should be minimum 10 characters long'],
        maxLength: [150, 'The Description should be maximum 150 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image field is required'],
        match: [/^https?:\/\/.+/, 'The Image should start with http:// or https://'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [5, 'The description should be at least 5 characters.'],
        maxLength: [500, 'The description should be no longer than 500 characters.'],
    },
    recommendList: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;