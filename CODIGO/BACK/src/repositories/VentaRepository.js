const CrudRepository = require('../lib/CrudRepository');
const Venta = require('../models/Venta');

class VentaRepository extends CrudRepository {
    constructor(){
        super(Venta);
    }
}
module.exports = new VentaRepository();