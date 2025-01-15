const CrudRepository = require('../lib/CrudRepository');
const Vehiculo = require('../models/Vehiculo');

class VehiculoRepository extends CrudRepository {
    constructor(){
        super(Vehiculo);
    }
}
module.exports = new VehiculoRepository();