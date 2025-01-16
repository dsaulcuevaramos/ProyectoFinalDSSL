const Venta_DetalleRepository = require('../repositories/Venta_DetalleRepository');

class Venta_DetalleService{

    getAll(){
        return Venta_DetalleService.findAll();
    }

    create(data){
        return Venta_DetalleService.create(data);
    }
    
}

module.exports = new Venta_DetalleRepository();