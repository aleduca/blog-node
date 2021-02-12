'use strict';

const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        'categories',
        [
          {
            name: faker.commerce.department(),
            slug: faker.lorem.slug(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
