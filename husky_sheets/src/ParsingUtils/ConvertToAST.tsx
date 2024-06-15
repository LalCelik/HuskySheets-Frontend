import React, { useState } from 'react';
import NumberVal from './NumberVal.tsx';
import OperVal from './OperVal.tsx';
import Function from './Function.tsx';
import Operation from './Operation.tsx';


/**
 * Ownership: Ira
 * @param tokens String parsed into tokens from "StringToToken.tsx"
 * @returns an Abstract Syntax Tree (AST)
 */

function ConvertToAST(tokens) {
    tokens = tokens.slice(1);

    function parseExpression(tokens) {
        // only valid handlers 
        const validVals = ['IF', 'SUM', 'MIN', 'MAX', 'AVG', 'CONCAT', 'DEBUG',
             ':', '<','>', '<>', '&', '=', '+', ',', '*', '-',
            '/', '|', '(', ')'];

        if (tokens.length === 0) {
            return null;
        }

        let lowestPrecedenceIndex = -1;
        let lowestPrecedence = 0;
        let parenthesesCount = 0;
        let funcPresent = [];
        let parens = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (['IF', 'SUM', 'MIN', 'MAX', 'AVG', 'CONCAT', 'DEBUG', 'COPY'].includes(token) && (i === 0)) {
                funcPresent.push(i); 
            }

            if (token === '(') {
                parenthesesCount++;
                parens.push(i);
            } else if (token === ')') {
                if (funcPresent.length === 1) {
                    funcPresent.push(i - 1); 
                }
                parenthesesCount--;
                parens.push(i);
            }


            if (parenthesesCount === 0) {
                if (['+', '-'].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 1;
                    lowestPrecedenceIndex = i;
                } else if (['*', '/'].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 2;
                    lowestPrecedenceIndex = i;
                }
                else if (['<', '>', "<>", "&", "|", ":"].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 3;
                    lowestPrecedenceIndex = i;
                }
                else if (["="].includes(token) && lowestPrecedence >= 0 && i != 0) {
                    lowestPrecedence = 3;
                    lowestPrecedenceIndex = i;
                }

            }
            
        }

        if ((parenthesesCount === 1) || (parenthesesCount === -1)) {
            throw Error("Invalid expression - missing opening or closing parentheses");
        }

      
        if (lowestPrecedence === 0 
            && parenthesesCount === 0 
            && parens.length !== 0
            && funcPresent.length == 0) {
                return parseExpression(tokens.slice(1, tokens.length - 1));

            
        }
        else if (lowestPrecedenceIndex === -1 && parens.length === 0) {
            return new NumberVal(parseFloat(tokens[0]));
        }
  
   
        if (funcPresent.length !== 0 && lowestPrecedenceIndex === -1) {
            console.log(tokens.slice(funcPresent[0], funcPresent[1]+1))
            let args = tokens.slice(funcPresent[0], funcPresent[1]+1);
            // console.log(args);
            let evalArgs = []
            const specialCharacters = [
                "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", 
                ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
            ]; 
            if (args[0] == "DEBUG") {
                parseExpression(tokens.slice(funcPresent[0]+2, funcPresent[1]+1))
            }           
            for (let i = 2; i < args.length; i++) {
                if (args[0] == "COPY" && (!specialCharacters.includes(args[i]))) {
                    console.log(args)
                    evalArgs.push(args[i]);
                }
                else if (!isNaN(parseFloat(args[i]))) {
                    evalArgs.push(args[i]);
                }
            }
            console.log("ARGS", evalArgs);
            return new Function(args[0], evalArgs)
        }

        let operator = new OperVal(tokens[lowestPrecedenceIndex]);
        let leftTokens = tokens.slice(0, lowestPrecedenceIndex);
        let rightTokens = tokens.slice(lowestPrecedenceIndex + 1);   

        return new Operation(
            operator,
            parseExpression(leftTokens),
            parseExpression(rightTokens)
        );
    }
    
    return parseExpression(tokens);
}

export default ConvertToAST;