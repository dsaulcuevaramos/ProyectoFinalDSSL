const EmpleadoRepository = require('../repositories/EmpleadoRepository');

class EmpleadoService{

    getAll(){
        return EmpleadoRepository.findAll();
    }

    getrById(id){
        return EmpleadoRepository.findById(id);
    }

    create(data){
        return EmpleadoRepository.create(data);
    }

    update(id, data){
        return EmpleadoRepository.update(id, data);
    }

    delete(id){
        return EmpleadoRepository.delete(id);
    } 

}

module.exports = new EmpleadoService();