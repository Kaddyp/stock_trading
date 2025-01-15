'use client';
import { ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline'
type TransactionFormProps = {
    onBuy: (quantity: number) => void;
    onSell: (quantity: number) => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onBuy, onSell }) => {
    return (
        <>
            <div className='flex space-x-3'>
                <button type="button"
                    className="bg-[#50d71e] mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onBuy(1)}> 
                    <ShoppingBagIcon  aria-hidden="true" className="size-6"/>
                    Buy
                </button>
                <button type="button"
                    className="bg-[#a05141] mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onSell(1)}>
                    <TagIcon  aria-hidden="true" className="size-6"/>
                    Sell                    
                </button>
            </div>
        </>
    );
};

export default TransactionForm;
