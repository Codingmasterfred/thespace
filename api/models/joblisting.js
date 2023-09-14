const { DataTypes, Model } = require('sequelize');
const sequelize = require('../middleware/db'); // Import Sequelize connection
const LeadershipTalent = require('./leadershipprofile'); // Import the Leadership Talent model

class JobListing extends Model {}

JobListing.init(
  {
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //set job_id as primary key
        autoIncrement: true, //Automatically increment the primary key
    },
    posted_by_leadership: {
        type: DataTypes.INTEGER,
        allowNull: false, //pbl is a required field
      },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: DataTypes.TEXT,
    location: DataTypes.STRING,
    category_tags: DataTypes.STRING,
    application_deadline: DataTypes.DATE, // You can adjust the data type as needed
  },
  {
    sequelize, // Pass the Sequelize connection instance
    modelName: 'JobListing', // Set the model name
    tableName: 'job_listings', // (Optional) Set the table name if it's different from the model name
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
  }
);

// Define the foreign key relationship to Leadership Talent
JobListing.belongsTo(LeadershipTalent, { foreignKey: 'posted_by_leadership' });

module.exports = JobListing;