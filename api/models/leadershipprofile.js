const { DataTypes, Model } = require('sequelize');
const sequelize = require('../middleware/db'); // Import Sequelize connection
const UserProfile = require('./userprofile'); // Import the User Profile model

class LeadershipTalent extends Model {}

LeadershipTalent.init(
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    modelName: 'LeadershipTalent', // Set the model name
    tableName: 'leadership_talent', // (Optional) Set the table name if it's different from the model name
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
  }
);

// Define the foreign key relationship to User Profile
LeadershipTalent.belongsTo(UserProfile, { foreignKey: 'user_id' });

module.exports = LeadershipTalent;