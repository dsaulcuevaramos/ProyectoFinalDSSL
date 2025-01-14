
class Rol{

    static tableName = 'rol';

    constructor (id,nombre,descripcion,sueldo){
         this.id = id;
         this.nombre = nombre;
         this.descripcion = descripcion;
         this.sueldo = sueldo;
    }
}

module.exports = Rol;
