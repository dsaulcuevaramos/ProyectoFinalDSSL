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

    //funciones rol
    async getRol(){
        const response = EmpleadoRepository.getRol();
        return response;
    }

}

module.exports = new EmpleadoService();