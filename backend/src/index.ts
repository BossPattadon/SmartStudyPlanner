import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend running on Port ${PORT}`)
});