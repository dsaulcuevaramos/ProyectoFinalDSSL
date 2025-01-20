const VentaDetalleRepository = require('../repositories/VentaDetalleRepository');

class VentaDetalleService{
    getAll(){
        return VentaDetalleRepository.findAll();
    }
    getAllVenta(venta){
        return VentaDetalleRepository.getAll(venta);
    }
    create(data){
        return VentaDetalleRepository.createArray(data);
    }
}
module.exports = new VentaDetalleService();