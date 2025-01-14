

class Vehiculo{

    static tableName = 'vehiculo';

    constructor (id, placa, marca, modelo){
         this.id = id;
         this.placa = placa;
         this.marca = marca;
         this.modelo = modelo;
    }
}

module.exports = Vehiculo;