

class Vehiculo{

    static tableName = 'vehiculo';

    constructor (id, placa, marca, modelo,estado,cliente){
         this.id = id;
         this.placa = placa;
         this.marca = marca;
         this.modelo = modelo;
         this.estado = estado;
         this.cliente = cliente;
    }
}

module.exports = Vehiculo;