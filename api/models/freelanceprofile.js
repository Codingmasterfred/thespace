const { DataTypes, Model } = require('sequelize');
const sequelize = require('../middleware/db'); // Import Sequelize connection
const UserProfile = require('./userprrofile'); // Import the User Profile model

class FreelanceTalent extends Model {}

FreelanceTalent.init(
  {
    category_tags: DataTypes.STRING,
    portfolio: DataTypes.STRING,
  },
  {
    sequelize, // Pass the Sequelize connection instance
    modelName: 'FreelanceTalent', // Set the model name
    tableName: 'freelance_talent', // (Optional) Set the table name if it's different from the model name
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
  }
);

// Define the foreign key relationship to User Profile
FreelanceTalent.belongsTo(UserProfile, { foreignKey: 'user_id' });

module.exports = FreelanceTalent;