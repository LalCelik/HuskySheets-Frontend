import { useStackState } from "rooks";
import React, { useRef } from "react";
import StringToToken from "./StringToToken.tsx";
import OperatorHandling from "./OperatorHandling.tsx"
import FunctionHandling from "./FunctionHandling.tsx";
import ConvertToAST from "./ConvertToAST.tsx";


/**
 * Ownership: Ira
 * Takes in a string containing an expression and calculates the final value
 * @param cellToParse expression to calculate
 * @returns number in the form of a "NumberVal" data structure 
 */
function FormulaParse(cellToParse) {
  const tokens = StringToToken(cellToParse);
  const ast = ConvertToAST(tokens);

  if (cellToParse.includes("ERROR")) {
    throw new Error("Infinite Recursion");
  }

  function calculate(ast) {
    console.log(ast);
      if (ast.type === 'Number') {
          return ast;
      }

      // if an operation is found -> one of "+, -, *, /, etc"
      if (ast.type === 'Operation') {
          const { operator, left, right } = ast;
          // recurse left/right branch until just a number is found
          const leftValue = calculate(left);
          const rightValue = calculate(right);

          return OperatorHandling(leftValue.value, rightValue.value, operator.value);
      }

      // if a function is found -> one of "SUM, MIN, MAX, etc"
      if (ast.type === 'Function') {
        const { name, args } = ast;

      
        return FunctionHandling(name, args);
      }

      throw new Error(`Unknown node type: ${ast.type}`);
  }

  return calculate(ast);
}

export default FormulaParse;