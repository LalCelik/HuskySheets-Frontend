import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConvertToAST from "./ParsingUtils/ConvertToAST.tsx";
import StringToToken from "./ParsingUtils/StringToToken.tsx";
import Operation from "./ParsingUtils/OperVal.tsx"
import NumberVal from "./ParsingUtils/NumberVal.tsx"
import { MemoryRouter } from "react-router-dom";
import OperVal from "./ParsingUtils/OperVal.tsx";
import exp from "constants";

/*
Tests StringToToken and ensures string formulas are properly parsed into valid elements
*/
describe.only('Convert to AST', () => {

    test('simple operation with no parentheses - plus', () => {
      const inputString = '=5+2';
      const tokens = StringToToken(inputString)
      const ast = ConvertToAST(tokens);
      const expectedAns = {"left": {"type": "Number", "value": 5},
       "operator": {"type": "Operator", "value": "+"}, 
       "right": {"type": "Number", "value": 2}, "type": "Operation"};

      expect(expectedAns).toEqual(ast);
    });

    test('simple operation with no parentheses - minus', () => {
        const inputString = '=5-2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns =  {"left": {"type": "Number", "value": 5},
         "operator": {"type": "Operator", "value": "-"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

    test('simple operation with no parentheses - multiply', () => {
        const inputString = '=5*2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 5},
         "operator": {"type": "Operator", "value": "*"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with no parentheses - divide', () => {
        const inputString = '=5/2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 5},
         "operator": {"type": "Operator", "value": "/"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });


      test('simple operation with no parentheses - less than', () => {
        const inputString = '=1<2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns ={"left": {"type": "Number", "value": 1}, 
        "operator": {"type": "Operator", "value": "<"},
         "right": {"type": "Number", "value": 2}, "type": "Operation"};
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with no parentheses - more than', () => {
        const inputString = '=1>2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns =  {"left": {"type": "Number", "value": 1},
         "operator": {"type": "Operator", "value": ">"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with no parentheses - equal', () => {
        const inputString = '=1=2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 1},
         "operator": {"type": "Operator", "value": "="},
          "right": {"type": "Number", "value": 2},
           "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with no parentheses - and', () => {
        const inputString = '=1&2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 1},
         "operator": {"type": "Operator", "value": "&"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with no parentheses - or', () => {
        const inputString = '=1|2';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 1},
         "operator": {"type": "Operator", "value": "|"}, 
         "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });

      test('simple operation with parentheses - plus', () => {
        const inputString = '=(5+2)';
        const tokens = StringToToken(inputString)
        const ast = ConvertToAST(tokens);
        const expectedAns = {"left": {"type": "Number", "value": 5},
         "operator": {"type": "Operator", "value": "+"},
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
  
        expect(expectedAns).toEqual(ast);
      });
  
      test('simple operation with no parentheses - minus', () => {
          const inputString = '=(5-2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 5}, 
          "operator": {"type": "Operator", "value": "-"}, 
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
      test('simple operation with no parentheses - multiply', () => {
          const inputString = '=(5*2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns =  {"left": {"type": "Number", "value": 5},
           "operator": {"type": "Operator", "value": "*"},
            "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
        test('simple operation with no parentheses - divide', () => {
          const inputString = '=(5/2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 5}, 
          "operator": {"type": "Operator", "value": "/"},
           "right": {"type": "Number", "value": 2}, "type": "Operation"};
          expect(expectedAns).toEqual(ast);
        });
  
  
        test('simple operation with no parentheses - less than', () => {
          const inputString = '=(1<2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 1},
           "operator": {"type": "Operator", "value": "<"},
            "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
        test('simple operation with no parentheses - more than', () => {
          const inputString = '=(1>2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 1},
           "operator": {"type": "Operator", "value": ">"},
            "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
        test('simple operation with no parentheses - equal', () => {
          const inputString = '=(1=2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 1},
           "operator": {"type": "Operator", "value": "="},
            "right": {"type": "Number", "value": 2}, 
            "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
        test('simple operation with no parentheses - and', () => {
          const inputString = '=(1&2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns = {"left": {"type": "Number", "value": 1}, 
          "operator": {"type": "Operator", "value": "&"}, 
          "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });
  
        test('simple operation with no parentheses - or', () => {
          const inputString = '=(1|2)';
          const tokens = StringToToken(inputString)
          const ast = ConvertToAST(tokens);
          const expectedAns =  {"left": {"type": "Number", "value": 1},
           "operator": {"type": "Operator", "value": "|"},
            "right": {"type": "Number", "value": 2}, "type": "Operation"};
    
          expect(expectedAns).toEqual(ast);
        });

        test('compound operation with parentheses - binary (ex1)', () => {
            const inputString = '=(5+2)*3';
            const tokens = StringToToken(inputString)
            const ast = ConvertToAST(tokens);
            const expectedAns = {"left": {"left": {"type": "Number", "value": 5},
             "operator": {"type": "Operator", "value": "+"}, 
             "right": {"type": "Number", "value": 2}, "type": "Operation"},
              "operator": {"type": "Operator", "value": "*"},
               "right": {"type": "Number", "value": 3}, 
               "type": "Operation"};

            expect(expectedAns).toEqual(ast);
          });
      
          test('compound operation with parentheses - binary (ex2)', () => {
              const inputString = '=(5-2)*(5+2)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns =  {"left": {"left": {"type": "Number", "value": 5},
               "operator": {"type": "Operator", "value": "-"},
                "right": {"type": "Number", "value": 2},
                 "type": "Operation"},
                  "operator": {"type": "Operator", "value": "*"},
                   "right": {"left": {"type": "Number", "value": 5},
                    "operator": {"type": "Operator", "value": "+"},
                     "right": {"type": "Number", "value": 2}, 
                     "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
          test('compound operation with parentheses - binary (ex3)', () => {
              const inputString = '=(5*2)/(1+2)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns =  {"left": {"left": {"type": "Number", "value": 5},
               "operator": {"type": "Operator", "value": "*"},
                "right": {"type": "Number", "value": 2},
                 "type": "Operation"}, "operator": {"type": "Operator", "value": "/"},
                  "right": {"left": {"type": "Number", "value": 1},
                   "operator": {"type": "Operator", "value": "+"},
                    "right": {"type": "Number", "value": 2},
                     "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
            test('compound operation with parentheses - binary (ex4)', () => {
              const inputString = '=(1+2)/((8-7)*(9*0.5))';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"type": "Number", "value": 1},
               "operator": {"type": "Operator", "value": "+"}, 
               "right": {"type": "Number", "value": 2}, 
               "type": "Operation"},
                "operator": {"type": "Operator", "value": "/"},
                 "right": {"left": {"left": {"type": "Number", "value": 8},
                  "operator": {"type": "Operator", "value": "-"},
                   "right": {"type": "Number", "value": 7},
                    "type": "Operation"},
                     "operator": {"type": "Operator", "value": "*"},
                      "right": {"left": {"type": "Number", "value": 9},
                       "operator": {"type": "Operator", "value": "*"},
                        "right": {"type": "Number", "value": 0.5},
                         "type": "Operation"}, "type": "Operation"},
                          "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
      
            test('compound operation with parentheses - binary (ex5)', () => {
              const inputString = '=(1<2)|(8-2)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"type": "Number", "value": 1},
               "operator": {"type": "Operator", "value": "<"},
                "right": {"type": "Number", "value": 2}, 
                "type": "Operation"},
                 "operator": {"type": "Operator", "value": "|"},
                  "right": {"left": {"type": "Number", "value": 8}, 
                  "operator": {"type": "Operator", "value": "-"},
                   "right": {"type": "Number", "value": 2},
                    "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
            test('compound operation with parentheses - binary (ex6)', () => {
              const inputString = '=(5&2)>0';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"type": "Number", "value": 5},
               "operator": {"type": "Operator", "value": "&"},
                "right": {"type": "Number", "value": 2},
                 "type": "Operation"},
                  "operator": {"type": "Operator", "value": ">"},
                   "right": {"type": "Number", "value": 0}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
            test('compound operation with parentheses - binary (ex7)', () => {
              const inputString = '=(9-8)<(0|1)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"type": "Number", "value": 9},
               "operator": {"type": "Operator", "value": "-"}, 
               "right": {"type": "Number", "value": 8},
                "type": "Operation"}, 
                "operator": {"type": "Operator", "value": "<"},
                 "right": {"left": {"type": "Number", "value": 0},
                  "operator": {"type": "Operator", "value": "|"},
                   "right": {"type": "Number", "value": 1},
                    "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
            test('compound operation with parentheses - binary (ex8)', () => {
              const inputString = '=(1&2)|(8<5)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"type": "Number", "value": 1},
               "operator": {"type": "Operator", "value": "&"},
                "right": {"type": "Number", "value": 2},
                 "type": "Operation"},
                  "operator": {"type": "Operator", "value": "|"},
                   "right": {"left": {"type": "Number", "value": 8},
                    "operator": {"type": "Operator", "value": "<"},
                     "right": {"type": "Number", "value": 5},
                      "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });
      
            test('compound operation with parentheses - binary (ex9)', () => {
              const inputString = '=((1<5)&(8|9))/(7-6)';
              const tokens = StringToToken(inputString)
              const ast = ConvertToAST(tokens);
              const expectedAns = {"left": {"left": {"left": {"type": "Number", "value": 1},
               "operator": {"type": "Operator", "value": "<"},
                "right": {"type": "Number", "value": 5},
                 "type": "Operation"},
                  "operator": {"type": "Operator", "value": "&"},
                   "right": {"left": {"type": "Number", "value": 8},
                    "operator": {"type": "Operator", "value": "|"}, 
                    "right": {"type": "Number", "value": 9}, "type": "Operation"},
                     "type": "Operation"}, 
                     "operator": {"type": "Operator", "value": "/"},
                      "right": {"left": {"type": "Number", "value": 7},
                       "operator": {"type": "Operator", "value": "-"},
                        "right": {"type": "Number", "value": 6}, 
                        "type": "Operation"}, "type": "Operation"};
        
              expect(expectedAns).toEqual(ast);
            });

            test('compound operation with parentheses and functions (ex1)', () => {
                const inputString = '=((5+2)*SUM(1,2))';
                const tokens = StringToToken(inputString)
                const ast = ConvertToAST(tokens);
                const expectedAns = {"left": {"left": {"type": "Number", "value": 5},
                 "operator": {"type": "Operator", "value": "+"},
                  "right": {"type": "Number", "value": 2},
                   "type": "Operation"}, 
                   "operator": {"type": "Operator", "value": "*"},
                    "right": {"args": ["1", "2"], 
                        "name": "SUM", "type": "Function"},
                         "type": "Operation"};
          
                expect(expectedAns).toEqual(ast);
              });
          
              test('compound operation with parentheses and functions (ex2)', () => {
                  const inputString = '=(MIN(5,4) - MAX(1,2))/(8*7)';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = {"left": {"left": {"args": ["5", "4"],
                     "name": "MIN", "type": "Function"},
                      "operator": {"type": "Operator", "value": "-"},
                       "right": {"args": ["1", "2"], "name": "MAX", "type": "Function"},
                        "type": "Operation"},
                         "operator": {"type": "Operator", "value": "/"},
                          "right": {"left": {"type": "Number", "value": 8},
                           "operator": {"type": "Operator", "value": "*"},
                            "right": {"type": "Number", "value": 7},
                             "type": "Operation"}, "type": "Operation"};
            
                  expect(expectedAns).toEqual(ast);
                });
          
              test('compound operation with parentheses and functions (ex3)', () => {
                  const inputString = '=(5*2)/(CONCAT(1,2))';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = {"left": {"left": {"type": "Number", "value": 5},
                   "operator": {"type": "Operator", "value": "*"},
                    "right": {"type": "Number", "value": 2},
                     "type": "Operation"}, "operator": {"type": "Operator", "value": "/"},
                      "right": {"args": ["1", "2"],
                         "name": "CONCAT", "type": "Function"}, "type": "Operation"};
            
                  expect(expectedAns).toEqual(ast);
                });
          
                test('compound operation with parentheses and functions (ex4)', () => {
                  const inputString = '=(AVG(5,10)/(1+2*3))';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = {"left": {"args": ["5", "10"],
                     "name": "AVG", "type": "Function"}, 
                     "operator": {"type": "Operator", "value": "/"},
                      "right": {"left": {"left": {"type": "Number", "value": 1},
                       "operator": {"type": "Operator", "value": "+"},
                        "right": {"type": "Number", "value": 2},
                         "type": "Operation"},
                          "operator": {"type": "Operator", "value": "*"},
                           "right": {"type": "Number", "value": 3},
                            "type": "Operation"}, "type": "Operation"};
            
                  expect(expectedAns).toEqual(ast);
                });
          
          
                test('compound operation with parentheses and functions (ex5)', () => {
                  const inputString = '=(1<2)|(SUM(5,6))';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = {"left": {"left": {"type": "Number", "value": 1},
                   "operator": {"type": "Operator", "value": "<"}, 
                   "right": {"type": "Number", "value": 2}, 
                   "type": "Operation"}, "operator": {"type": "Operator", "value": "|"}, 
                   "right": {"args": ["5", "6"], "name": "SUM", "type": "Function"},
                    "type": "Operation"};
            
                  expect(expectedAns).toEqual(ast);
                });
          
                test('compound operation with parentheses and functions (ex6)', () => {
                  const inputString = '=(9-8)/(IF(1,2))';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = {"left": {"left": {"type": "Number", "value": 9},
                  "operator": {"type": "Operator", "value": "-"},
                   "right": {"type": "Number", "value": 8},
                    "type": "Operation"}, "operator": {"type": "Operator", "value": "/"},
                     "right": {"args": ["1", "2"], 
                       "name": "IF", "type": "Function"}, "type": "Operation"};

                  expect(expectedAns).toEqual(ast);
                });
          
                /**
                
                test('compound operation with parentheses and functions (ex7)', () => {
                  const inputString = '=SUM((1+2), 5, 6)';
                  const tokens = StringToToken(inputString)
                  const ast = ConvertToAST(tokens);
                  const expectedAns = 5;
            
                  expect(expectedAns).toEqual(ast);
                });
                */
                
    });