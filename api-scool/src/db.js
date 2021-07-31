import mysql from 'mysql2';
import { promisify } from 'util';
import { keys } from './config/configs'

const myConnection = mysql.createConnection({
    host: keys.DB_HOST,
    port: keys.DB_PORT,
    user: keys.DB_USER,
    password: keys.DB_PASSWORD,
    database: keys.DB_DATABASE
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