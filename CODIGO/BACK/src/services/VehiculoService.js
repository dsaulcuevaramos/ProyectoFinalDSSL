const VehiculoRepository = require('../repositories/VehiculoRepository');

class VehiculoService{

    getAll(){
        return VehiculoRepository.findAll();
    }

    getrById(id){
        return VehiculoRepository.findById(id);
    }

    create(data){
        return VehiculoRepository.create(data);
    }

    update(id, data){
        return VehiculoRepository.update(id, data);
    }

    delete(id){
        return VehiculoRepository.delete(id);
    } 

    getByPlaca(placa){
        return VehiculoRepository.getByPlaca(placa);
    }

}

module.exports = new VehiculoService();