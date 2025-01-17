const ServicioDetalleRepository = require('../repositories/ServicioDetalleRepository');

class ServicioDetalleService{

    getAll(){
        return ServicioDetalleRepository.findAll();
    }
    create(data){
        return ServicioDetalleRepository.create(data);
    }
}

module.exports = new ServicioDetalleService();