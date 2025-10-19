import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import recipeController from "./controllers/recipeController.js";

const routes = Router();

routes.use('/', homeController);
routes.use('/auth', authController);
routes.use('/recipes', recipeController);

routes.get('/*splash',(req,res)=>{
    res.render('404');
});

export default routes;