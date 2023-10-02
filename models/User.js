const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide password"]
    },
    userName: {
        type: String,
        required: [true, "please provide user name"]
    }
});

module.exports = mongoose.model('passportAuthUser', userSchema);

