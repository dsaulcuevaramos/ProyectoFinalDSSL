const CrudRepository = require('../lib/CrudRepository');
const Usuario = require('../models/Usuario');

class UsuarioRepository extends CrudRepository {
    constructor(){
        super(Usuario);
    }

    async deleteBy(empleado) {
        const [result] = await this.pool.query(`DELETE FROM ${this.tableName}
            WHERE empleado = ?`, [empleado]);            
        return result.affectedRows > 0;
    }

}
module.exports = new UsuarioRepository();