import express, {Application} from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';

//create Express app
const app: Application = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);

//Sync database
 sequelize.sync().then(() => {
    console.log('Database & tables created!');
 });

 export default app;