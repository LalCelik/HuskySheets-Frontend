import React from 'react';
import NumberVal from "./NumberVal.tsx";

function OperatorHandling(num1, num2, oper) {
    var result = 0;

    console.log("OPERATOR HANDLING", oper)
    console.log("OPERATOR HANDLING", num1);
    console.log("OPERATOR HANDLING", num2);

    
    if (oper === "+") {
        result = parseFloat(num1) + parseFloat(num2);
        console.log("OPERATOR HANDLING", result);
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