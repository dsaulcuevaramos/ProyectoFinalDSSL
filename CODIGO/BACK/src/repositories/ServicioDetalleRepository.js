const CrudRepository = require('../lib/CrudRepository');
const ServicioDetalle = require('../models/ServicioDetalle');

class ServicioDetallerRepository extends CrudRepository {
    constructor(){
        super(ServicioDetalle);
    }
    
}
module.exports = new ServicioDetallerRepository();