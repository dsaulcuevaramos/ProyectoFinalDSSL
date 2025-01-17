const VentaDetalleRepository = require('../repositories/VentaDetalleRepository');

class VentaDetalleService{
    getAll(){
        return VentaDetalleRepository.findAll();
    }
    create(data){
        return VentaDetalleRepository.create(data);
    }
}
module.exports = new VentaDetalleService();