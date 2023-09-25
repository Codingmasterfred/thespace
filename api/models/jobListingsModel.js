const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    posted_by_leadership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeadershipTalent',
    },
    job_title: String,
    job_description: String,
    city: String,
    state: String,
    category_tags: [String],
    application_deadline: Date,
    job_type: {
        type: String,
        enum: ['Local', 'Remote'], // Only "Local" or "Remote" allowed values
        default: 'Local', // Default to "Local" if not specified
    },
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;