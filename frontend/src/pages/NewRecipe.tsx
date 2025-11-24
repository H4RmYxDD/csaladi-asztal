import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const NewRecipe = () => {
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        ingredients: [],
        instructions: "",
        prepTime: 0,
        cookTime: 0,
        servings: 0,
        imageUrl: "",
    })
    const submitRecipe = () => {
        apiClient.post("/recipes", recipe).then((response) => {
            toast.success("Recipe created successfully!");
        }).catch((error) => {
            toast.error("Error creating recipe:", error);
        });
    }
    return (
    <>
      <h1>Név:</h1>
      <input
        type="text"
        value={recipe.name}
        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
      />

      <h1>Hozzavalok</h1>
      <input
        type="text"
        value={recipe.ingredients.join(", ")}
        onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split(",").map(ingredient => ingredient.trim()) })}
      />

      <h1>Instrukciok</h1>
      <input
        type="text"
        value={recipe.instructions}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
      />
      <h1>Elokeszuleti ido</h1>
      <input
        type="text"
        value={recipe.prepTime}
        onChange={(e) => setRecipe({ ...recipe, prepTime: Number(e.target.value) })}
      />
      <h1>Főzési idő</h1>
      <input
        type="text"
        value={recipe.cookTime}
        onChange={(e) => setRecipe({ ...recipe, cookTime: Number(e.target.value) })}
      />
<h1>Adag</h1>
      <input
        type="text"
        value={recipe.servings}
        onChange={(e) => setRecipe({ ...recipe, servings: Number(e.target.value) })}
      />
      <h1>Kép URL</h1>
      <input
        type="text"
        value={recipe.imageUrl}
        onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
      />

      <br />
      <button onClick={submitRecipe}>Hozzáadás</button>
    </>
  );
};

export default NewRecipe;