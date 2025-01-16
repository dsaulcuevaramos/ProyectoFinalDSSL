const Servicio_DetalleRepository = require('../repositories/Servicio_DetalleRepository');

class Servicio_DetalleService{

    getAll(){
        return Servicio_DetalleRepository.findAll();
    }

    create(data){
        return Servicio_DetalleRepository.create(data);
    }
    
}

module.exports = new Servicio_DetalleService();