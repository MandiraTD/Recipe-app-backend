const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeId: { 
  type: String, 
  required: true },

  title: String,
  category: String,
  picture: String,
  ingredients: [String],
  instructions: String,
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Recipe", recipeSchema);

