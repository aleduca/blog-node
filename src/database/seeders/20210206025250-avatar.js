'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        'avatars',
        [
          {
            path: 'eu.png',
            userId: Math.ceil(Math.random() * 10),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('avatars', null, {});
  },
};
