import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OperatorHandling from "../ParsingUtils/OperatorHandling.tsx";
import { MemoryRouter } from "react-router-dom";
import FunctionHandling from "../ParsingUtils/FunctionHandling.tsx";
import NumberVal from "../ParsingUtils/NumberVal.tsx";
/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('FunctionHandling', () => {

    test('sum with valid input', () => {
        const ans = FunctionHandling('SUM', [1, 2, 3]);
        const expectedAns = new NumberVal(6);
        expect(expectedAns).toEqual(ans);
    });

    test('sum with invalid input', () => {
        const ans = FunctionHandling('SUM', [1, 'q', 3]);
        const expectedAns = new NumberVal(NaN);
        expect(expectedAns).toEqual(ans);
    });

    test('min with invalid input', () => {
        const ans = FunctionHandling('MIN', [1, 2, 3]);
        const expectedAns = new NumberVal(1);
        expect(expectedAns).toEqual(ans);
    });

    test('max with invalid input', () => {
        const ans = FunctionHandling('MAX', [1, 2, 3]);
        const expectedAns = new NumberVal(3);
        expect(expectedAns).toEqual(ans);
    });

    test('max with invalid input', () => {
        const ans = FunctionHandling('MAX', [1, 'q', 3]);
        const expectedAns = new NumberVal(3);
        expect(expectedAns).toEqual(ans);
    });
    

    test('avg with valid input', () => {
        const ans = FunctionHandling('AVG', [1, 2, 3]);
        const expectedAns = new NumberVal(2);
        expect(expectedAns).toEqual(ans);
    });

    test('avg with invalid input', () => {
        const ans = FunctionHandling('AVG', [1, 'q', 3]);
        const expectedAns = new NumberVal(NaN);
        expect(expectedAns).toEqual(ans);
    });
    
    test('avg with no input', () => {
        const ans = FunctionHandling('AVG', []);
        const expectedAns = new NumberVal(0);
        expect(expectedAns).toEqual(ans);
    });

    test('concat with valid input', () => {
        const ans = FunctionHandling('CONCAT', [1, 'q', 3]);
        const expectedAns = new NumberVal('1q3');
        expect(expectedAns).toEqual(ans);
    });



});