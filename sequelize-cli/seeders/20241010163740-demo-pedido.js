'use strict';

const { Cliente } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {

    const cliente = await Cliente.findOne({ where: { cliente_id: 1 } });

    await queryInterface.bulkInsert('pedidos', [{
      cliente_id: cliente.cliente_id,
      total: 65.00,
      estado: 'entregado',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pedidos', null, {});
  }
};
