'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        'covers',
        [
          {
            path: 'cover.png',
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
