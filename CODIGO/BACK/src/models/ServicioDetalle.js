

class ServicioDetalle{

    static tableName = 'servicio_detalle';

    constructor(id, fecha, costototal, idservicio, idvehiculo){
        this.id = id;
        this.fecha = fecha
        this.costototal = costototal;
        this.idservicio = idservicio;
        this.idservicio = idvehiculo;
    }

}

module.exports = ServicioDetalle;