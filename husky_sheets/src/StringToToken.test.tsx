import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StringToToken from "./ParsingUtils/StringToToken.tsx";
import { MemoryRouter } from "react-router-dom";

/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('StringToToken', () => {

    test('should handle empty input string', () => {
      const inputString = '';
      const expectedTokens = [];

      const tokens = StringToToken(inputString);

      expect(tokens).toEqual(expectedTokens);
    });

    test('should parse string into tokens with valid operators', () => {
      const inputString = '=((1+2)*(5>6))/(9|2)+(1=1)+(5<>5)-(8&7)+(0<5)';
      const expectedTokens = [  '=',  '(',  '(',  '1',  '+',  '2',  ')',
          '*',  '(',  '5',  '>',  '6',  ')',  ')',  '/',  '(',  '9',  '|', 
           '2',  ')',  '+',  '(',  '1',  '=',  '1',  ')',  '+',  '(',  '5', 
            '<', '>', '5',  ')',  '-',  '(',  '8',  '&',  '7',  ')',  '+', 
             '(',  '0',  '<',  '5',  ')'];

  
      const tokens = StringToToken(inputString);
  
      expect(tokens).toEqual(expectedTokens);
    });

    test('should handle function input', () => {
        const inputString = '=SUM(1,2)+CONCAT(1,2)+MIN(1,2)+MAX(1,2)+AVG(1,2)+IF(1,2)+DEBUG(1)';
        const expectedTokens = [ '=',  'SUM',  '(',  '1',  ',',  '2',  ')',  '+',
            'CONCAT',  '(',  '1',  ',',  '2',  ')',  '+',  'MIN', '(',  '1', 
             ',',  '2',  ')',  '+',  'MAX',  '(',  '1',  ',',  '2',  ')',
               '+',  'AVG',  '(',  '1',  ',',  '2',  ')',  '+',  'IF', 
                '(',  '1',  ',',  '2',  ')', '+', 'DEBUG', '(', '1', ')'];

    
        const tokens = StringToToken(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });
      
      test('should not handle invalid operators', () => {
        const inputString = '^(1+%0.05)$/@1+!';
        const expectedTokens = [ '(',  '1',  '+',  '0.05',  ')',  '/',  '1',  '+'];
    
        const tokens = StringToToken(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });

      test('should still handle invalid functions', () => {
        const inputString = 'PLAY(1+2)+GRAB(87)';
        const expectedTokens = [ 'PLAY', '(',  '1',  '+',  '2',  ')',  '+', 'GRAB', '(', '87', ')'];
    
        const tokens = StringToToken(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });

      test('should not handle string inputs', () => {
        const inputString = '1+2-q+CONCAT(1,animal)';
        const expectedTokens = [ '1',  '+',  '2',  '-', 'q',  '+',  'CONCAT', '(', '1', ',', 'animal', ')'];
    
        const tokens = StringToToken(inputString);
    
        expect(tokens).toEqual(expectedTokens);
      });
  

  });