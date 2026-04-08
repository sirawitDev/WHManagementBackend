const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    memberId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user', 'checker'], default: 'user' },
    position: { type: String, required: true , default: 'user' },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_image: { type: String, default: '' },

    createdAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
