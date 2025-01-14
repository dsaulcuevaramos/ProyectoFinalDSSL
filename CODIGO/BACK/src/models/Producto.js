

class Producto{

    static tableName = 'producto';

    constructor (id,nombre,descripcion,precio,stock,estado){
         this.id = id;  
         this.nombre = nombre;
         this.descripcion = descripcion;
         this.precio = precio;
         this.stock = stock;
         this.estado = estado;
    }
}

module.exports = Producto;