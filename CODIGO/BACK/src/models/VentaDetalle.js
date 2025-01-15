
class VentaDetalle{

    static tableName = "venta_detalle";

    constructor(id, cantidad, preciounidad, total, idproducto){
        this.id = id;
        this.cantidad = cantidad;
        this.preciounidad = preciounidad;
        this.total = total;
        this.idproducto = idproducto;
    }

}

module.exports = VentaDetalle;