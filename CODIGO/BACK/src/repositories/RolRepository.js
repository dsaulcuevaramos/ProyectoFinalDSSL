const CrudRepository = require('../lib/CrudRepository');
const Rol = require('../models/rol');

class RolRepository extends CrudRepository {
    constructor(){
        super(Rol);
    }

    async 

}
module.exports = new RolRepository();