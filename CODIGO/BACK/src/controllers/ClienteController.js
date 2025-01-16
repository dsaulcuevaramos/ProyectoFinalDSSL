const express = require('express');
const ClienteService = require('../services/ClienteService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await ClienteService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await ClienteService.getById(req.params.id);
    if (response) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.get('/dni/:dni', async (req, res) => {
    const response = await ClienteService.getByDni(req.params.dni);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})
router.post('/', async (req, res) => {
    const create = await ClienteService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})
router.put('/:id', async (req, res) => {
    const update = await ClienteService.update(
        req.params.id,req.body);
    if (update)
        res.status(201).json(update);
    else
        res.status(404).json({ message: 'not updated' });
})

router.delete('/:id', async(req,res)=>{
    const deleted = await ClienteService.delete(req.params.id);
    if(deleted){
        res.status(204).send();
    }
    else
    {
        res.status(404).json({message:'dont delete'});
    }

})

module.exports = router;