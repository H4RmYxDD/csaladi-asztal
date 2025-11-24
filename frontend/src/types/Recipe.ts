export type Recipe = {
    id?: number;
    name: string;
    ingredients: string[];
    instructions: string;
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    servings: number;
    imageUrl?: string;
};