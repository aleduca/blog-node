'use strict';

const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        'posts',
        [
          {
            userId: Math.ceil(Math.random() * 10),
            coverId: Math.ceil(Math.random() * 10),
            categoryId: Math.ceil(Math.random() * 10),
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
