const CrudRepository = require('../lib/CrudRepository');
const ServicioDetalle = require('../models/ServicioDetalle');

class Servicio_DetallerRepository extends CrudRepository {
    constructor(){
        super(ServicioDetalle);
    }
}
module.exports = new Servicio_DetallerRepository();