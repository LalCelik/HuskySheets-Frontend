// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { useNavigate } from 'react-router-dom';
// import HomePage from './HomePage';

// // Mock the useNavigate hook
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

// // Mock fetch function
// global.fetch = jest.fn() as jest.Mock;

// describe('HomePage', () => {
//   let navigate;

//   beforeEach(() => {
//     navigate = useNavigate();
//     (fetch as jest.Mock).mockClear();
//     navigate.mockClear();
//     document.cookie = 'username:password';
//   });

//   test('redirects to "/" when response is not ok', async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

//     render(<HomePage />);

//     await waitFor(() => {
//       expect(navigate).toHaveBeenCalledWith('/');
//     });
//   });

//   test('fetches and sets sheets correctly', async () => {
//     const mockData = {
//       value: [
//         { publisher: 'Publisher1' },
//         { publisher: 'Publisher2' },
//       ],
//     };

//     const mockSheetsData = {
//       success: true,
//       value: [
//         { sheet: 'Sheet1', publisher: 'Publisher1' },
//         { sheet: 'Sheet2', publisher: 'Publisher2' },
//       ],
//     };

//     (fetch as jest.Mock)
//       .mockResolvedValueOnce({ ok: true, json: async () => mockData }) // First fetch call
//       .mockResolvedValueOnce({ ok: true, json: async () => mockSheetsData }) // Second fetch call
//       .mockResolvedValueOnce({ ok: true, json: async () => mockSheetsData }); // Third fetch call

//     render(<HomePage />);

//     await waitFor(() => {
//       const sheetNames = screen.getAllByText(/Sheet[12]/);
//       expect(sheetNames.length).toBe(2);
//       expect(screen.getByText('Sheet1')).toBeInTheDocument();
//       expect(screen.getByText('Sheet2')).toBeInTheDocument();
//     });
//   });

//   test('handles fetch sheets error', async () => {
//     (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

//     render(<HomePage />);

//     await waitFor(() => {
//       expect(console.error).toHaveBeenCalledWith('Error fetching sheets:', expect.any(Error));
//     });

//     consoleErrorSpy.mockRestore();
//   });
// });

// import React from "react";
// import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import HomePage from "./HomePage";

// // Mock react-router-dom useNavigate hook
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"), // use actual react-router-dom for other functions
//   useNavigate: () => jest.fn(),
// }));

// describe("HomePage", () => {
//   beforeEach(() => {
//     // Clear cookies before each test
//     Object.defineProperty(document, "cookie", {
//       writable: true,
//       value: "",
//     });
//   });

//   // test("redirects to '/' when user is not authenticated", () => {
//   //   render(<HomePage />);
//   //   expect(screen.useNavigate).toHaveBeenCalledWith("/");
//   // });

//   test("displays sheet table when user is authenticated", async () => {
//     // Mock response for fetch call to getPublishers
//     // Mock response for fetch call to getPublishers and getSheets
//     jest
//       .spyOn(global, "fetch")
//       .mockResolvedValueOnce({
//         json: async () => ({
//           value: [{ publisher: "test_publisher" }],
//         }),
//       })
//       .mockResolvedValueOnce({
//         json: async () => ({
//           success: true,
//           value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
//         }),
//       });
//   });

//   // Set mock cookies for authentication
//   document.cookie = "testuser:testpassword";

//   render(<HomePage />);

//   // Wait for table to be rendered
//   await waitFor(() => {
//     expect(screen.getByText("test_sheet")).toBeInTheDocument();
//     // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
//     expect(screen.getByText("test_publisher")).toBeInTheDocument();
//   });
// });

// test("opens popup when 'Create a new sheet' button is clicked", async () => {
//   // Set mock cookies for authentication
//   document.cookie = "testuser:testpassword";

//   render(<HomePage />);

//   fireEvent.click(screen.getByText("Create a new sheet"));

//   // Check if popup is opened
//   expect(
//     screen.getByText("Please give your new sheet a name")
//   ).toBeInTheDocument();
// });

// test("calls creatingSheet function when 'Open Sheet' button is clicked in popup", async () => {
//   // Mock response for fetch call to createSheet
//   jest.spyOn(global, "fetch").mockResolvedValueOnce({
//     json: async () => ({
//       success: true,
//     }),
//   });

