import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, MemoryRouter, Router } from "react-router-dom";
import App from "./App";


/**
 * A mock button to act as the MyButton component
 * 
 * Owner: Amani
 */
jest.mock("./MyButton", () => ({ to, text }: { to: string; text: string }) => (
  <button>{text}</button>
));

// Mock the useNavigate hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));


// const mockedNavigate = require("react-router-dom").useNavigate();

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

/**
 * Tests the UI elements in the App.tsx file to ensure that everything that is
 * expected to be displayed, is displayed on the screen
 * 
 * Owner: Amani
 */
describe("App component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };


  /**
   * Tests whether or not the header of the login page is present
   * 
   * Owner: Amani
   */
  test("renders the welcome header", () => {
    renderWithRouter(<App />);
    const headerElement = screen.getByText(/Welcome to the login page/i);
    expect(headerElement).toBeInTheDocument();
  });


  /**
   * Tests whether or not the input field for a password is present
   * 
   * Owner: Amani
   */
  test("renders username input field", () => {
    renderWithRouter(<App />);
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    expect(usernameInput).toBeInTheDocument();
  });


  /**
   * Tests whether or not the input field for a password is present
   * 
   * Owner: Amani
   */
  test("renders password input field", () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();
  });

 
  /**
   * Tests whether or not a button to take a user to the account registration
   * page is present
   * 
   * Owner: Amani
   */
  test('renders "Make an account" button', () => {
    renderWithRouter(<App />);
    const makeAccountButton = screen.getByText(/Make an account/i);
    expect(makeAccountButton).toBeInTheDocument();
  });


  /**
   * Tests whether or not a button to take a user to the home page is present
   * 
   * Owner: Amani
   */
  test('renders "Login" button', () => {
    renderWithRouter(<App />);
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });


  // Test for onChange handler for username
  test("updates the username state on change", () => {
    renderWithRouter(<App />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");

    fireEvent.change(usernameInput, { target: { value: "newusername" } });

    expect((usernameInput as HTMLInputElement).value).toBe("newusername");
  });

  // Test for onChange handler for password
  test("updates the password state on change", () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(passwordInput, { target: { value: "newpassword" } });

    expect((passwordInput as HTMLInputElement).value).toBe("newpassword");
  });

  test("sets the cookie and navigates on login", () => {
    renderWithRouter(<App />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check the cookie value
    expect(document.cookie).toBe("testuser%3Apassword123");
    // Check that navigate was called with the correct argument
    expect(mockedNavigate).toHaveBeenCalledWith("/home_page");
  });

});
