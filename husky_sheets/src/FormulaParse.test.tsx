import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OperatorHandling from "./ParsingUtils/OperatorHandling.tsx";
import { MemoryRouter } from "react-router-dom";
import FormulaParse from "./ParsingUtils/FormulaParse.tsx";
/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('GetRef', () => {

    test('simple operation with no parentheses - plus', () => {
        const inputString = '=5+2';
        const ans = FormulaParse(inputString);
        const expectedAns = 7;
        expect(expectedAns).toEqual(ans.value);
      });
  
      test('simple operation with no parentheses - minus', () => {
          const inputString = '=5-2';
          const ans = FormulaParse(inputString);
        const expectedAns = 3;
        expect(expectedAns).toEqual(ans.value);
        });
  
      test('simple operation with no parentheses - multiply', () => {
          const inputString = '=5*2';
          const ans = FormulaParse(inputString);
        const expectedAns = 10;
        expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with no parentheses - divide', () => {
          const inputString = '=5/2';
          const ans = FormulaParse(inputString);
        const expectedAns = 2.5;
        expect(expectedAns).toEqual(ans.value);
        });
  
  
        test('simple operation with no parentheses - less than', () => {
          const inputString = '=1<2';
          const ans = FormulaParse(inputString);
        const expectedAns = 1;
        expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with no parentheses - more than', () => {
          const inputString = '=1>2';
          const ans = FormulaParse(inputString);
        const expectedAns = 0;
        expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with no parentheses - equal', () => {
          const inputString = '=1=2';
          const ans = FormulaParse(inputString);
        const expectedAns = 0;
        expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with no parentheses - and', () => {
          const inputString = '=1&2';
          const ans = FormulaParse(inputString);
        const expectedAns = 1;
        expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with no parentheses - or', () => {
          const inputString = '=1|2';
          const ans = FormulaParse(inputString);
          const expectedAns = 1;
          expect(expectedAns).toEqual(ans.value);
        });
  
        test('simple operation with parentheses - plus', () => {
          const inputString = '=(5+2)';
          const ans = FormulaParse(inputString);
          const expectedAns = 7;
          expect(expectedAns).toEqual(ans.value);
        });
    
        test('simple operation with parentheses - minus', () => {
            const inputString = '=(5-2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 3;
            expect(expectedAns).toEqual(ans.value);
          });
    
        test('simple operation with parentheses - multiply', () => {
            const inputString = '=(5*2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 10;
            expect(expectedAns).toEqual(ans.value);
          });
    
          test('simple operation with parentheses - divide', () => {
            const inputString = '=(5/2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 2.5;
            expect(expectedAns).toEqual(ans.value);
          });
    
    
          test('simple operation with parentheses - less than', () => {
            const inputString = '=(1<2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 1;
            expect(expectedAns).toEqual(ans.value);
          });
    
          test('simple operation with parentheses - more than', () => {
            const inputString = '=(1>2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 0;
            expect(expectedAns).toEqual(ans.value);
          });
    
          test('simple operation with parentheses - equal', () => {
            const inputString = '=(1=2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 0;
            expect(expectedAns).toEqual(ans.value);
          });
    
          test('simple operation with parentheses - and', () => {
            const inputString = '=(1&2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 1;
            expect(expectedAns).toEqual(ans.value);
          });
    
          test('simple operation with parentheses - or', () => {
            const inputString = '=(1|2)';
            const ans = FormulaParse(inputString);
            const expectedAns = 1;
            expect(expectedAns).toEqual(ans.value);
          });
  
          test('compound operation with parentheses - binary (ex1)', () => {
              const inputString = '=(5+2)*3';
              const ans = FormulaParse(inputString);
              const expectedAns = 21;
              expect(expectedAns).toEqual(ans.value);
            });
        
            test('compound operation with parentheses - binary (ex2)', () => {
                const inputString = '=(5-2)*(5+2)';
                const ans = FormulaParse(inputString);
                const expectedAns = 21;
                expect(expectedAns).toEqual(ans.value);
              });
        
            test('compound operation with parentheses - binary (ex3)', () => {
                const inputString = '=(5*2)/(1+2)';
                const ans = FormulaParse(inputString);
                const expectedAns = 3.33;
                expect(expectedAns).toEqual(ans.value);
              });
        
              test('compound operation with parentheses - binary (ex4)', () => {
                const inputString = '=(1+2)/((8-7)*(9*0.5))';
                const ans = FormulaParse(inputString);
                const expectedAns = 0.66;
                expect(expectedAns).toEqual(ans.value);
              });
        
        
              test('compound operation with parentheses - binary (ex5)', () => {
                const inputString = '=(1<2)|(8-2)';
                const ans = FormulaParse(inputString);
                const expectedAns = 1;
                expect(expectedAns).toEqual(ans.value);
              });
        
              test('compound operation with parentheses - binary (ex6)', () => {
                const inputString = '=(5&2)>0';
                const ans = FormulaParse(inputString);
                const expectedAns = 1;
                expect(expectedAns).toEqual(ans.value);
              });
        
              test('compound operation with parentheses - binary (ex7)', () => {
                const inputString = '=(9-8)<(0|1)';
                const ans = FormulaParse(inputString);
                const expectedAns = 0;
                expect(expectedAns).toEqual(ans.value);
              });
        
              test('compound operation with parentheses - binary (ex8)', () => {
                const inputString = '=(1&2)|(8<5)';
                const ans = FormulaParse(inputString);
                const expectedAns = 1;
                expect(expectedAns).toEqual(ans.value);
              });
        
              test('compound operation with parentheses - binary (ex9)', () => {
                const inputString = '=((1<5)&(8|9))/(7-6)';
                const ans = FormulaParse(inputString);
                const expectedAns = 0;
                expect(expectedAns).toEqual(ans.value);
              });
  
              test('compound operation with parentheses and functions (ex1)', () => {
                  const inputString = '=((5+2)*SUM(1,2))';
                  const ans = FormulaParse(inputString);
                  const expectedAns = 21;
                  expect(expectedAns).toEqual(ans.value);
                });
            
                test('compound operation with parentheses and functions (ex2)', () => {
                    const inputString = '=(MIN(5,4) - MAX(1,2))/(8*7)';
                    const ans = FormulaParse(inputString);
                    const expectedAns = 0.0357;
                    expect(expectedAns).toEqual(ans.value);
                  });
            
                test('compound operation with parentheses and functions (ex3)', () => {
                    const inputString = '=(5*2)/(CONCAT(1,2))';
                    const ans = FormulaParse(inputString);
                    const expectedAns = 0.83;
                    expect(expectedAns).toEqual(ans.value);
                  });
            
                  test('compound operation with parentheses and functions (ex4)', () => {
                    const inputString = '=(AVG(5,10)/(1+2*3))';
                    const ans = FormulaParse(inputString);
                    const expectedAns = 0.833;
                    expect(expectedAns).toEqual(ans.value);
                  });
            
            
                  test('compound operation with parentheses and functions (ex5)', () => {
                    const inputString = '=(1<2)|(SUM(5,6))';
                    const ans = FormulaParse(inputString);
                    const expectedAns = 1;
                    expect(expectedAns).toEqual(ans.value);
                  });
            
                  /**
                  test('compound operation with parentheses and functions (ex6)', () => {
                    const inputString = '=(9-8)/(IF(1,2))';
                    const ans = FormulaParse(inputString);
                    const expectedAns = 0;
                    expect(expectedAns).toEqual(ans);
                  });
                  
                  test('compound operation with parentheses and functions (ex7)', () => {
                    const inputString = '=SUM((1+2), 5, 6)';
                    const tokens = StringToToken(inputString)
                    const ast = ConvertToAST(tokens);
                    const expectedAns = 5;
              
                    expect(expectedAns).toEqual(ast);
                  });
                  */
});