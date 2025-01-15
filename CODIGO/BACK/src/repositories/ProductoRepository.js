const CrudRepository = require('../lib/CrudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository {
    constructor(){
        super(Producto);
    }
}
module.exports = new ProductoRepository();