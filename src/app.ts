import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import IndexRoutes from './routes/index'
import path from 'path'
import cors from 'cors'

dotenv.config();
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'))
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH,  DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PATCH, DELETE");
    app.use(cors());
    next();
  });

// routes
app.use('/api', IndexRoutes)

// this folder for app will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;