import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";

/*
Tests the UI elements in the App.tsx file to ensure that everything that is expected
to be displayed, is displayed on the screen. Also ensures that all buttons work properly

Owner: Amani
*/
describe("HomePage Component", () => {
  test("renders HomePage component", () => {
    render(<HomePage />);
    expect(screen.getByText("HuskSheets Homepage")).toBeInTheDocument();
  });

  test("renders Create a new sheet button", () => {
    render(<HomePage />);
    expect(screen.getByText("Create a new sheet")).toBeInTheDocument();
  });

  test("opens and closes popup on button click", () => {
    render(<HomePage />);
    const openButton = screen.getByText("Create a new sheet");

    // Open the popup
    fireEvent.click(openButton);
    expect(
      screen.getByText(
        "Please give your new sheet a name, then press open sheet"
      )
    ).toBeInTheDocument();

    // Close the popup
    const closeButton = screen.getByText("Create a new sheet");
    fireEvent.click(closeButton);
    expect(
      screen.queryByText(
        "Please give your new sheet a name, then press open sheet"
      )
    ).not.toBeInTheDocument();
  });

  test("renders input field inside popup", () => {
    render(<HomePage />);
    const openButton = screen.getByText("Create a new sheet");
    fireEvent.click(openButton);

    expect(screen.getByPlaceholderText("Sheet Name")).toBeInTheDocument();
  });

  test("allows text input in sheet name field", () => {
    render(<HomePage />);
    const openButton = screen.getByText("Create a new sheet");
    fireEvent.click(openButton);

    const inputField = screen.getByPlaceholderText(
      "Sheet Name"
    ) as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: "My New Sheet" } });
    expect(inputField.value).toBe("My New Sheet");
  });

  test("renders Open Sheet button inside popup", () => {
    render(<HomePage />);
    const openButton = screen.getByText("Create a new sheet");
    fireEvent.click(openButton);

    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });
});
