import mysql from 'mysql2';
import { promisify } from 'util';
require('dotenv').config({
    path: `.env.development`
})

const myConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

myConnection.connect(function(err) {
    if (err) {
        console.log('Ha ocurrido un error con la conexión: ' + err);
        return
    }

    console.log('Nos hemos conectado con éxito en la base de datos');
});

myConnection.query = promisify(myConnection.query);

export default myConnection;