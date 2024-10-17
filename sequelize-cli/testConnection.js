// testConnection.js
const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('db_pizzeria', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Probar la conexión
async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos ha sido exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close(); // Cerrar la conexión
  }
}

probarConexion();
