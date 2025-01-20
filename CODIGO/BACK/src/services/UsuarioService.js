const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService{

    getAll(){
        return UsuarioRepository.findAll();
    }

    getById(id){
        return UsuarioRepository.findById(id);
    }

    create(data){
        return UsuarioRepository.create(data);
    }

    update(id, data){
        return UsuarioRepository.update(id, data);
    }

    delete(id){
        return UsuarioRepository.delete(id);
    } 

    deleteBy(empleado){
        return UsuarioRepository.deleteBy(empleado);
    }

    getForLogin(username){
        return UsuarioRepository.getForLogin(username);
    }

    getMecanicos(id){
        return UsuarioRepository.getMecanicos(id);
    }

}

module.exports = new UsuarioService();