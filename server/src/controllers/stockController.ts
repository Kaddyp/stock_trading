import { Request, Response } from 'express';
import { Stock } from '../types/stock';
import stockService from '../services/stockService';

const stockController = {
    async getCurrentStockPrice(req: Request, res: Response): Promise<void> {
      try {   
        const stockData = await stockService.getCurrentStockPrice();
        res.status(200).json(stockData);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get current stock price.' });
      }
    },

    async getPriceStockHistory(req: Request, res: Response): Promise<void> {
      try { 
        const { from, to } = req.query;
        const fromTimestamp = from ? parseInt(from as string, 10) : undefined;
        const toTimestamp = to ? parseInt(to as string, 10) : undefined;
  
        const stockDataHistory = await stockService.getPriceStockHistory(fromTimestamp, toTimestamp);
        res.status(200).json(stockDataHistory);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get stock price history.' });
      }
    },
};
export default stockController;