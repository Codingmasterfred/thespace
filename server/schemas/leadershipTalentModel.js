import mongoose from "mongoose";

const leadershipTalentSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
    },
    company_name: String,
    position: String,
});

const LeadershipTalent = mongoose.model('LeadershipTalent', leadershipTalentSchema);

module.exports = LeadershipTalent;