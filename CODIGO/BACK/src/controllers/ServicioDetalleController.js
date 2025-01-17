const express = require('express');
const ServicioDetalleService = require('../services/ServicioDetalleService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await ServicioDetalleService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await ServicioDetalleService.getById(req.params.id);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.post('/', async (req, res) => {
    const create = await ServicioDetalleService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})

module.exports = router;