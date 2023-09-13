const { DataTypes, Model } = require('sequelize');
const sequelize = require('../middleware/db'); // Import your Sequelize connection

class UserProfile extends Model {}

UserProfile.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_photo: DataTypes.STRING,
    bio: DataTypes.TEXT,
    user_type: DataTypes.STRING,
  },
  {
    sequelize, // Pass the Sequelize connection instance
    modelName: 'UserProfile', // Set the model name
    tableName: 'user_profiles', // (Optional) Set the table name if it's different from the model name
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
  }
);

module.exports = UserProfile;