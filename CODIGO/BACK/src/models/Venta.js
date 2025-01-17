

class Venta{

    static tableName = "venta";

    constructor(id, fecha,importetotal,cliente){
        this.id = id;
        this.fecha = fecha;
        this.importetotal = importetotal;
        this.cliente = cliente;
    }

}

module.exports = Venta;