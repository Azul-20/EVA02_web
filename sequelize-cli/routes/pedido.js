const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.get('/', PedidoController.getPedidos);
router.post('/', PedidoController.createPedido);
router.put('/:id', PedidoController.updatePedido);
router.delete('/:id', PedidoController.deletePedido);

module.exports = router;
