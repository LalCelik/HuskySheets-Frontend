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
    // Remove the first element from the tokens array
    tokens = tokens.slice(1);

    // Function to parse the tokens into an expression tree
    function parseExpression(tokens) {
        // List of valid handlers (operators and functions)
        const validVals = ['IF', 'SUM', 'MIN', 'MAX', 'AVG', 'CONCAT', 'DEBUG', 'COPY',
             ':', '<', '>', '<>', '&', '=', '+', ',', '*', '-',
            '/', '|', '(', ')'];

        // If there are no tokens left, return null
        if (tokens.length === 0) {
            return null;
        }

        // Variables to track the lowest precedence operator and its index
        let lowestPrecedenceIndex = -1;
        let lowestPrecedence = 0;
        // Variable to track the count of parentheses
        let parenthesesCount = 0;
        // Array to track if a function is present
        let funcPresent = [];
        // Array to track the positions of parentheses
        let parens = [];

        // Loop through the tokens to find the lowest precedence operator
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            // Check if the token is a function and it's the first token
            if (['IF', 'SUM', 'MIN', 'MAX', 'AVG', 'CONCAT', 'DEBUG', 'COPY'].includes(token) && (i === 0)) {
                funcPresent.push(i); 
            }

            // Handle parentheses
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

            // Update the lowest precedence operator outside parentheses
            if (parenthesesCount === 0) {
                if (['+', '-'].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 1;
                    lowestPrecedenceIndex = i;
                } else if (['*', '/'].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 2;
                    lowestPrecedenceIndex = i;
                } else if (['<', '>', '<>', '&', '|', ':'].includes(token) && lowestPrecedence >= 0) {
                    lowestPrecedence = 3;
                    lowestPrecedenceIndex = i;
                } else if (["="].includes(token) && lowestPrecedence >= 0 && i != 0) {
                    lowestPrecedence = 3;
                    lowestPrecedenceIndex = i;
                }
            }
        }

        // Throw an error if there are unmatched parentheses
        if ((parenthesesCount === 1) || (parenthesesCount === -1)) {
            throw Error("Invalid expression - missing opening or closing parentheses");
        }

        // If the expression is wrapped in parentheses, remove them
        if (lowestPrecedence === 0 
            && parenthesesCount === 0 
            && parens.length !== 0
            && funcPresent.length == 0) {
            return parseExpression(tokens.slice(1, tokens.length - 1));
        }
        // If there are no operators and no parentheses, it's a number
        else if (lowestPrecedenceIndex === -1 && parens.length === 0) {
            return new NumberVal(parseFloat(tokens[0]));
        }

        // Handle functions
        if (funcPresent.length !== 0 && lowestPrecedenceIndex === -1) {
            let args = tokens.slice(funcPresent[0], funcPresent[1] + 1);
            let evalArgs = [];
            const specialCharacters = [
                "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", 
                ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
            ];
            // Handle DEBUG function separately
            if (args[0] == "DEBUG") {
                parseExpression(tokens.slice(funcPresent[0] + 2, funcPresent[1] + 1));
            }
            // Process arguments for COPY function and other numeric arguments
            for (let i = 2; i < args.length; i++) {
                if (args[0] == "COPY" && (!specialCharacters.includes(args[i]))) {
                    console.log(args);
                    evalArgs.push(args[i]);
                } else if (!isNaN(parseFloat(args[i]))) {
                    evalArgs.push(args[i]);
                }
            }
            console.log("ARGS", evalArgs);
            return new Function(args[0], evalArgs);
        }

        // Create an operator node with left and right subtrees
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
