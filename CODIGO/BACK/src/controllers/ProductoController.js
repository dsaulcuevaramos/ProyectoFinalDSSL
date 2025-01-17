const express = require('express');
const ProductoService = require('../services/ProductoService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await ProductoService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await ProductoService.getById(req.params.id);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.post('/', async (req, res) => {
    const create = await ProductoService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})

router.put('/:id', async (req, res) => {
    const update = await ProductoService.update(
        req.params.id,req.body);
    if (update)
        res.status(201).json(update);
    else
        res.status(404).json({ message: 'not updated' });
})

router.put('/stock/:id', async (req, res) => {
    const {stock} = req.body;
    const update = await ProductoService.update(
        req.params.id,stock);
    if (update)
        res.status(201).json(update);
    else
        res.status(404).json({ message: 'not updated' });
})

router.delete('/:id', async(req,res)=>{
    const deleted = await ProductoService.delete(req.params.id);
    if(deleted){
        res.status(204).send();
    }
    else
    {
        res.status(404).json({message:'dont delete'});
    }
})

router.get('/producto/:nombre', async (req, res) => {
    const response = await ProductoService.getByNombre(req.params.nombre);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})

module.exports = router;