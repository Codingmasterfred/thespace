const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    first_name:String,
    last_name: String,
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
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;