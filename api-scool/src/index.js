import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import indexRoutes from './routes/index.routes'

//variables
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({

    path: `.env.${NODE_ENV}`
})


//options
app.set('port', 3200 || process.env.PORT);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//static routes
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/api', indexRoutes);

//server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});