const ClienteRepository = require('../repositories/ClienteRepository');

class ClienteService{


    getAll(){
        return ClienteRepository.findAll();
    }

    getById(id){
        return ClienteRepository.findById(id);
    }

    create(data){
        return ClienteRepository.create(data);
    }

    update(id, data){
        return ClienteRepository.update(id, data);
    }

    delete(id){
        return ClienteRepository.delete(id);
    } 

    getByDni(dni){
        return ClienteRepository.getByDni(dni);
    }

}

module.exports = new ClienteService();