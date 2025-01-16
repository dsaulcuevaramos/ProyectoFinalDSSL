const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService{

    getAll(){
        return UsuarioRepository.findAll();
    }

    getrById(id){
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

}

module.exports = new UsuarioService();