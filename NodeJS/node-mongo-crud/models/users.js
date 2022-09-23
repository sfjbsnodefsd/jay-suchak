const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    email: String,
    birthdate: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    }
});

const users = mongoose.model('users', mySchema);

module.exports = users;