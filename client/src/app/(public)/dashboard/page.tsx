'use client';

import StockDisplay from '../../../../components/StockDisplay';
import Portfolio from '../../../../components/Portfolio';
import TransactionForm from '../../../../components/TransactionForm';
import useWebSocket from '../../../../hooks/useWebSocket';
import { useState, useEffect } from 'react';
import StockPriceHistory from '../../../../components/StockPriceHistory';

const Page = () => {
    const stockData = useWebSocket('ws://localhost:4000'); // WebSocket URL
    const [accountBalance, setAccountBalance] = useState(10000); // Initial cash balance
    const [stocksOwned, setStocksOwned] = useState(0); // Initial stocks owned
    const [currentPrice, setCurrentPrice] = useState<number | null>(null); // Current stock price

    useEffect(() => {
        if (stockData) {
            const parsedData = JSON.parse(stockData);
            setCurrentPrice(parsedData.price);
        }
    }, [stockData]);

    // Calculate the remaining balance percentage
    const remainingBalancePercentage = ((accountBalance / 10000) * 100).toFixed(2);


    // Handle buying stocks
    const handleBuy = (quantity: number) => {
        if (currentPrice) {
            const totalCost = currentPrice * quantity;
            if (accountBalance >= totalCost) {
                setAccountBalance((prev) => prev - totalCost);
                setStocksOwned((prev) => prev + quantity);
            } else {
                alert('Insufficient funds!');
            }
        }
    };

    // Handle selling stocks
    const handleSell = (quantity: number) => {
        if (currentPrice && stocksOwned >= quantity) {
            const totalAmount = currentPrice * quantity;
            setAccountBalance((prev) => prev + totalAmount);
            setStocksOwned((prev) => prev - quantity);
        } else {
            alert('Not enough stocks to sell!');
        }
    };

    return (
        <>
        <div className='w-full h-[25rem] max-w-lg px-10 py-8 mx-auto bg-[#f8f8f8] rounded-lg shadow-xl'>
            <div className='max-w-md mx-auto space-y-6'>
                
                <div  className='flex items-center text-gray-600 w-full border-b overflow-hidden mt-32 md:mt-0 mb-5 mx-auto'>
                    <div className='flex items-center py-3'>
                        <div className='font-bold text-2xl'>
                            <h1 className="">Heat Engineer Stock Trading</h1>
                        </div>
                    </div>
                </div>

                <div className="p-5 md:p-0 w-full transform transition duration-300 ease-in-out pb-10">
                    <StockDisplay currentPrice={currentPrice} />
                    <Portfolio accountBalance={accountBalance} stocksOwned={stocksOwned} 
                     usedBalancePercentage={parseFloat(
                        (100 - Number(remainingBalancePercentage || 0)).toFixed(1)
                      )}
                    />
                    <TransactionForm onBuy={handleBuy} onSell={handleSell} />
                </div>

            </div>
           
        </div>
        <div className='w-full h-auto max-w-lg px-10 py-8 mx-auto bg-[#f8f8f8] rounded-lg shadow-xl'>
            <div className='max-w-md mx-auto space-y-6'>
                <StockPriceHistory />
            </div>
        </div>
        </>
    );
};

export default Page;
