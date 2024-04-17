const mongoose = require("mongoose");

// Define a mongoose schema for the 'users' collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number
    }
}, { timestamps: true });

// Create a mongoose model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;