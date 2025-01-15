import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StockDisplay from "../../components/StockDisplay"; // Adjust the path as necessary

describe("StockDisplay", () => {
  it("renders the current stock price when available", () => {
    render(<StockDisplay currentPrice={150} />);

    // Check if the current stock price is rendered correctly
    expect(screen.getByText("Current Stock Price: $150")).toBeInTheDocument();
  });

  it("renders loading message when currentPrice is null", () => {
    render(<StockDisplay currentPrice={null} />);

    // Check if the loading message is displayed
    expect(screen.getByText("Loading stock price...")).toBeInTheDocument();
  });
});
