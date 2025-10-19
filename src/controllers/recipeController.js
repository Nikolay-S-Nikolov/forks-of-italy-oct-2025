import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import recipeService from '../services/recipeService.js';
import { isOwner } from '../middlewares/recipeMiddleware.js'

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

recipeController.get('/catalog', async (req, res) => {
    const recipes = await recipeService.getAll();
    res.render('recipes/catalog', { recipes });
})

recipeController.get('/:recipeId/details', async (req, res) => {
    const recipeId = req.params.recipeId;

    try {
        const recipe = await recipeService.getOne(recipeId);
        const totalRecomended = recipe.recommendList.length;
        const isCreator = recipe.owner.equals(req.user?.id);
        const isRecommended = recipe.recommendList.some(u => u.equals(req.user?.id));
        const pageTitle = recipe.title + ' - Forks of Italy'
        res.render('recipes/details', { recipe, totalRecomended, isCreator, isRecommended, pageTitle });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

recipeController.get('/:recipeId/recommend', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;
    try {
        await recipeService.recomend(userId, recipeId);
        res.redirect(`/recipes/${recipeId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

recipeController.get('/:recipeId/edit', isAuth, isOwner, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await recipeService.getOne(recipeId);
        res.render('recipes/edit', { recipe });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

recipeController.post('/:recipeId/edit', isAuth, isOwner, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;
    try {
        await recipeService.edit(recipeId, recipeData);
        res.redirect(`/recipes/${recipeId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('recipes/edit', { error: errorMessage, recipe: recipeData });
    }
})

recipeController.get('/:recipeId/delete', isAuth, isOwner, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        await recipeService.delete(recipeId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})


export default recipeController;