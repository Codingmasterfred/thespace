'use strict';
const pool = require('../middleware/db');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserProfiles', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed1',
        profile_photo: 'photo1.jpg',
        bio: 'A software engineer',
        user_type: 'Leadership',
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'hashed2',
        profile_photo: 'photo2.jpg',
        bio: 'Freelance designer',
        user_type: 'Freelancer',
      },
      {
        username: 'alice_lee',
        email: 'alice@example.com',
        password: 'hashed3',
        profile_photo: 'photo3.jpg',
        bio: 'Marketing manager',
        user_type: 'Leadership',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data if needed
    await queryInterface.bulkDelete('user_profiles', null, {});
  },
};
