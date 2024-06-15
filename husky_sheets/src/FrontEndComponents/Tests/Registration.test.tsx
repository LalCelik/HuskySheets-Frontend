import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Registration from "./Registration";
import { MemoryRouter } from "react-router-dom";


/**
 * A mock button to act as the MyButton component
 * 
 * Owner: Amani
 */
jest.mock("./MyButton", () => ({ to, text }: { to: string; text: string }) => (
  <button>{text}</button>
));


/**
 * Tests the UI elements in the Registration.tsx file to ensure that everything that is expected
 * to be displayed, is displayed on the screen. Also ensures that all buttons work properly
 * 
 * Owner: Amani
 */
describe("Registration Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  /**
   * Checks if the header element is present
   * 
   * Owner: Amani
   */
  test("renders Account Registration Page header", () => {
    renderWithRouter(<Registration />);
    const headerElement = screen.getByText(/Account Registration Page/i);
    expect(headerElement).toBeInTheDocument();
  });

  /**
   * Checks if the username input field is present
   * 
   * Owner: Amani
   */
  test("renders username input field", () => {
    renderWithRouter(<Registration />);
    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    expect(usernameInput).toBeInTheDocument();
  });

  /**
   * Checks if the password input field is present
   * 
   * Owner: Amani
   */
  test("renders password input field", () => {
    renderWithRouter(<Registration />);
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    expect(passwordInput).toBeInTheDocument();
  });

  /**
   * Checks if the 'create account' button is present
   * 
   * Owner: Amani
   */
  test("renders Create Account button", () => {
    renderWithRouter(<Registration />);
    const createAccountButton = screen.getByRole("button", {
      name: /Create Account/i,
    });
    expect(createAccountButton).toBeInTheDocument();
  });

  /**
   * Checks if the button that leads back to the login page is present
   * 
   * Owner: Amani
   */
  test("renders Back to login page button", () => {
    renderWithRouter(<Registration />);
    const backButton = screen.getByText(/Back to login page/i);
    expect(backButton).toBeInTheDocument();
  });

  /**
   * Checks that data is getting pulled from the input username field once
   * it's been changed
   * 
   * Owner: Amani
   */
  test("updates username input value on change", () => {
    renderWithRouter(<Registration />);
    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput).toHaveValue("testuser");
  });

  /**
   * Checks that data is getting pulled from the input password field onnce
   * it's been changed
   * 
   * Owner: Amani
   */
  test("updates password input value on change", () => {
    renderWithRouter(<Registration />);
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });

  /**
   * Checks that the application knows when a user registration attempt has failed
   * 
   * Owner: Amani
   */
  test("displays error message on failed registration", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ success: false, message: "Registration failed" }),
      })
    ) as jest.Mock;

    renderWithRouter(<Registration />);

    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    const createAccountButton = screen.getByRole("button", {
      name: /Create Account/i,
    });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(createAccountButton);

    const errorMessage = await screen.findByText(/Registration failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  /**
   * Checks that the application knows when a user registration attempt has succeeded
   * 
   * Owner: Amani
   */
  test("navigates to login page on successful registration", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    renderWithRouter(<Registration />);

    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    const createAccountButton = screen.getByRole("button", {
      name: /Create Account/i,
    });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(createAccountButton);
  });
});
