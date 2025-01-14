
class Cliente{

    static tableName = 'cliente';

    constructor (id,nombre,apellido,dni){
         this.id = id;
         this.nombre = nombre;
         this.apellido = apellido;
         this.dni = dni;
    }
}

module.exports = Cliente;

