import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import stockRoutes from './routes/stockRoutes';

// Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs   
}));
// Define routes
app.use('/api/stocks', stockRoutes);
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

export { app };