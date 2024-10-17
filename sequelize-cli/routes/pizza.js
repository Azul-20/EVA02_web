const express = require('express');
const router = express.Router();
const PizzaController = require('../controllers/PizzaController');

router.get('/', PizzaController.getPizzas);         
router.get('/:id', PizzaController.getPizzaById);      
router.post('/', PizzaController.createPizza);           
router.put('/:id', PizzaController.updatePizza);        
router.delete('/:id', PizzaController.deletePizza);      

module.exports = router;
