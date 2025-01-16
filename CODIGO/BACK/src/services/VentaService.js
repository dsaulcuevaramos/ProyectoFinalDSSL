const VentaRepository = require('../repositories/VentaRepository');

class VentaService{

    getAll(){
        return VentaRepository.findAll();
    }

    getrById(id){
        return VentaRepository.findById(id);
    }

    create(data){
        return VentaRepository.create(data);
    }

    update(id, data){
        return VentaRepository.update(id, data);
    }

    delete(id){
        return VentaRepository.delete(id);
    } 

}

module.exports = new VentaService();