const mongoose = require('mongoose');

const freelanceTalentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  category_tags: [String], // Store as an array of strings
  portfolio: String,
});

const FreelanceTalent = mongoose.model('FreelanceTalent', freelanceTalentSchema);

module.exports = FreelanceTalent;