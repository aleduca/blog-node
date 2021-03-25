'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 100; i++) {
      await queryInterface.bulkInsert(
        'categoryPosts',
        [
          {
            categoryId: Math.ceil(Math.random() * 100),
            postId: Math.ceil(Math.random() * 100),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categoryPosts', null, {});
  },
};
