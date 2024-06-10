import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RefToNumberFormula from "./ParsingUtils/RefToNumberFormula.tsx";
import { MemoryRouter } from "react-router-dom";

/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('RefToNumberFormula', () => {

    const cellNamePattern = /^[A-Z]+[0-9]+$/;
    const dels = ["(", "+", ",", "-", "*", "/", ")", "=", ">", "<",
        "<>", "&", ":", "|", "IF", "SUM", "MIN", "MAX",
         "AVG", "CONCAT", "DEBUG"];
    const data = [[0, 1, 2, 4], [3, 4, 5, 8], [6, 7, 8, 5]];

    test('should handle empty input string', () => {
      const inputString = '';
      const expectedTokens = "";

      const tokens = RefToNumberFormula(cellNamePattern, dels, data, inputString);

      expect(tokens).toEqual(expectedTokens);
    });

    test('should parse string into tokens with valid operators', () => {
      const inputString = '=((A1+A2)*(B1>B0))/(C2|C1)';
      const expectedTokens = "=((4+7)*(5>2))/(5|8)";

  
      const tokens = RefToNumberFormula(cellNamePattern, dels, data, inputString);
  
      expect(tokens).toEqual(expectedTokens);
    });

    test('should handle function input', () => {
        const inputString = '=SUM(A1,A2)+CONCAT(B1,B2)+C0/C2';
        const expectedTokens = '=SUM(4,7)+CONCAT(5,8)+4/5';

    
        const tokens = RefToNumberFormula(cellNamePattern, dels, data, inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });

  });