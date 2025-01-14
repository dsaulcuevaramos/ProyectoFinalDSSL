

class Factura{

    static tableName = 'factura';

    constructor (id,fecha,idcliente){
         this.id = id;
         this.fecha = fecha;
         this.idcliente = idcliente;
    }
}

module.exports = Factura;