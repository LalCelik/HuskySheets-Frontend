import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OperatorHandling from "../ParsingUtils/OperatorHandling.tsx";
import { MemoryRouter } from "react-router-dom";
import NumberVal from "../ParsingUtils/NumberVal.tsx";
/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('OperatorHandling', () => {

    test('addition', () => {
        const ans = OperatorHandling(5, 2, '+');
        const expectedAns = new NumberVal(7);
    
        expect(expectedAns).toEqual(ans);
    });

    test('addition with invalid inputs', () => {
        const ans = OperatorHandling('q', 2, '+');
        const expectedAns = new NumberVal(NaN);
    
        expect(expectedAns).toEqual(ans);
    });

    test('subtraction', () => {
        const ans = OperatorHandling(5, 2, '-');
        const expectedAns = new NumberVal(3);
    
        expect(expectedAns).toEqual(ans);
      });

      test('subtraction with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '-');
        const expectedAns = new NumberVal(NaN);
    
        expect(expectedAns).toEqual(ans);
      });

      test('multiplication', () => {
        const ans = OperatorHandling(5, 2, '*');
        const expectedAns = new NumberVal(10);
    
        expect(expectedAns).toEqual(ans);
      });

      test('multiplication with invalid inputs', () => {
        const ans = OperatorHandling(5, 'a', '*');
        const expectedAns = new NumberVal(NaN);
    
        expect(expectedAns).toEqual(ans);
      });

      test('division', () => {
        const ans = OperatorHandling(5, 2, '/');
        const expectedAns = new NumberVal(2.5);
    
        expect(expectedAns).toEqual(ans);
      });

      test('division with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '/');
        const expectedAns = new NumberVal(NaN);
    
        expect(expectedAns).toEqual(ans);
      });

      test('less than', () => {
        const ans = OperatorHandling(5, 2, '<');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('less than reversed', () => {
        const ans = OperatorHandling(2, 5, '<');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('less than with invalid input', () => {
        const ans = OperatorHandling(5, 'q', '<');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('more than', () => {
        const ans = OperatorHandling(5, 2, '>');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('more than reversed', () => {
        const ans = OperatorHandling(2, 5, '>');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('more than with invalid input', () => {
        const ans = OperatorHandling(5, 'q', '>');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('equal to with unequal inputs', () => {
        const ans = OperatorHandling(5, 2, '=');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('equal to with equal inputs', () => {
        const ans = OperatorHandling(5, 5, '=');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('equal to with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '=');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('not equal with unequal inputs', () => {
        const ans = OperatorHandling(5, 2, '<>');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('not equal to with equal inputs', () => {
        const ans = OperatorHandling(5, 5, '=');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('not equal with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '<>');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('and with two nonzero-value inputs', () => {
        const ans = OperatorHandling(5, 2, '&');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('and with two zero-value inputs', () => {
        const ans = OperatorHandling(0, 0, '&');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('and with one nonzero-value inputs', () => {
        const ans = OperatorHandling(0, 2, '&');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('and with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '&');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('or with two one-value inputs', () => {
        const ans = OperatorHandling(1, 1, '|');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('or with one one-value inputs', () => {
        const ans = OperatorHandling(5, 1, '|');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

      test('or with no one-value inputs', () => {
        const ans = OperatorHandling(5, 2, '|');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });


      test('or with invalid inputs', () => {
        const ans = OperatorHandling(5, 'q', '|');
        const expectedAns = new NumberVal(0);
    
        expect(expectedAns).toEqual(ans);
      });

  });