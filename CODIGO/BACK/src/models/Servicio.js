

class Servicio{

    static tableName = 'servicio';

    constructor (id,descripcion,costo,usuario){
         this.id = id;  
         this.descripcion = descripcion;
         this.costo = costo;
         this.usuario = usuario;
    }
}

module.exports = Servicio;