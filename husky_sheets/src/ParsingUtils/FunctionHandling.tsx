import React, { useState } from 'react';
import NumberVal from './NumberVal.tsx';
import FormulaParseTS from './AllOperationLogic.tsx';


/**
 * Ownership: Ira
 * @param oper function to use
 * @param listNum list of arguments to apply the function on
 * @returns a number in the form of a NumberVal data structure
 */
function FunctionHandling(oper, listNum) {
    var result = 0;
    var strResult = "";
    var handler = new FormulaParseTS();

    if (oper == "IF") {
        console.log("IF");
    }
    else if (oper === "SUM") {
        result = handler.sum(listNum);
    }
    else if (oper == "MIN") {
        result = handler.min(listNum);
    }
    else if (oper == "MAX") {
        result = handler.max(listNum);
    }
    else if (oper == "AVG") {
        result = handler.avg(listNum);
    }
    else if (oper == "CONCAT") {
        strResult = handler.concat(listNum);
    }
    else if (oper == "DEBUG") {
        console.log("DEBUG");
    }
    if (strResult.length != 0) {
        return new NumberVal(strResult);
    }
    else {
        return new NumberVal(result);
    }
}

export default FunctionHandling;