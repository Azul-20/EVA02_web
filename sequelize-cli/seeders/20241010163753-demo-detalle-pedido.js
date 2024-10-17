'use strict';

const { Pizza, Pedido } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {

    const pizza = await Pizza.findOne({ where: { nombre: 'Hawaiana' } });

    const pedido = await Pedido.findOne({ where: { cliente_id: 1 } });

    await queryInterface.bulkInsert('detalle_pedido', [{
      pedido_id: pedido.pedido_id,
      pizza_id: pizza.pizza_id,
      cantidad: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detalle_pedido', null, {});
  }
};
