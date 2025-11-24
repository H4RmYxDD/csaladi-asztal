import db from "./data.js";

db.prepare(
  `
CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    prepTime INTEGER,
    cookTime INTEGER,
    servings INTEGER,
    imageUrl TEXT
);
`
).run();

export const getAllRecipes = () => {
  const stmt = db.prepare("SELECT * FROM recipes");
  return stmt.all();
};

export const getRecipeById = (id) => {
  const stmt = db.prepare("SELECT * FROM recipes WHERE id = ?");
  return stmt.get(id);
};

export const addRecipe = (recipe) => {
  const stmt = db.prepare(`
        INSERT INTO recipes (name, description, ingredients, instructions)
        VALUES (?, ?, ?, ?)
    `);
  const info = stmt.run(
    recipe.name,
    recipe.description,
    recipe.ingredients,
    recipe.instructions
  );
  return info.lastInsertRowid;
};

export const updateRecipe = (id, recipe) => {
  const stmt = db.prepare(`
        UPDATE recipes
        SET name = ?, description = ?, ingredients = ?, instructions = ?
        WHERE id = ?
    `);
  stmt.run(
    recipe.name,
    recipe.description,
    recipe.ingredients,
    recipe.instructions,
    id
  );
};

export const deleteRecipe = (id) => {
  const stmt = db.prepare("DELETE FROM recipes WHERE id = ?");
  stmt.run(id);
};
