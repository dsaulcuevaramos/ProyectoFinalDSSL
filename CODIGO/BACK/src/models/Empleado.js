
class Empleado{

    static tableName = 'empleado';

    constructor (id,nombre,apellido,dni,telefono,correo,rol,estado){
         this.id = id;
         this.nombre = nombre;
         this.apellido = apellido;
         this.dni = dni;
         this.telefono = telefono;
         this.correo = correo;
         this.rol = rol;
         this.estado = estado;
    }
}

module.exports = Empleado;
