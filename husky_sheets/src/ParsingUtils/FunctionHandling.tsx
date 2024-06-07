import React, { useState } from 'react';
import NumberVal from './NumberVal.tsx';

function FunctionHandling(oper, listNum) {
    var result = 0;

    console.log(listNum);
    if (oper == "IF") {

    }
    else if (oper === "SUM") {
        console.log("HERE");
        for (let i = 0; i < listNum.length; i++) {
            result = parseFloat(result) + parseFloat(listNum[i]);
        }
        console.log("RESULT", result)
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