const CrudRepository = require('../lib/CrudRepository');
const Vehiculo = require('../models/Vehiculo');

class VehiculoRepository extends CrudRepository {
    constructor(){
        super(Vehiculo);
    }

    async getByPlaca(placa){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE placa LIKE CONCAT(?,'%')`, [placa]);          
        return rows[0];
    }
}
module.exports = new VehiculoRepository();