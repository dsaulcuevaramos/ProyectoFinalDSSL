const CrudRepository = require('../lib/CrudRepository');
const VentaDetalle = require('../models/VentaDetalle');

class VentaDetalleRepository extends CrudRepository {
    constructor(){
        super(VentaDetalle);
    }
}
module.exports = new VentaDetalleRepository();