import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import recipeService from '../services/recipeService.js'

const recipeController = Router();

recipeController.get('/create', isAuth, (req, res) => {
    res.render('recipes/create');
})

recipeController.post('/create', isAuth, async (req, res) => {
    const formData = req.body;
    const userId = req.user.id;
    try {
        await recipeService.create(formData, userId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('recipes/create', { error: errorMessage, recipe: formData });
    }
})

recipeController.get('/catalog', (req, res) => {
    res.render('recipes/catalog');
})

export default recipeController;