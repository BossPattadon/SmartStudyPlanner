import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors({ 
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend running on Port ${PORT}`)
});