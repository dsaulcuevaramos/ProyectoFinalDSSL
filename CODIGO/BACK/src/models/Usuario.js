

class Usuario{

    static tableName = 'usuario';

    constructor (id,username,password,empleado){
         this.id = id;
         this.username = username;
         this.password = password;
         this.empleado = empleado;
    }
}

module.exports = Usuario;