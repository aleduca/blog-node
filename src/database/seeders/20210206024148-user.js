'use strict';

const bcrypt = require('bcrypt');
const faker = require('faker/locale/pt_BR');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('123', 10),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
