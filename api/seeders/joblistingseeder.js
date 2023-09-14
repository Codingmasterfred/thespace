'use strict';
const pool = require('../middleware/db');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('JobListings', [
      {
        posted_by_leadership: 1, 
        job_title: 'Software Engineer',
        job_description: 'We are looking for a talented software engineer...',
        location: 'New York',
        category_tags: 'Software Development',
        application_deadline: '2023-12-31', 
      },
      {
        posted_by_leadership: 2, 
        job_title: 'Graphic Designer',
        job_description: 'Join our creative team as a graphic designer...',
        location: 'Los Angeles',
        category_tags: 'Design',
        application_deadline: '2023-12-15',
      },
      {
        posted_by_leadership: 1, 
        job_description: 'We are hiring a marketing manager to lead our campaigns...',
        location: 'San Francisco',
        category_tags: 'Marketing',
        application_deadline: '2023-11-30',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data if needed
    await queryInterface.bulkDelete('JobListings', null, {});
  },
};