

class Usuario{

    static tableName = 'usuario';

    constructor (id,username,password,idempleado){
         this.id = id;
         this.username = username;
         this.password = password;
         this.idempleado = idempleado;
    }
}

module.exports = Usuario;