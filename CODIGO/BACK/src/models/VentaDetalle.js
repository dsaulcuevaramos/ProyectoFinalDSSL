
class VentaDetalle{

    static tableName = "venta_detalle";

    constructor(id, cantidad, preciounidad, total, venta,roducto){
        this.id = id;
        this.cantidad = cantidad;
        this.preciounidad = preciounidad;
        this.total = total;
        this.venta = venta;
        this.producto = producto;
    }

}

module.exports = VentaDetalle;