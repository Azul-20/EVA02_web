const { Pizza } = require('../models');

module.exports = {
  // Obtener todas las pizzas
  async getPizzas(req, res) {
    try {
      const pizzas = await Pizza.findAll();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las pizzas' });
    }
  },

  // Obtener una pizza por su ID
  async getPizzaById(req, res) {
    try {
      const { pizza_id } = req.params;
      const pizza = await Pizza.findByPk(pizza_id);

      if (!pizza) {
        return res.status(404).json({ error: 'Pizza no encontrada' });
      }

      res.status(200).json(pizza);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la pizza' });
    }
  },

  // Crear una nueva pizza
  async createPizza(req, res) {
    try {
      const { nombre, tamaño, precio } = req.body;
      const nuevaPizza = await Pizza.create({ nombre, tamaño, precio });
      res.status(201).json(nuevaPizza);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la pizza' });
    }
  },

  // Actualizar una pizza existente
  async updatePizza(req, res) {
    try {
      const { pizza_id } = req.params;
      const { nombre, tamaño, precio } = req.body;

      const pizzaExistente = await Pizza.findByPk(pizza_id);
      if (!pizzaExistente) {
        return res.status(404).json({ error: 'Pizza no encontrada' });
      }

      await Pizza.update(
        { nombre, tamaño, precio },
        { where: { pizza_id } }
      );

      const pizzaActualizada = await Pizza.findByPk(pizza_id); // Obtener la pizza actualizada
      res.status(200).json(pizzaActualizada);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la pizza' });
    }
  },

  // Eliminar una pizza
  async deletePizza(req, res) {
    try {
      const { pizza_id } = req.params;

      const pizzaExistente = await Pizza.findByPk(pizza_id);
      if (!pizzaExistente) {
        return res.status(404).json({ error: 'Pizza no encontrada' });
      }

      await Pizza.destroy({ where: { pizza_id } });
      res.status(204).json({ message: 'Pizza eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la pizza' });
    }
  }
};
