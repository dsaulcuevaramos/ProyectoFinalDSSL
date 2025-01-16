const CrudRepository = require('../lib/CrudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository {
    constructor(){
        super(Producto);
    }

    async findByNombre(nombres){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE nombres LIKE CONCAT(?,'%')`, [nombres]);          
        return rows;
    }
    
}
module.exports = new ProductoRepository();