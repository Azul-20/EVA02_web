'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'cliente'
      });

      Pedido.hasMany(models.DetallePedido, {
        foreignKey: 'pedido_id',
        as: 'detalle_pedido'
      });
    }
  }
  Pedido.init({
    pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes', 
        key: 'cliente_id'  
      },
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: true,
  });
  return Pedido;
};