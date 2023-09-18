'use strict';
const pool = require('../middleware/db');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FreelanceTalent', [
      {
        user_id: 2,
        category_tags: JSON.stringify(['Software Development', 'Web Development']),
        portfolio: 'https://example.com/portfolio1',
        // Add other attributes as needed
      }
      // Add more FreelanceTalent objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data if needed
    await queryInterface.bulkDelete('FreelanceTalent', null, {});
  },
};