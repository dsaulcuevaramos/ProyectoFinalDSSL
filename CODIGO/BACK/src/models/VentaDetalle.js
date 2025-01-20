
class VentaDetalle{

    static tableName = "venta_detalle";

    constructor(id, cantidad, preciounidad, costototal, venta,producto){
        this.id = id;
        this.cantidad = cantidad;
        this.preciounidad = preciounidad;
        this.costototal = costototal;
        this.venta = venta;
        this.producto = producto;
    }

}

module.exports = VentaDetalle;