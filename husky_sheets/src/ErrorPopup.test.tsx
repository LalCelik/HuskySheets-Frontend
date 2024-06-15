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

  /**
   * Tests if the popup with its data is displayed correctly (and closed) with
   * the user's actions
   * 
   * Owner: Amani
   */
  test("toggles the popup when the button is clicked", () => {
    const { getByText, queryByText } = render(<ErrorPopup />);
    
    // Check that the popup is initially not visible
    expect(screen.queryByText("The information that you have entered is invalid. Please try again")).not.toBeInTheDocument();
    
    // Find the button and click it
    const button = screen.getByText("Open Popup");
    fireEvent.click(button);
    
    // Check that the popup is now visible
    expect(screen.getByText("The information that you have entered is invalid. Please try again")).toBeInTheDocument();
    
    // Click the button again to close the popup
    fireEvent.click(button);
    
    // Check that the popup is no longer visible
    expect(screen.queryByText("The information that you have entered is invalid. Please try again")).not.toBeInTheDocument();

  });
});
