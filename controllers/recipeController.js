const Recipe = require("../models/Recipe");
const axios = require("axios");


exports.getCategories = async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    const categories = response.data.categories.slice(0, 5); 
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};



exports.getRecipesByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const recipes = response.data.meals; 

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ message: "No recipes found for this category" });
        }

      
        res.json(recipes);
        
    } catch (error) {
        console.error("Error fetching recipes by category:", error);
        res.status(500).json({ message: "Error fetching recipes by category" });
    }
};



exports.addFavoriteRecipe = async (req, res) => {
  const { recipeId } = req.body; 

  try {

    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const recipeData = response.data.meals[0]; 

    
    if (!recipeData) {
      return res.status(404).json({ message: "Recipe not found in API" });
    }

    const { strMeal: title, strCategory: category, strMealThumb: picture } = recipeData; 

   
    const existingFavorite = await Recipe.findOne({ recipeId, user: req.user.id });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe is already in favorites" });
    }

    
    const favorite = new Recipe({ recipeId, title, category, picture, user: req.user.id });
    await favorite.save();

 
    res.json(favorite);
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    res.status(500).json({ message: "Error adding favorite recipe" });
  }
};

exports.getFavoriteRecipes = async (req, res) => {
  try {
    console.log('Fetching favorite recipes for user:', req.user.id); 
    const favorites = await Recipe.find({ user: req.user.id });
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res.status(500).json({ message: "Error fetching favorite recipes" });
  }
};


exports.getRecipeDetails = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const recipeDetails = response.data.meals[0]; 
    res.json(recipeDetails);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({ message: "Error fetching recipe details" });
  }
};


exports.removeFavoriteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const result = await Recipe.deleteOne({ recipeId, user: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Favorite recipe not found" });
    }
    res.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite recipe:", error);
    res.status(500).json({ message: "Error removing favorite recipe" });
  }
};

