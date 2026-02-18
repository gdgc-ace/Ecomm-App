import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();//acess .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
//routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
//if any error occurs, this will catch it and return a 500 response, where 500 means internal server error, 304 means not modified, 404 means not found, 400 means bad request, 401 means unauthorized, 403 means forbidden, 422 means unprocessable entity, 201 means created, 200 means ok, 503 means service unavailable, 504 means gateway timeout, 502 means bad gateway, 301 means moved permanently, 302 means found, 307 means temporary redirect, 308 means permanent redirect, 100 means continue, 101 means switching protocols, 102 means processing, 103 means early hints.
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
