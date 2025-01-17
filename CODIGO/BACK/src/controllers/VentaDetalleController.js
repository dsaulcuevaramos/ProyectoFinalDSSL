const express = require('express');
const VentaDetalleService = require('../services/VentaDetalleService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await VentaDetalleService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await VentaDetalleService.getById(req.params.id);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.post('/', async (req, res) => {
    const create = await VentaDetalleService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})

module.exports = router;