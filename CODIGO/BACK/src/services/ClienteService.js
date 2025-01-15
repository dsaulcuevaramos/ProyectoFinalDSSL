const ClienteRepository = require('../repositories/ClienteRepository');

class ClienteService{


    getAll(){
        return ClienteRepository.findAll();
    }

    getrById(id){
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

}

module.exports = new ClienteService();