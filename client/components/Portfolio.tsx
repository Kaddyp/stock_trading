'use client';
import { ProgressCircle } from "./ProgressCircle"
type PortfolioProps = {
    accountBalance: number;
    stocksOwned: number;
    usedBalancePercentage: number;
};

const Portfolio: React.FC<PortfolioProps> = ({ accountBalance, stocksOwned, usedBalancePercentage }) => {
    return (
        <>
            <div className="flex items-center gap-x-5 py-3">
                <ProgressCircle value={usedBalancePercentage} radius={50} strokeWidth={10}>
                <span className="font-medium">
                    {usedBalancePercentage} %
                </span>
                </ProgressCircle>
                <div>
                <p className="font-medium">
                    Account Balance : ${accountBalance.toFixed(2)}
                </p>
                <p className="font-medium">
                    Stocks Owned: {stocksOwned}
                </p>
                </div>
            </div>


        </>

        
    );
};

export default Portfolio;
