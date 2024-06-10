import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StringToLetterAndNum from "./ParsingUtils/StringToLetterAndNum.tsx";
import { MemoryRouter } from "react-router-dom";

/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('Split Cell Ref to Letter & Number', () => {

    test('should not handle empty input string', () => {
      const inputString = '';
      const expectedTokens = null;

      const tokens = StringToLetterAndNum(inputString);

      expect(tokens).toEqual(expectedTokens);
    });

    test('should properly split short cell refs', () => {
      const inputString = 'A1';
      const expectedTokens = {letter: 'A', numeric: 1};
  
      const tokens = StringToLetterAndNum(inputString);
  
      expect(tokens).toEqual(expectedTokens);
    });

    test('should properly split longer cell refs', () => {
        const inputString = 'ABA222';
        const expectedTokens = {letter: 'ABA', numeric: 222}
    
        const tokens = StringToLetterAndNum(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });
      
      test('should not split a numbers only string', () => {
        const inputString = '11111';
        const expectedTokens = null;
    
        const tokens = StringToLetterAndNum(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });

      test('should split a letter only string', () => {
        const inputString = 'fsdfdf';
        const expectedTokens = null;
    
        const tokens = StringToLetterAndNum(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });

  });