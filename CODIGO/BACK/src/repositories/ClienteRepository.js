const CrudRepository = require('../lib/CrudRepository');
const Cliente = require('../models/Cliente');

class ClienteRepository extends CrudRepository {
    constructor(){
        super(Cliente);
    }

    async getByDni(dni){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE dni  LIKE CONCAT(?,'%')`, [dni]);          
        return rows[0];
    }


}
module.exports = new ClienteRepository();