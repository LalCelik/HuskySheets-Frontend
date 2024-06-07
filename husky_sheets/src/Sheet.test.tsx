import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import test from "node:test";
import Sheet from "./Sheet.tsx"

/**
// Mock the Grid constructor
jest.mock('./grid', () => {
    return jest.fn().mockImplementation(() => ({
      container: document.createElement('div'),
    }));
  });


 
describe('Sheet Tests', () => {
    // Write your test cases using the test function
    test('server populates grid correctly', () => {
        let container;
        const g = Sheet();
        container = document.createElement('div');
        container.appendChild(g);

        const table = document.getElementById("gridContainer")?.querySelector('data');
        const rowIndex = 0; 
        const columnIndex = 1; 
    
        const cell = table[rowIndex][columnIndex];

        const cellValue = cell.textContent.trim();

        const expectedValue = '0'; 

        expect(cellValue).toBe(expectedValue);
    });

    test('server populates grid correctly', () => {
        let container;
        const g = Sheet();
        container = document.createElement('div');
        container.appendChild(g);

        const table = document.getElementById("gridContainer")?.querySelector('data');
        const rowIndex = 1; 
        const columnIndex = 1; 

        const cell = table[rowIndex][columnIndex];

        const cellValue = cell.textContent.trim();

        const expectedValue = 'a'; 
        expect(cellValue).toBe(expectedValue);
    });

    test('server populates grid correctly', () => {
        let container;
        const g = Sheet();
        container = document.createElement('div');
        container.appendChild(g);

        const table = document.getElementById("gridContainer")?.querySelector('data');
        const rowIndex = 2; 
        const columnIndex = 2; 
    
        const cell = table[rowIndex][columnIndex];

        const cellValue = cell.textContent.trim();

        const expectedValue = 'f'; 

        expect(cellValue).toBe(expectedValue);
    });




});

**/