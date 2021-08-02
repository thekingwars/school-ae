import mysql from 'mysql2';
import { promisify } from 'util';

const myConnection = mysql.createConnection({
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