const CrudRepository = require('../lib/CrudRepository');
const VentaDetalle = require('../models/VentaDetalle');

class Venta_DetallerRepository extends CrudRepository {
    constructor(){
        super(VentaDetalle);
    }
}
module.exports = new Venta_DetallerRepository();