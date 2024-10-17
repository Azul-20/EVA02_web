'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pizzas', [{
      nombre: 'Hawaiana',
      tamaño: 'familiar',
      precio: 32.50
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pizzas', null, {});
  }
};
