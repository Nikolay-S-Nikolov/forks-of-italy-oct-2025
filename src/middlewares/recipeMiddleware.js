import recipeService from '../services/recipeService.js';

export async function isOwner(req, res, next) {
    const recipeId = req.params.recipeId;

        try {
        const recipe = await recipeService.getOne(recipeId);

        if (!recipe.owner?.equals(req.user.id)) {
            return res.status(401).render('404', { error: 'Only creator can do this action!'});
        }
        
        next();

    } catch (err) {
        return res.status(401).render('404', { error: 'No such recipe!' });
    }
}