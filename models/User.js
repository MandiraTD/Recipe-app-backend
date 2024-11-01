const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    confirmPw: {
        type: String,
        required: true
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Recipe" 
    }],
});

module.exports = mongoose.model("User", userSchema);
