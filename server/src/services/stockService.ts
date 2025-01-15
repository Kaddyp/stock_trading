import axios from 'axios';
import { Stock } from '../types/stock';
import { sendToKafka } from '../utils/config';

const STOCK_API_BASE_URL='https://stocks.heat-engineer.dev/api/stocks/heat-engineer';
const stockService = {
  /*** Get current price*/
  async getCurrentStockPrice(): Promise<Stock> {
    try {
        const response = await axios.get(`${STOCK_API_BASE_URL}/current`);
        const stockData: Stock = {
          timestamp: response.data.timestamp,
          price: response.data.price,
          symbol: response.data.symbol,
      };
      return stockData;
    } catch (error) {
        console.error('Error fetching stock price:', error);
        throw new Error('Failed to fetch stock price');
    }
  },

  async getPriceStockHistory(from?: number,to?: number): Promise<Stock> {
    try{
      const response = await axios.get(`${STOCK_API_BASE_URL}/history`, {
          params: { from, to },
      });
      return response.data;  
    }
    catch (error) {
      console.error('Error fetching stock history:', error);
      throw new Error('Failed to fetch stock history');
    }   
  },

  async streamStockPrice() {
    const topic = 'stock-prices';
  
    setInterval(async () => {
        try {
            const stockPrice = await this.getCurrentStockPrice();
            await sendToKafka(topic, stockPrice);
        } catch (error) {
            console.error('Error streaming stock price:', error);
        }
    }, 5000); // Fetch and stream every 5 seconds
  }
};



export default stockService;
