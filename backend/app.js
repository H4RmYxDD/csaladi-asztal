import express from 'express';
import recipeRouter from './routers/recipeRouter.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});