//   // Set mock cookies for authentication
//   document.cookie = "testuser:testpassword";

//   render(<HomePage />);

//   fireEvent.click(screen.getByText("Create a new sheet"));

//   fireEvent.change(screen.getByPlaceholderText("Sheet Name"), {
//     target: { value: "test_sheet" },
//   });

//   fireEvent.click(screen.getByText("Open Sheet"));

//   // Wait for creatingSheet to be called
//   await waitFor(() => {
//     expect(global.fetch).toHaveBeenCalledWith(
//       "http://localhost:8080/api/v1/createSheet",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk", // Base64 encoded 'testuser:testpassword'
//         },
//         body: JSON.stringify({
//           publisher: "testuser",
//           sheet: "test_sheet",
//           id: null,
//           payload: null,
//         }),
//       }
//     );
//   });
// });

// test("calls deletingSheet function when 'Delete Sheet' button is clicked", async () => {
//   // Mock response for fetch call to deleteSheet
//   jest.spyOn(global, "fetch").mockResolvedValueOnce({
//     json: async () => ({
//       success: true,
//     }),
//   });

//   // Set mock cookies for authentication
//   document.cookie = "testuser:testpassword";

//   render(<HomePage />);

//   // Mock the sheet table data
//   jest.spyOn(global, "fetch").mockResolvedValueOnce({
//     json: async () => ({
//       success: true,
//       value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
//     }),
//   });

//   await waitFor(() => {
//     expect(screen.getByText("test_sheet")).toBeInTheDocument();
//   });

//   fireEvent.click(screen.getByText("Delete Sheet"));

//   // Wait for deletingSheet to be called
//   await waitFor(() => {
//     expect(global.fetch).toHaveBeenCalledWith(
//       "http://localhost:8080/api/v1/deleteSheet",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk", // Base64 encoded 'testuser:testpassword'
//         },
//         body: JSON.stringify({
//           publisher: "test_publisher",
//           sheet: "test_sheet",
//           id: null,
//           payload: null,
//         }),
//       }
//     );
//   });
// });


import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";

// Mock react-router-dom useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual react-router-dom for other functions
  useNavigate: () => jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    // Clear cookies before each test
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  // test("redirects to '/' when user is not authenticated", () => {
  //   render(<HomePage />);
  //   expect(screen.useNavigate).toHaveBeenCalledWith("/");
  // });

  test("displays sheet table when user is authenticated", async () => {
    // Mock response for fetch call to getPublishers
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        json: async () => ({
          value: [{ publisher: "test_publisher" }],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
        }),
      });

    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(<HomePage />);

    // Wait for table to be rendered
    await waitFor(() => {
      expect(screen.getByText("test_sheet")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("test_publisher")).toBeInTheDocument();
    });
  });

  test("opens popup when 'Create a new sheet' button is clicked", async () => {
    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(<HomePage />);

    fireEvent.click(screen.getByText("Create a new sheet"));

    // Check if popup is opened
    expect(
      screen.getByText("Please give your new sheet a name")
    ).toBeInTheDocument();
  });

  test("calls creatingSheet function when 'Open Sheet' button is clicked in popup", async () => {
    // Mock response for fetch call to createSheet
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        success: true,
      }),
    });

    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(<HomePage />);

    fireEvent.click(screen.getByText("Create a new sheet"));

    fireEvent.change(screen.getByPlaceholderText("Sheet Name"), {
      target: { value: "test_sheet" },
    });

    fireEvent.click(screen.getByText("Open Sheet"));

    // Wait for creatingSheet to be called
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

  test("calls deletingSheet function when 'Delete Sheet' button is clicked", async () => {
    // Mock response for fetch call to deleteSheet
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        success: true,
      }),
    });

    // Set mock cookies for authentication
    document.cookie = "testuser:testpassword";

    render(<HomePage />);

    // Mock the sheet table data
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        success: true,
        value: [{ sheet: "test_sheet", publisher: "test_publisher" }],
      }),
    });

    await waitFor(() => {
      expect(screen.getByText("test_sheet")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Delete Sheet"));

    // Wait for deletingSheet to be called
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
