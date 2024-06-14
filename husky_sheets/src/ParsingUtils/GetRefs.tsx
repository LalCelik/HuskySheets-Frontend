/**
 * Ownership: Ira
 * 
 * Parser specifically geared to strings with cell refs.
 * @param expression expression to parse
 * @returns a set of tokens
 */

function getCellsInFormula(expression) {
    const pattern =  "(IF|SUM|MIN|MAX|AVG|CONCAT|DEBUG|COPY|:|<|>|<>|&|=|\\+|,|\\*|-|\\/|\\||\\(|\\)|[A-Z]+\\d+|\\d+)";

    const regex = new RegExp(pattern, 'g');

    const tokens = expression.match(regex) || [];

    return tokens;
  }

export default getCellsInFormula;