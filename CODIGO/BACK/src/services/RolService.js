const RolRepository = require('../repositories/RolRepository');

class RolService {
  getAllRoles() {
    return RolRepository.findAll();
  }

  getRolById(id) {
    return RolRepository.findById(id);
  }

  createRol(rolData) {
    return RolRepository.create(rolData);
  }

  updateRol(id, rolData) {
    return RolRepository.update(id, rolData);
  }

  deleteRol(id) {
    return RolRepository.delete(id);
  }

  /*
  async getUsersByRole(rolId){
    const rol = await RolRepository.findById(rolId);
    if(!rol){
      throw new Error('Rol not found');      
    }
    const users = await RolRepository.findUsersByIdRol(rolId);
    const userbyrol = {
      data: {
        ...rol,
        usuarios: users
      }
    }
    return userbyrol;

  }
    */
}

module.exports = new RolService();