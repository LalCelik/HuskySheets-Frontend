import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Registration from "./Registration";
import { MemoryRouter } from "react-router-dom";

/*
A mock button to act as the MyButton component
*/
jest.mock("./MyButton", () => ({ to, text }: { to: string; text: string }) => (
  <button>{text}</button>
));

/*
Tests the UI elements in the App.tsx file to ensure that everything that is expected
to be displayed, is displayed on the screen. Also ensures that all buttons work properly

Owner: Amani
*/
describe("Registration Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test("renders Account Registration Page header", () => {
    renderWithRouter(<Registration />);
    const headerElement = screen.getByText(/Account Registration Page/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders username input field", () => {
    renderWithRouter(<Registration />);
    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    expect(usernameInput).toBeInTheDocument();
  });

  test("renders password input field", () => {
    renderWithRouter(<Registration />);
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders Create Account button", () => {
    renderWithRouter(<Registration />);
    const createAccountButton = screen.getByRole("button", {
      name: /Create Account/i,
    });
    expect(createAccountButton).toBeInTheDocument();
  });

  test("renders Back to login page button", () => {
    renderWithRouter(<Registration />);
    const backButton = screen.getByText(/Back to login page/i);
    expect(backButton).toBeInTheDocument();
  });

  test("updates username input value on change", () => {
    renderWithRouter(<Registration />);
    const usernameInput = screen.getByPlaceholderText(
      /Please enter a username/i
    );
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput).toHaveValue("testuser");
  });

  test("updates password input value on change", () => {
    renderWithRouter(<Registration />);
    const passwordInput = screen.getByPlaceholderText(
      /Please enter a password/i
    );
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });

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
