const CrudRepository = require('../lib/CrudRepository');
const Empleado = require('../models/Empleado');

class EmpleadoRepository extends CrudRepository {
    constructor(){
        super(Empleado);
    }
}
module.exports = new EmpleadoRepository();