import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AllRecipes from "./pages/AllRecipes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OneRecipe from "./pages/OneRecipe";
import "./design/index.css";
import NewRecipe from "./pages/NewRecipe";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<OneRecipe />} />
        <Route path="/recipe/new" element={<NewRecipe />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
