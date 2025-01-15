

class Vehiculo{

    static tableName = 'vehiculo';

    constructor (id, placa, marca, modelo,estado){
         this.id = id;
         this.placa = placa;
         this.marca = marca;
         this.modelo = modelo;
         this.estado = estado;
    }
}

module.exports = Vehiculo;