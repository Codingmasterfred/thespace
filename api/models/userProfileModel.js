const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile_photo: String,
    bio: String,
    user_type: {
        type: String,
        enum: ['Leadership', 'Freelancer'],
    }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);