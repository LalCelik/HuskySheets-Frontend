import React from 'react';
import NumberVal from "./NumberVal.tsx";

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
    
    if (oper === "+") {
        result = parseFloat(num1) + parseFloat(num2);
    }
    else if (oper == "-") {
        result = parseFloat(num1) - parseFloat(num2);
    }
    else if (oper == "*") {
        result = parseFloat(num1) * parseFloat(num2);
    }
    else if (oper == "/") {
        result = parseFloat(num1) / parseFloat(num2);
    }
    else if (oper == "<") {
        console.log("<")
    }
    else if (oper == ">") {
        console.log(">")
    }
    else if (oper == "=") {
        console.log("=")
    }
    else if (oper == "<>") {
        console.log("<>")
    }
    else if (oper == "&") {
        console.log("&")
    }
    else if (oper == "|") {
        console.log("|")
    }
    else if (oper == ":") {
        console.log(":")
    }
    return new NumberVal(result);
}

export default OperatorHandling;