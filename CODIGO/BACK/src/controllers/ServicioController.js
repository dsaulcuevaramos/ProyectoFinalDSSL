const express = require('express');
const ServicioService = require('../services/ServicioService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await ServicioService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await ServicioService.getById(req.params.id);
    if (response) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.post('/', async (req, res) => {
    const create = await ServicioService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})
router.put('/:id', async (req, res) => {
    const update = await ServicioService.update(
        req.params.id,req.body);
    if (update)
        res.status(201).json(update);
    else
        res.status(404).json({ message: 'not updated' });
})

router.delete('/:id', async(req,res)=>{
    const deleted = await ServicioService.delete(req.params.id);
    if(deleted){
        res.status(204).send();
    }
    else
    {
        res.status(404).json({message:'dont delete'});
    }

})

module.exports = router;