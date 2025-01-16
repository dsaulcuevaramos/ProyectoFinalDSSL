
class Rol{

    static tableName = 'rol';

    constructor (id,nombres,descripcion,sueldo){
         this.id = id;
         this.nombres = nombres;
         this.descripcion = descripcion;
         this.sueldo = sueldo;
    }
}

module.exports = Rol;
