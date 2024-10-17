'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetallePedido.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
        as: 'pedido'
      });

      DetallePedido.belongsTo(models.Pizza, {
        foreignKey: 'pizza_id',
        as: 'pizza'
      });
    }
  }
  DetallePedido.init({
    detalle_pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos', 
        key: 'pedido_id'  
      },
    },
    pizza_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pizzas', 
        key: 'pizza_id'  
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DetallePedido',
    tableName: 'detalle_pedido',
    timestamps: true,
  });
  return DetallePedido;
};