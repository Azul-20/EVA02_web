'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [{
      nombre: 'Rael Rivero',
      direccion: 'Calle España 157',
      telefono: '999666333',
      email: 'rael.rivero@email.com',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
