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


  test("list of updates is added to the grid's data display", () => {
    
  });

  test("if equation is detected, replace the cell value with the calculated", () => {

  });

  test("if cell contains COPY, changes both ref and current cell", () => {
    
  });

});