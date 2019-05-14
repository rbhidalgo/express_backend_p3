const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    locations: [{
        id: String,
        name: String
    }]
})

module.exports = mongoose.model('User', UserSchema)