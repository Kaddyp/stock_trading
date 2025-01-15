import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "../../components/TransactionForm"; // Adjust the path as needed

describe("TransactionForm", () => {
  
  it("renders Buy and Sell buttons", () => {
    render(<TransactionForm onBuy={() => {}} onSell={() => {}} />);

    // Check if both buttons are rendered
    expect(screen.getByRole("button", { name: /Buy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sell/i })).toBeInTheDocument();
  });

  it("calls onBuy with the correct quantity when Buy button is clicked", () => {
    const mockOnBuy = jest.fn();
    render(<TransactionForm onBuy={mockOnBuy} onSell={() => {}} />);

    // Find the Buy button and click it
    const buyButton = screen.getByRole("button", { name: /Buy/i });
    fireEvent.click(buyButton);

    // Verify that onBuy was called with the correct argument (1)
    expect(mockOnBuy).toHaveBeenCalledWith(1);
  });

  it("calls onSell with the correct quantity when Sell button is clicked", () => {
    const mockOnSell = jest.fn();
    render(<TransactionForm onBuy={() => {}} onSell={mockOnSell} />);

    // Find the Sell button and click it
    const sellButton = screen.getByRole("button", { name: /Sell/i });
    fireEvent.click(sellButton);

    // Verify that onSell was called with the correct argument (1)
    expect(mockOnSell).toHaveBeenCalledWith(1);
  });
});
