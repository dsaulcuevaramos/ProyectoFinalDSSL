
class Empleado{

    static tableName = 'empleado';

    constructor (id,nombres,apellidos,dni,telefono,correo,rol,estado){
         this.id = id;
         this.nombres = nombres;
         this.apellidos = apellidos;
         this.dni = dni;
         this.telefono = telefono;
         this.correo = correo;
         this.rol = rol;
         this.estado = estado;
    }
}

module.exports = Empleado;
