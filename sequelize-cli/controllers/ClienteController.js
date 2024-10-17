const { Cliente } = require('../models');

module.exports = {
  // Obtener todos los clientes
  async getClientes(req, res) {
    try {
      const clientes = await Cliente.findAll();
      const plainClientes = clientes.map(cliente => cliente.get({ plain: true }));
      res.render('pages/admin/clientes', { clientes: plainClientes });
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  },

  // Obtener un cliente por su ID
  async getClienteById(req, res) {
    try {
      const { cliente_id } = req.params;
      const cliente = await Cliente.findByPk(cliente_id);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el cliente' });
    }
  },

  // Crear un nuevo cliente
  async createCliente(req, res) {
    try {
      const { nombre, direccion, telefono, email } = req.body;
      const nuevoCliente = await Cliente.create({ nombre, direccion, telefono, email });
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el cliente' });
    }
  },

  // Actualizar un cliente existente
  async updateCliente(req, res) {
    try {
      const { cliente_id } = req.params;
      const { nombre, direccion, telefono, email } = req.body;

      const clienteExistente = await Cliente.findByPk(cliente_id);
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      await Cliente.update(
        { nombre, direccion, telefono, email },
        { where: { cliente_id } }
      );

      const clienteActualizado = await Cliente.findByPk(cliente_id); // Obtener el cliente actualizado
      res.status(200).json(clienteActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  },

  // Eliminar un cliente
  async deleteCliente(req, res) {
    try {
      const { cliente_id } = req.params;

      const clienteExistente = await Cliente.findByPk(cliente_id);
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      await Cliente.destroy({ where: { cliente_id } });
      res.status(204).json({ message: 'Cliente eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  }
};
