import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Registration from "./Registration";
import { MemoryRouter } from "react-router-dom";
import Sheet from "./Sheet.tsx"
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
/**
 * Ownership: Ira
 * 
 * Will test the ability of the grid to render the correct features
 */

describe("Sheet Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  jest.mock('./Grid', () => {
    return ({ data }) => (
      <table data-testid="grid">
        <tbody>
          {data.map((row, index) => (
            <tr key={index} data-testid="grid-row">
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  });
  

  // Mock reverseParse function (you should replace this with the actual implementation)
  const reverseParse = (resultList) => resultList.map(item => [item]);



  test("renders save button at the top", () => {
    renderWithRouter(<Sheet />);
    const saveButton = screen.getByRole("button", {
        name: /Save/i,
      });
    expect(saveButton).toBeInTheDocument();
  });

  test("renders get updates button at the top", () => {
    renderWithRouter(<Sheet />);
    const getUpdates = screen.getByRole("button", {
        name: /Get Updates/i,
      });
    expect(getUpdates).toBeInTheDocument();
  });

  test("save button press connects to server", () => {
    renderWithRouter(<Sheet />);
    const saveSheetUpdates = jest.fn();
    
    fireEvent.click(screen.getByText('Save'));
    expect(screen).toHaveBeenCalled();
  });

  test("get updates button press connects to server", () => {
    renderWithRouter(<Sheet />);
    const getUpdates = screen.getByRole("button", {
        name: /Get Updates/i,
      });
    expect(getUpdates).toBeInTheDocument();
  });



  test("renders grid of 100 x 100 cells", () => {
    const data = Array.from({ length: 100 }, (_, i) => `Row ${i + 1}`);
  const columns = ['column1', 'column2'];

    render(<Sheet columns={columns} data={data} />);

    // Check if the Grid component has 100 rows
    const rows = screen.getAllByTestId('grid-row');
    expect(rows).toHaveLength(100);
  });


  test("renders content editable cells", () => {
    
  });

  test("renders column headings in text format of A, B, C, etc", () => {
    
  });

  test("renders row headings in number form of 1, 2, 3, etc.", () => {
    
  });

  test("reads from server correctly", () => {
    
  });


});
