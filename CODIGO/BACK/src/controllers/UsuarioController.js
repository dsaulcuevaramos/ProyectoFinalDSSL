const express = require('express');
const UsuarioService = require('../services/UsuarioService');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await UsuarioService.getAll();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const response = await UsuarioService.getById(req.params.id);
    if (response) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})

router.post('/', async (req, res) => {
    const create = await UsuarioService.create(req.body);
    if (create)
        res.status(201).json(create);
    else
        res.status(404).json({ message: 'not registred' });
})

router.put('/:id', async (req, res) => {
    const update = await UsuarioService.update(
        req.params.id, req.body);
    if (update)
        res.status(201).json(update);
    else
        res.status(404).json({ message: 'not updated' });
})

router.delete('/:id', async (req, res) => {
    const deleted = await UsuarioService.delete(req.params.id);
    if (deleted) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'dont delete' });
    }

})
//route.delet por id no habrá

router.delete('/empleado/:id', async (req, res) => {
    const deleted = await UsuarioService.deleteBy(req.params.id);
    if (deleted) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'dont delete' });
    }
})

router.get('/login/:username', async (req, res) => {
    const response = await UsuarioService.getForLogin(req.params.username);
    if (response) {
        res.json(response);
    }
    else {
        res.status(404).json({ message: 'not found' });
    }
})


router.get('/mecanicos/:id', async (req, res) => {
    const response = await UsuarioService.getMecanicos(req.params.id);
    res.json(response);    
})




module.exports = router;