

class Venta{

    static tableName = "venta";

    constructor(id, fecha,total,idcliente){
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.idcliente = idcliente;
    }

}

module.exports = Venta;