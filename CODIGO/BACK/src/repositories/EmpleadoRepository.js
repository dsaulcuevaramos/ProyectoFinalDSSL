const CrudRepository = require('../lib/CrudRepository');
const Empleado = require('../models/Empleado');

class EmpleadoRepository extends CrudRepository {
    constructor(){
        super(Empleado);
    }

    //funciones para rol
    async getRol(){
        const [rows] = await this.pool.query(
            `SELECT * FROM rol`
        )
        return rows;
    }

    async findUsersByIdRol(rolId) {
        const [rows] = await this.pool.query(`
          SELECT * FROM rol r inner join usuario u on 
          r.id=u.idRol where r.id = ?`, [rolId]);
        return rows;
      }

}
module.exports = new EmpleadoRepository();