'use strict';

const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 40; i++) {
      await queryInterface.bulkInsert(
        'comments',
        [
          {
            userId: Math.ceil(Math.random() * 10),
            postId: Math.ceil(Math.random() * 10),
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
