import { app } from './app';
import { connectProducer } from './utils/config';
import stockService from './services/stockService';
import 'dotenv/config';
import WebSocket from 'ws';

// Port Number Setup 
const PORT = process.env.APP_PORT || 8081;
const WSPORT = 4000;

const start = async () => {
    try {
        await connectProducer();
        stockService.streamStockPrice(); // Start streaming stock prices
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });


    // WebSocket Server setup
    const wss = new WebSocket.Server({ port: WSPORT }, () => {
        console.log(`WebSocket server is running on ws://localhost:${WSPORT}`);
    });

  

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', (message) => {
            console.log('Received message from client:', message);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Broadcast stock price updates
    setInterval(async () => {
        const { timestamp, price, symbol } = await stockService.getCurrentStockPrice();
        const message = JSON.stringify({ timestamp, price, symbol });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }, 5000);

    } catch (error) {
        console.error('Failed to start server:', error);
    }

};
  
start();