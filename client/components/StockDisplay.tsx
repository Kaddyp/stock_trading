'use client';

type StockDisplayProps = {
    currentPrice: number | null;
};

const StockDisplay: React.FC<StockDisplayProps> = ({ currentPrice }) => {
    return (
        <div className="my-3">
            {currentPrice !== null ? (
                <p className="text-lg font-medium">Current Stock Price: ${currentPrice}</p>
            ) : (
                <p className="font-medium">Loading stock price...</p>
            )}
        </div>
    );
};

export default StockDisplay;
