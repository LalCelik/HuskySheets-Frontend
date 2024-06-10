import React from 'react';
import NumberVal from "./NumberVal.tsx";
import FormulaParseTS from './AllOperationLogic.tsx';

/**
 * Ownership: Ira
 * Applies a given operation to given numbers
 * @param num1 first number for formula
 * @param num2 second number for formula
 * @param oper operation to apply
 * @returns a number in the form of a NumberVal data structure
 */

function OperatorHandling(num1, num2, oper) {
    var result = 0;
    var handler = new FormulaParseTS();
    
    if (oper === "+") {
        result = handler.plus(num1, num2);
    }
    else if (oper == "-") {
        result = handler.minus(num1, num2);
    }
    else if (oper == "*") {
        result = handler.multiply(num1, num2);
    }
    else if (oper == "/") {
        result = handler.divide(num1, num2);
    }
    else if (oper == "<") {
        result = handler.lessThan(num1, num2);
    }
    else if (oper == ">") {
        result = handler.greaterThan(num1, num2);
    }
    else if (oper == "=") {
        result = handler.equal(num1, num2);
    }
    else if (oper == "<>") {
        result = handler.notEqual(num1, num2);
    }
    else if (oper == "&") {
        result = handler.and(num1, num2);
    }
    else if (oper == "|") {
        result = handler.or(num1, num2);
    }
    else if (oper == ":") {
        console.log("COLON");
    }
    return new NumberVal(result);
}

export default OperatorHandling;