

class Producto{

    static tableName = 'producto';

    constructor (idproducto,nombre,descripcion,precio,stock,estado){
        this.idproducto = idproducto;  
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.estado = estado;
        
    }
}

module.exports = Producto;