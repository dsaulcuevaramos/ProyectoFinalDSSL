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

    async getForLogin(username){
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} 
           WHERE username = ?`, [username]);          
        return rows[0];
    }

}
module.exports = new UsuarioRepository();