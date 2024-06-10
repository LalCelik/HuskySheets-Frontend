import React from 'react';
import { useState } from 'react';

/**
 * Ownership: Ira
 * Parses a given string into tokens based on fixed valid delimiters
 * @param inputString string to parse
 * @returns a set of tokens 
 */

function StringToToken(inputString) {
  const pattern = /(\(|\)|\+|,|-|\*|\/|=|>|<|<>|&|:|\||\b(IF|SUM|MIN|MAX|AVG|CONCAT|DEBUG)\b|\d+(\.\d+)?|\w+)/g;

  const tokens = inputString.match(pattern) || [];

  return tokens;
  }

export default StringToToken;

