import express from 'express';
import stockController from '../controllers/stockController';
const router = express.Router();

router.get('/current', stockController.getCurrentStockPrice);
router.get('/history', stockController.getPriceStockHistory);

export default router;