const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

//todos los controladores
const EmpleadoController = require('./controllers/EmpleadoController')
const ProductoController = require('./controllers/ProductoController')
const ClienteController = require('./controllers/ClienteController')
const RolController = require('./controllers/RolController')
const UsuarioController = require('./controllers/UsuarioController')
const VehiculoController = require('./controllers/VehiculoController')
const ServicioController = require('./controllers/ServicioController')
const VentaController = require('./controllers/VentaController') 

const VentaDetalleController = require('./controllers/VentaDetalleController') 
const ServicioDetalleController = require('./controllers/ServicioDetalleController') 

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin'
}));

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ajusta esto a la URL de tu frontend
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use('/api/roles', RolController);
app.use('/api/empleados', EmpleadoController);
app.use('/api/productos', ProductoController);
app.use('/api/clientes', ClienteController);
app.use('/api/usuarios', UsuarioController);
app.use('/api/vehiculos', VehiculoController);
app.use('/api/servicios', ServicioController);
app.use('/api/ventas', VentaController);

app.use('/api/venta_detalle', VentaDetalleController);
app.use('/api/servicio_detalle', ServicioDetalleController);


const port= process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`servidor corriendo en http://localhost:${port}`)
})