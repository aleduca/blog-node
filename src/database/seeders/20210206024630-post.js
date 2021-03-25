'use strict';

const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 100; i++) {
      await queryInterface.bulkInsert(
        'posts',
        [
          {
            userId: Math.ceil(Math.random() * 100),
            coverId: Math.ceil(Math.random() * 100),
            categoryId: Math.ceil(Math.random() * 100),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            slug: faker.lorem.slug(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
