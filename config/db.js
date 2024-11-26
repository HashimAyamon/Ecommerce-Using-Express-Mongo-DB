const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI);



    
                //             success
    mongoose.connection.on('connected', () => {
        console.warn("Your Database connected successfully!");
    });




                 //             error
    mongoose.connection.on('error', (error) => {
        console.error("Oops...Database connection failed: " +error);
        process.exit(1); 
    });
};

module.exports = connectDB;
