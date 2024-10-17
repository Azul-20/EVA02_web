const { Pedido, DetallePedido, Pizza } = require('../models');

module.exports = {
  // Obtener todos los pedidos junto con sus detalles
  async getPedidos(req, res) {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          {
            model: DetallePedido,
            include: [Pizza] 
          }
        ]
      });
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  },

  // Obtener un pedido específico por su ID junto con sus detalles
  async getPedidoById(req, res) {
    try {
      const { pedido_id } = req.params;
      const pedido = await Pedido.findByPk(pedido_id, {
        include: [
          {
            model: DetallePedido,
            include: [Pizza]
          }
        ]
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.status(200).json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  },

  // Crear un pedido junto con sus detalles
  async createPedido(req, res) {
    const { cliente_id, total, estado } = req.body; // detalles es un array de objetos { cantidad, precio, PizzaId }
    
    try {
      // Crear el pedido
      const nuevoPedido = await Pedido.create({ cliente_id });
      
      // Crear los detalles asociados al pedido
      const detallesCreados = await Promise.all(
        detalles.map(async (detalle) => {
          return await DetallePedido.create({
            pedido_id: nuevoPedido.pedido_id,
            pizza_id: detalle.pizza_id,
            cantidad: detalle.cantidad
          });
        })
      );

      res.status(201).json({
        pedido: nuevoPedido,
        detalles: detallesCreados
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el pedido y sus detalles' });
    }
  },

  // Actualizar un pedido y sus detalles
  async updatePedido(req, res) {
    const { pedido_id } = req.params;
    const { cliente_id, total, estado } = req.body;

    try {
      const pedidoExistente = await Pedido.findByPk(id);
      if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      // Actualizar el pedido
      await Pedido.update({ clienteId }, { where: { id } });

      // Actualizar los detalles asociados
      await Promise.all(
        detalles.map(async (detalle) => {
          const detalleExistente = await DetallePedido.findByPk(detalle.id);
          if (detalleExistente) {
            await DetallePedido.update(
              { cantidad: detalle.cantidad, precio: detalle.precio, PizzaId: detalle.PizzaId },
              { where: { id: detalle.id } }
            );
          } else {
            // Si el detalle no existe, se puede crear uno nuevo
            await DetallePedido.create({
              cantidad: detalle.cantidad,
              precio: detalle.precio,
              PedidoId: id,
              PizzaId: detalle.PizzaId
            });
          }
        })
      );

      const pedidoActualizado = await Pedido.findByPk(id, {
        include: [
          {
            model: DetallePedido,
            include: [Pizza]
          }
        ]
      });

      res.status(200).json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el pedido y sus detalles' });
    }
  },

  // Eliminar un pedido y sus detalles
  async deletePedido(req, res) {
    const { id } = req.params;

    try {
      const pedidoExistente = await Pedido.findByPk(id);
      if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      // Eliminar los detalles asociados al pedido
      await DetallePedido.destroy({ where: { PedidoId: id } });

      // Eliminar el pedido
      await Pedido.destroy({ where: { id } });

      res.status(204).json({ message: 'Pedido y detalles eliminados' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el pedido y sus detalles' });
    }
  }
};
