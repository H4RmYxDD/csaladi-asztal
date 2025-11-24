import express from "express";
import * as Recipe from "../data/recipe.js";


const router = express.Router();

router.get("/", (req, res) => {
    const recipes = Recipe.getAllRecipes();
    res.json(recipes);
});

router.get("/:id", (req, res) => {
    const recipe = Recipe.getRecipeById(req.params.id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ error: "Recipe not found" });
    }
});

router.post("/", (req, res) => {
    const newRecipeId = Recipe.addRecipe(req.body);
    res.status(201).json({ id: newRecipeId });
});

router.put("/:id", (req, res) => {
    Recipe.updateRecipe(req.params.id, req.body);
    res.status(204).end();
});

router.delete("/:id", (req, res) => {
    Recipe.deleteRecipe(req.params.id);
    res.status(204).end();
});

export default router;