import { Router } from "express";
import recipeService from '../services/recipeService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const recipes = await recipeService.getLastThree();
        res.render('home', { recipes });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

export default homeController;