import React from 'react';
import { useState } from 'react';

/**
 * Ownership: Ira
 * Parses a given string into tokens based on fixed valid delimiters
 * @param inputString string to parse
 * @returns a set of tokens 
 */

function StringToToken(inputString) {
  const validVals = ['IF', 'SUM', 'MIN', 'MAX', 'AVG', 'CONCAT', 'DEBUG',
    ':', '<','>', '<>', '&', '=', '+', ',', '*', '-',
   '/', '|', '(', ')'];

   for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

      if (!isNaN(parseInt(char)) || char === '.') {
          continue; // Skip to the next character
      }

      if (!validVals.includes(char)) {
          throw Error("Invalid Operator Found"); 
      }
    }

    const pattern = /(\(|\)|\+|-|\*|\/|SUM|MIN|MAX|AVG|DEBUG|IF|CONCAT|\d+)/g;
    const tokens = inputString.match(pattern) || [];
  
    return tokens.map((token, index) => (
      <span key={index}>{token}</span>
    ));
  }

export default StringToToken;

