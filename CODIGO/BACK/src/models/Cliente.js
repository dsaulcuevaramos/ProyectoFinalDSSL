
class Cliente{

    static tableName = 'cliente';

    constructor (id,nombres,apellidos,dni){
         this.id = id;
         this.nombres = nombres;
         this.apellidos = apellidos;
         this.dni = dni;
    }
}

module.exports = Cliente;

