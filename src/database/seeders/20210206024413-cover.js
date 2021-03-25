'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 100; i++) {
      await queryInterface.bulkInsert(
        'covers',
        [
          {
            path: 'images/cover.png',
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('covers', null, {});
  },
};
