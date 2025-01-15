const CrudRepository = require('../lib/CrudRepository');
const Servicio = require('../models/Servicio');

class ServicioRepository extends CrudRepository {
    constructor(){
        super(Servicio);
    }
}
module.exports = new ServicioRepository();