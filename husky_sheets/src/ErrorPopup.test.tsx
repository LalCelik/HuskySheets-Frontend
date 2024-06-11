import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPopup from './ErrorPopup';

describe('ErrorPopup', () => {
  test('renders without crashing', () => {
    render(<ErrorPopup />);
  });

  test('popup is initially closed', () => {
    render(<ErrorPopup />);
    expect(screen.queryByText("The information that you have entered is invalid. Please try again")).not.toBeInTheDocument();
  });

//   test('opens the popup when the openPopup function is called', () => {
//     const { getByText } = render(<ErrorPopup />);
    
//     // Find the popup toggle button or element that will be used to open the popup
//     // Since the current implementation does not provide an external trigger, 
//     // we'll simulate the function call directly through the internal state
//     const toggleButton = screen.getByText("The information that you have entered is invalid. Please try again");
//     fireEvent.click(toggleButton);

//     expect(screen.getByText("The information that you have entered is invalid. Please try again")).toBeInTheDocument();
//   });

//   test('closes the popup when the closeOnDocumentClick is triggered', () => {
//     const { queryByText } = render(<ErrorPopup />);
    
//     // Find the popup toggle button or element that will be used to open the popup
//     const toggleButton = screen.getByText("The information that you have entered is invalid. Please try again");
//     fireEvent.click(toggleButton); // Open the popup

//     fireEvent.click(document); // Simulate clicking outside the popup to close it

//     expect(screen.queryByText("The information that you have entered is invalid. Please try again")).not.toBeInTheDocument();
//   });
});
