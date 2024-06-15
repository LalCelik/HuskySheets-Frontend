import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useNavigate: () => jest.fn(),
}));

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


describe("HomePage", () => {
  beforeEach(() => {
    
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests that once a user logs in, they can see a table with all of the
   * sheets registered in the server
   * 
   * Owner: Amani
   */
  test("displays sheet table when user is authenticated", async () => {

    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(mockFetchResponse({
        value: [{ publisher: "test_publisher" }],
      }))
      .mockResolvedValueOnce(mockFetchResponse({
        success: true,
        value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
      }));

    document.cookie = "testuser:testpassword";

    render(
      <Router>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("test_sheet")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("test_publisher")).toBeInTheDocument();
    });
  });

  /**
   * Tests the a text box pops up when the user clicks create a new sheet
   * 
   * Owner: Amani
   */
  test("opens popup when 'Create a new sheet' button is clicked", async () => {
    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(
      <Router>
        <HomePage />
      </Router>
    );

    fireEvent.click(screen.getByText("Create a new sheet"));

    // Check if popup is opened
    expect(
      screen.getByText("Please give your new sheet a name")
    ).toBeInTheDocument();
  });

  /**
   * Tests that the server receives the sheet data once a sheet name is given by the user
   * 
   * Owner: Amani
   */
  test("calls creatingSheet function when 'Open Sheet' button is clicked in popup", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce(mockFetchResponse({
      success: true,
    }));

    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(
      <Router>
        <HomePage />
      </Router>
    );

    fireEvent.click(screen.getByText("Create a new sheet"));

    fireEvent.change(screen.getByPlaceholderText("Sheet Name"), {
      target: { value: "test_sheet" },
    });

    fireEvent.click(screen.getByText("Open Sheet"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/createSheet",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk", // Base64 encoded 'testuser:testpassword'
          },
          body: JSON.stringify({
            publisher: "testuser",
            sheet: "test_sheet",
            id: null,
            payload: null,
          }),
        }
      );
    });
  });

  /**
   * Tests that a sheet is deleted from the server when the 'delete sheet' button is clicked
   * 
   * Owner: Amani
   */
  test("calls deletingSheet function when 'Delete Sheet' button is clicked", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce(mockFetchResponse({
      success: true,
    }));

    document.cookie = "testuser:testpassword";

    render(<HomePage />);

    jest.spyOn(global, "fetch").mockResolvedValueOnce(mockFetchResponse({
      success: true,
      value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
    }));

    await waitFor(() => {
      expect(screen.getByText("test_sheet")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Delete Sheet"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/deleteSheet",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk", // Base64 encoded 'testuser:testpassword'
          },
          body: JSON.stringify({
            publisher: "test_publisher",
            sheet: "test_sheet",
            id: null,
            payload: null,
          }),
        }
      );
    });
  });
});
