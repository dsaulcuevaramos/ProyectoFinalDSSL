const ServicioRepository = require('../repositories/ServicioRepository');

class ServicioService{

    getAll(){
        return ServicioRepository.findAll();
    }

    getrById(id){
        return ServicioRepository.findById(id);
    }

    create(data){
        return ServicioRepository.create(data);
    }

    update(id, data){
        return ServicioRepository.update(id, data);
    }

    delete(id){
        return ServicioRepository.delete(id);
    } 

}

module.exports = new ServicioService();