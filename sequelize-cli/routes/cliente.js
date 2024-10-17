const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

router.get('/', ClienteController.getClientes);  
router.get('/:id', ClienteController.getClienteById); 
router.post('/', ClienteController.createCliente);  
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

router.get('/add', (req, res) => {
    console.log('Ruta /admin/clientes/add accedida');
    res.render('pages/admin/forms/clientes/add'); // Verifica que la ruta sea correcta
});

module.exports = router;
