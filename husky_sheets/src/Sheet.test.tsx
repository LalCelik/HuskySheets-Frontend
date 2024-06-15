import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sheet from './Sheet';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('./ParsingUtils/FormulaParse.tsx', () => jest.fn());
jest.mock('./ParsingUtils/GetRefs.tsx', () => jest.fn());
jest.mock('./SheetUtils/ColNameToIdx.tsx', () => ({
  columnNameToIndex: jest.fn()
}));
jest.mock('./ParsingUtils/RefToNumberFormula.tsx', () => jest.fn());
jest.mock('./SheetUtils/IdxToColName.tsx', () => ({
  generateColumnName: jest.fn(() => 'A')
}));
jest.mock('./ParsingUtils/NumberVal.tsx', () => jest.fn());
jest.mock('./ParsingUtils/StringToLetterAndNum.tsx', () => jest.fn());
jest.mock('./recentUpdates.tsx', () => ({
  recentUpdate: 0,
  setRecentUpdate: jest.fn(),
}));

/**
 * A mock function for fetching data from the database
 * 
 * Owner: Amani
 */
function mockFetchResponse(data: any, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(data),
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
  } as Response);
}

describe('Sheet Component', () => {
  beforeEach(() => {
    document.cookie = "user:password";
    global.fetch = jest.fn(() => mockFetchResponse({}));
  });

  /**
   * Tests that the sheet can be opened
   * 
   * Owner: Amani
   */
  test('renders without crashing', () => {
    const { container } = render(
      <Router>
        <Sheet />
      </Router>
    );
    expect(container).toBeInTheDocument();
  });

  /**
   * Tests that the sheet page has the two buttons (save and getUpdates)
   * 
   * Owner: Amani
   */
  test('has Save and Get Updates buttons', () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );
    const saveButton = screen.getByText(/Save/i);
    const getUpdatesButton = screen.getByText(/Get Updates/i);
    expect(saveButton).toBeInTheDocument();
    expect(getUpdatesButton).toBeInTheDocument();
  });

  /**
   * Tests that when the save button is clicked,
   * data goes to server
   * 
   * Owner: Amani
   */
  test('calls saveSheetUpdates when Save button is clicked', async () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/updateSubscription'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Basic')
          })
        })
      );
    });
  });

  /**
   * Tests that when the getUpdates button is pressed,
   * data goes from the server to the frontend application
   * 
   * Owner: Amani
   */
  test('calls getUpdates when Get Updates button is clicked', async () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );
    const getUpdatesButton = screen.getByText(/Get Updates/i);
    fireEvent.click(getUpdatesButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/getUpdatesForSubscription'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Basic')
          })
        })
      );
    });
  });

  /**
   * Tests that a cell in the grid is 'blurred' when a user is not typing
   * 
   * Owner: Amani
   */
  test('updates cell value on blur', async () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );

    await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });

      const cells = screen.getAllByRole('rowgroup');
    const cell = cells[0];

    fireEvent.focus(cell);
    fireEvent.input(cell, { target: { textContent: '123' } });
    fireEvent.blur(cell);

    await waitFor(() => {
      expect(cell).toHaveTextContent('123');
    });
  });

  /**
   * Tests when invalid cell data is received
   * 
   * Owner: Amani
   */
  test('handles invalid cell input', async () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );

    await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });

    const cells = screen.getAllByRole('rowgroup');
    const cell = cells[0];
    fireEvent.focus(cell);
    fireEvent.input(cell, { target: { textContent: '=INVALID' } });
    fireEvent.blur(cell);

    await waitFor(() => {
      expect(cell).toHaveTextContent('An error happened while fetching the data');
    });
  });

  /**
   * Tests that once a formula receives a math function, the cell still displays
   * what originally was typed in
   * 
   * Owner: Amani
   */
  test('updateFormulaCell updates cell values based on formulas', async () => {
    render(
      <Router>
        <Sheet />
      </Router>
    );
  
    const cells = screen.getAllByRole('rowgroup');
    const cell = cells[0];
    fireEvent.focus(cell);
    fireEvent.input(cell, { target: { textContent: '=2 + 1' } });
    fireEvent.blur(cell);

      expect(screen.getByText('=2 + 1')).toBeInTheDocument();
  });
  
});
