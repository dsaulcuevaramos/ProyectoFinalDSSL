const CrudRepository = require('../lib/CrudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository {
    constructor(){
        super(Producto);
    }

    async actualizaStock(id, stock){
        await this.pool.query(`UPDATE ${this.tableName} 
        SET stock=? WHERE id=?`, [stock,id]);          
        return this.findById(id);
    }

    async findByNombre(nombres){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE nombres LIKE CONCAT(?,'%')`, [nombres]);          
        return rows;
    }
    
}
module.exports = new ProductoRepository();