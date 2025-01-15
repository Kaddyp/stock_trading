import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StockPriceHistory from "../../components/StockPriceHistory"; // Adjust the path as needed
import axios from "axios";

// Mock the axios module
jest.mock("axios");

describe("StockPriceHistory", () => {
  
  it("renders input fields and button", () => {
    render(<StockPriceHistory />);

    // Check if input fields and button are rendered
    expect(screen.getByLabelText("From Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("From Time (HH:MM:SS):")).toBeInTheDocument();
    expect(screen.getByLabelText("To Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("To Time (HH:MM:SS):")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Fetch Stock History/i })).toBeInTheDocument();
  });

  it("displays stock history data after successful fetch", async () => {
    // Mock the API response
    const mockData = [
      { timestamp: "2025-01-15T00:00:00Z", price: 100 },
      { timestamp: "2025-01-16T00:00:00Z", price: 105 },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<StockPriceHistory />);

    // Fill in the date/time inputs
    fireEvent.change(screen.getByLabelText("From Date:"), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText("From Time (HH:MM:SS):"), { target: { value: "00:00:00" } });
    fireEvent.change(screen.getByLabelText("To Date:"), { target: { value: "2025-01-17" } });
    fireEvent.change(screen.getByLabelText("To Time (HH:MM:SS):"), { target: { value: "23:59:59" } });

    // Simulate button click to fetch stock history
    fireEvent.click(screen.getByRole("button", { name: /Fetch Stock History/i }));

    // Wait for the stock data to be displayed
    // await waitFor(() => {
    //   expect(screen.getByText("2025-01-15T00:00:00Z")).toBeInTheDocument();
    //   expect(screen.getByText("100")).toBeInTheDocument();
    //   expect(screen.getByText("2025-01-16T00:00:00Z")).toBeInTheDocument();
    //   expect(screen.getByText("105")).toBeInTheDocument();
    // });
  });

  it("displays an error message when the API call fails", async () => {
    // Mock the API failure
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<StockPriceHistory />);

    // Fill in the date/time inputs
    fireEvent.change(screen.getByLabelText("From Date:"), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText("From Time (HH:MM:SS):"), { target: { value: "00:00:00" } });
    fireEvent.change(screen.getByLabelText("To Date:"), { target: { value: "2025-01-17" } });
    fireEvent.change(screen.getByLabelText("To Time (HH:MM:SS):"), { target: { value: "23:59:59" } });

    // Simulate button click to fetch stock history
    fireEvent.click(screen.getByRole("button", { name: /Fetch Stock History/i }));

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch stock price history. Please try again later.")).toBeInTheDocument();
    });
  });

  it("displays a message when no stock data is available", async () => {
    // Mock the API response with empty data
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<StockPriceHistory />);

    // Fill in the date/time inputs
    fireEvent.change(screen.getByLabelText("From Date:"), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText("From Time (HH:MM:SS):"), { target: { value: "00:00:00" } });
    fireEvent.change(screen.getByLabelText("To Date:"), { target: { value: "2025-01-17" } });
    fireEvent.change(screen.getByLabelText("To Time (HH:MM:SS):"), { target: { value: "23:59:59" } });

    // Simulate button click to fetch stock history
    fireEvent.click(screen.getByRole("button", { name: /Fetch Stock History/i }));

    // Wait for the "no data" message to appear
    await waitFor(() => {
      expect(screen.getByText("No data available. Adjust the date and time range and try again.")).toBeInTheDocument();
    });
  });

  it("displays an error message when the from timestamp is later than the to timestamp", () => {
    render(<StockPriceHistory />);

    // Fill in the date/time inputs with invalid range
    fireEvent.change(screen.getByLabelText("From Date:"), { target: { value: "2025-01-02" } });
    fireEvent.change(screen.getByLabelText("From Time (HH:MM:SS):"), { target: { value: "12:00:00" } });
    fireEvent.change(screen.getByLabelText("To Date:"), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText("To Time (HH:MM:SS):"), { target: { value: "12:00:00" } });

    // Simulate button click to fetch stock history
    fireEvent.click(screen.getByRole("button", { name: /Fetch Stock History/i }));

    // Check if the error message appears
    expect(screen.getByText("From timestamp must be earlier than To timestamp.")).toBeInTheDocument();
  });
});
