const CrudRepository = require('../lib/CrudRepository');
const Cliente = require('../models/Cliente');

class ClienteRepository extends CrudRepository {
    constructor(){
        super(Cliente);
    }
}
module.exports = new ClienteRepository();