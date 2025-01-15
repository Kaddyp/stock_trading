import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Portfolio from "../../components/Portfolio";
//import { ProgressCircle } from "../../components/ProgressCircle"; 

// jest.mock("./ProgressCircle", () => ({
//     ProgressCircle: jest.fn(({ children }) => <div>{children}</div>), // Mocking ProgressCircle for simplicity
// }));

describe("Portfolio", () => {
    it("renders the account balance and stocks owned correctly", () => {
      render(<Portfolio accountBalance={10000} stocksOwned={50} usedBalancePercentage={30} />);
  
      // Check that account balance and stocks owned are displayed correctly
      expect(screen.getByText("Account Balance : $10000.00")).toBeInTheDocument();
      expect(screen.getByText("Stocks Owned: 50")).toBeInTheDocument();
    });
  
    it("displays the correct used balance percentage in the ProgressCircle", () => {
      render(<Portfolio accountBalance={10000} stocksOwned={50} usedBalancePercentage={30} />);
  
      // Check if ProgressCircle component displays the correct percentage
      expect(screen.getByText("30 %")).toBeInTheDocument(); // This should be inside the mocked ProgressCircle
    });
  
    it("formats the account balance to two decimal places", () => {
      render(<Portfolio accountBalance={9999.99} stocksOwned={20} usedBalancePercentage={50} />);
  
      // Check if the account balance is correctly formatted to two decimal places
      expect(screen.getByText("Account Balance : $9999.99")).toBeInTheDocument();
    });
  
    it("renders with zero account balance and stocks owned", () => {
      render(<Portfolio accountBalance={0} stocksOwned={0} usedBalancePercentage={0} />);
  
      // Check if it correctly displays zero balance and stocks
      expect(screen.getByText("Account Balance : $0.00")).toBeInTheDocument();
      expect(screen.getByText("Stocks Owned: 0")).toBeInTheDocument();
    });
});