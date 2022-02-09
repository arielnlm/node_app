'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', [{
      name:'admin',
      email: 'admin@mail.com',
      password: '$2b$10$$2b$10$RcOVxNM0CM85n0SlBpClCevN2uiZHg7QlmBITzwJ8eoD2H/L5sMbS',
      admin: '1',
      mod: '1'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
