const mongoose = require('mongoose');

const corporateuserProfileSchema = new mongoose.Schema({
    first_name:String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    profile_photo: String,
    bio: String, // corporate overview
    JobListing: []
    // user_type: {
    //     type: String,
    //     enum: ['Corporate'],
    // }
});
const UserProfile = mongoose.model('UserProfile', corporateuserProfileSchema);

module.exports = UserProfile;