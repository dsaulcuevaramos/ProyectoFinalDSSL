const CrudRepository = require('../lib/CrudRepository');
const VentaDetalle = require('../models/VentaDetalle');

class VentaDetalleRepository extends CrudRepository {
    constructor(){
        super(VentaDetalle);
    }
    
    async getAll(venta){
        const [rows] = await this.pool.query(`
            SELECT * FROM ${this.tableName} d
            INNER JOIN producto p on d.producto = p.id
            WHERE d.venta = ?`, [venta]);     

        return rows;
    }

    async createArray(data) {
        const [result] = await this.pool.query(`INSERT INTO ${this.tableName} (cantidad, precioUnidad, total, venta, producto) VALUES ?`, 
            [data.map(item => [item.cantidad, item.precioUnidad, item.total, item.venta, item.producto])]
        );
        return { inserted: result.affectedRows, data };
    }

}
module.exports = new VentaDetalleRepository();