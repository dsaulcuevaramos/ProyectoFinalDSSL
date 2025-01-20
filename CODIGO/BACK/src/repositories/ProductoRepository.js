const CrudRepository = require('../lib/CrudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository {
    constructor(){
        super(Producto);
    }

    async actualizaStock(id, stock) {
        const [result] = await this.pool.query(`
            UPDATE ${this.tableName} 
            SET stock = ? 
            WHERE id = ?`, [stock, id]);
        
        if (result.affectedRows > 0) {
            console.log(`Stock actualizado correctamente para el producto ID: ${id}`);
            return this.findById(id); 
        } else {
            console.error(`No se encontró producto con ID: ${id}`);
            return null;
        }
    }


    async findByNombre(nombres){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE nombres LIKE CONCAT(?,'%')`, [nombres]);          
        return rows;
    }

    async findAllOrden() {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} ORDER BY nombres ASC`);
        return rows;
    }
    
}
module.exports = new ProductoRepository();