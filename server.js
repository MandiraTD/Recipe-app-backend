const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); 
const recipeRoutes = require("./routes/recipeRoutes");
const cors = require("cors");

const app = express();
connectDB();
app.use(cors());


const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json()); 
app.use("/api/auth", authRoutes); 
app.use("/api/recipes", recipeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});