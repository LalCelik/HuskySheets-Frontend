import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

/*
A mock button to act as the MyButton component
*/

jest.mock('./MyButton', () => ({ to, text }: { to: string; text: string }) => (
  <button>{text}</button>
));


/*
Tests the UI elements in the App.tsx file to ensure that everything that is expected
to be displayed, is displayed on the screen

Owner: Amani
*/
describe('App component', () => {
  test('renders the welcome header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Welcome to the login page/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders username input field', () => {
    render(<App />);
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('renders password input field', () => {
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders "Make an account" button', () => {
    render(<App />);
    const makeAccountButton = screen.getByText(/Make an account/i);
    expect(makeAccountButton).toBeInTheDocument();
  });

  test('renders "Login" button', () => {
    render(<App />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
