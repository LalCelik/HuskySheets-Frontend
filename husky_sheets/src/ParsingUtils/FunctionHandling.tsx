import React, { useState } from 'react';
import NumberVal from './NumberVal.tsx';

/**
 * Ownership: Ira
 * @param oper function to use
 * @param listNum list of arguments to apply the function on
 * @returns a number in the form of a NumberVal data structure
 */
function FunctionHandling(oper, listNum) {
    var result = 0;

    console.log(listNum);
    if (oper == "IF") {

    }
    else if (oper === "SUM") {
        for (let i = 0; i < listNum.length; i++) {
            result = parseFloat(result) + parseFloat(listNum[i]);
        }
    }
    else if (oper == "MIN") {

    }
    else if (oper == "MAX") {

    }
    else if (oper == "AVG") {

    }
    else if (oper == "CONCAT") {

    }
    else if (oper == "DEBUG") {

    }
    return new NumberVal(result);
    
}

export default FunctionHandling;