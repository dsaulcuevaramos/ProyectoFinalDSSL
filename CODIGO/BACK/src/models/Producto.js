

class Producto{

    static tableName = 'producto';

    constructor (id,nombres,descripcion,precio,stock,estado){
        this.id = id;  
        this.nombres = nombres;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.estado = estado;
        
    }
}

module.exports = Producto;