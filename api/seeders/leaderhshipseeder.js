'use strict';
const pool = require('../middleware/db');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('LeadershipTalent', [
      {
        user_id: 1,
        company_name: 'ABC Inc.',
        position: 'CEO',
        // Add other attributes as needed
      },
      {
        user_id: 3, 
        company_name: 'XYZ Corp.',
        position: 'CFO',
        // Add other attributes as needed
      },
      // Add more LeadershipTalent objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data if needed
    await queryInterface.bulkDelete('LeadershipTalent', null, {});
  },
};