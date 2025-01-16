
const ProductoRepository = require('../repositories/ProductoRepository');

class ProductoService{

    getAll(){
        return ProductoRepository.findAll();
    }

    getrById(id){
        return ProductoRepository.findById(id);
    }

    create(data){
        return ProductoRepository.create(data);
    }

    update(id, data){
        return ProductoRepository.update(id, data);
    }

    delete(id){
        return ProductoRepository.delete(id);
    } 

    getByNombre(nombre){
        return ProductoRepository.findByNombre(nombre);
    }

}

module.exports = new ProductoService();