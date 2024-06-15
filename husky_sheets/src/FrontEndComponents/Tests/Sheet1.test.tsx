import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sheet from "./Sheet";
import { MemoryRouter } from "react-router-dom";

describe("Sheet Component", () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<MemoryRouter>{ui}</MemoryRouter>);
    };

    test("renders save sheet button", () => {
        renderWithRouter(<Sheet />);
        const saveSheetButton = screen.getByTestId("save sheet");
        expect(saveSheetButton).toBeInTheDocument();
    });

    test("renders get updates button", () => {
        renderWithRouter(<Sheet />);
        const getUpdatesButton = screen.getByTestId("get-updates-button");
        expect(getUpdatesButton).toBeInTheDocument();
    });

    test("calls saveSheetUpdates function when save sheet button is clicked", () => {
        const saveSheetUpdatesMock = jest.fn();
        jest.mock("./Sheet", () => ({
            ...jest.requireActual("./Sheet"),
            saveSheetUpdates: saveSheetUpdatesMock,
        }));

        renderWithRouter(<Sheet />);
        const saveSheetButton = screen.getByTestId("save sheet");
        fireEvent.click(saveSheetButton);
        expect(saveSheetUpdatesMock).toHaveBeenCalled();
    });

    test("calls getUpdates function when get updates button is clicked", () => {
        const getUpdatesMock = jest.fn();
        jest.mock("./Sheet", () => ({
            ...jest.requireActual("./Sheet"),
            getUpdates: getUpdatesMock,
        }));

        renderWithRouter(<Sheet />);
        const getUpdatesButton = screen.getByTestId("get-updates-button");
        fireEvent.click(getUpdatesButton);
        expect(getUpdatesMock).toHaveBeenCalled();
    });

    test("renders grid component", () => {
        renderWithRouter(<Sheet />);
        const gridComponent = screen.getByRole("grid");
        expect(gridComponent).toBeInTheDocument();
    });

    test("renders correct number of columns in grid", () => {
        renderWithRouter(<Sheet />);
        const gridColumns = screen.getAllByRole("columnheader");
        expect(gridColumns).toHaveLength(101);
    });

    test("renders correct number of rows in grid", () => {
        renderWithRouter(<Sheet />);
        const gridRows = screen.getAllByRole("row");
        expect(gridRows).toHaveLength(100);
    });
});