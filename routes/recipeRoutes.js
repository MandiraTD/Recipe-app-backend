const express = require("express");

const {
  getCategories, 
  getRecipesByCategory,
  addFavoriteRecipe,
  getFavoriteRecipes,
  getRecipeDetails, 
  removeFavoriteRecipe 

} = require("../controllers/recipeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/categories", getCategories); 


router.get("/category/:category", getRecipesByCategory);


router.post("/favorites", authMiddleware, addFavoriteRecipe);


router.get("/favorites", authMiddleware, getFavoriteRecipes);


router.get("/recipe/:recipeId", getRecipeDetails); 


router.delete("/favorites/:recipeId", authMiddleware, removeFavoriteRecipe); 

module.exports = router;
