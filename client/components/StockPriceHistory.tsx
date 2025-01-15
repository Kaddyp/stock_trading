'use client';

import React, { useState } from 'react';
import axios from 'axios';
interface StockPriceData {
  timestamp: string | number; // Adjust as needed (e.g., Unix timestamp or ISO string)
  price: number;
}
const StockPriceHistory = () => {
  const [fromDate, setFromDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toDate, setToDate] = useState('');
  const [toTime, setToTime] = useState('');
  const [stockHistory, setStockHistory] =  useState<StockPriceData[]>([]);;
  const [error, setError] = useState<string | null>(null);;

  // Function to fetch stock price history (BTC)
  const fetchStockHistory = async () => {
    try {
      setError(null); // Reset error      
      
      // Create Date objects for fromDate and toDate
      const fromTimestamp =
        fromDate && fromTime
          ? new Date(`${fromDate}T${fromTime}Z`).getTime()
          : undefined;
      const toTimestamp =
        toDate && toTime
          ? new Date(`${toDate}T${toTime}Z`).getTime()
          : undefined;

      // Validate range: fromTimestamp must be earlier than toTimestamp
      if (fromTimestamp && toTimestamp && fromTimestamp > toTimestamp) {
        setError('From timestamp must be earlier than To timestamp.');
        return;
      }

      // Log timestamps for debugging
      console.log('From Timestamp (ms):', fromTimestamp);
      console.log('To Timestamp (ms):', toTimestamp);

      // Fetch the stock price history (BTC data) from the backend API
      const response = await axios.get('http://localhost:8081/api/stocks/history', {
        params: { from: fromTimestamp, to: toTimestamp },
      });

      // Set the fetched data into the state
      setStockHistory(response.data);
    } catch (err) {
      setError('Failed to fetch stock price history. Please try again later.');
      console.error(err); // Log the error for debugging
    }
  };
  

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Stock Price History</h1>

      <div className="flex flex-col gap-4 mb-5">     
        <label className="block">
          <span className="text-gray-700">From Date:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">From Time (HH:MM:SS):</span>
          <input
            type="time"
            step="1" // Allows seconds
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        {/* To Date and Time */}
        <label className="block">
          <span className="text-gray-700">To Date:</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">To Time (HH:MM:SS):</span>
          <input
            type="time"
            step="1" // Allows seconds
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <button
          onClick={fetchStockHistory}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Stock History
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {stockHistory.length > 0 && (
        <div className="mt-5 h-[10rem] overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {stockHistory.map((data, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(data.timestamp).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stockHistory.length === 0 && !error && (
        <p className="text-gray-500">No data available. Adjust the date and time range and try again.</p>
      )}
    </>
  );
};

export default StockPriceHistory;
