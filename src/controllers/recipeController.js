import { Router } from "express";

const recipeController = Router();

recipeController.get('/create', (req, res) => {
    res.render('recipes/create');
})

export default recipeController;