const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database!');
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};

module.exports = connectToDB;