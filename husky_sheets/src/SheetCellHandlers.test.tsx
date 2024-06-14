import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Registration from "./Registration";
import { MemoryRouter } from "react-router-dom";
import Sheet from "./Sheet.tsx"

/**
 * Ownership: Ira
 * 
 * Will test the ability of the grid to render the correct features
 */

describe("Sheet Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };


  test("cell blur detected on cells", () => {
    
  });

  test("cell focus detected on cells", () => {

  });

  test("cell focus alters data displayed to the grid", () => {
    
  });


  test("cell blur to correctly pushes to list of updates", () => {
    // line 120
  });

  test("cell value with '=' with just operations/numbers calculated", () => {
    
  });

  test("cell value with '=' that contains 'DEBUG' ", () => {
    
  });

  test("cell value with '=' that contains 'DEBUG' ", () => {
    
  });

  test("cell value with '=' that contains 'COPY' ", () => {
    
  });

  test("cell value with '=' that contains 'COPY' with number input ", () => {
    // changes the cell with COPY
    // changes the second cell copying to 
  });

  test("cell value with '=' that contains 'COPY' with string input ", () => {
    // changes the cell with COPY
    // changes the second cell copying to 
  });

  test("cell value with '=' that contains 'COPY' with invalid input ", () => {
    // changes the cell with COPY
    // changes the second cell copying to 
  });

  test("cell value with '=' that contains invalid expression ", () => {
    
  });

});
