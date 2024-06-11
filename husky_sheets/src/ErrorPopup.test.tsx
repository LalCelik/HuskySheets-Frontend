import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPopup from './ErrorPopup';

/**
 * Tests the UI elements in the ErrorPopup.tsx file to ensure that everything that is
 * expected to be displayed, is displayed on the screen
 * 
 * Owner: Amani
 */
describe('ErrorPopup', () => {

  /**
  * Tests whether the ErrorPopup component properly renders
  * 
  * Owner: Amani
  */
  test('renders without crashing', () => {
    render(<ErrorPopup />);
  });

  /**
   * Tests whether the popup is closed when the user clicks outside the button screen
   * 
   * Owner: Amani
   */
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
