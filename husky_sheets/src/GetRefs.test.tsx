import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OperatorHandling from "./ParsingUtils/OperatorHandling.tsx";
import { MemoryRouter } from "react-router-dom";
import GetRefs from "./ParsingUtils/GetRefs.tsx";
/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('GetRef', () => {

    test('formulas with cell refs', () => {
        const inputString = "=A1+(B2/4)"
        const ans = GetRefs(inputString);
        const expectedAns = ['=', 'A1', '+', '(', 'B2', '/','4',')']
        expect(expectedAns).toEqual(ans);
    });

    test('formulas with cell refs in functions', () => {
        const inputString = "=A1+SUM(B2, 4)"
        const ans = GetRefs(inputString);
        const expectedAns = ['=', 'A1', '+', 'SUM', '(','B2',',', '4', ')']
        expect(expectedAns).toEqual(ans);
    });

    test('formulas with no cell refs in functions', () => {
        const inputString = "=1+SUM(2, 4)"
        const ans = GetRefs(inputString);
        const expectedAns = ['=', '1', '+', 'SUM', '(','2',',', '4', ')']
        expect(expectedAns).toEqual(ans);
    });
});