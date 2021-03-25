'use strict';

const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 100; i++) {
      await queryInterface.bulkInsert(
        'comments',
        [
          {
            userId: Math.ceil(Math.random() * 100),
            postId: Math.ceil(Math.random() * 100),
            comment: faker.lorem.paragraphs(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
