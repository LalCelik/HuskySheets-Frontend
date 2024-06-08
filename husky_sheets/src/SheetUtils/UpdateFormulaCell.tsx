import getCellsInFormula from './ParsingUtils/GetRefs.tsx';


function updateFormulaCell(cellNamePattern, data, newVal, cellOfNewVal, formulaCellName, formulaCellCol, formulaCellRow) {
    const tokens = getCellsInFormula(cellsToUpdate[cellOfNewVal][formulaCellName]);
    var convertedExpression = ""
    // loop through expression
    tokens.forEach((token) => {
      // if token isn't a refeence to a cell, append it normally
      if (!cellNamePattern.test(token)) {
        convertedExpression.concat(token.props.children);
      }
      // if the token was a reference to the cell that was just updated
      if (token == cellOfNewVal) {
        convertedExpression.concat(newVal);
      }
      // grab the cell value normally
      else {
        const colIdx = columnNameToIndex(token[0])
        const rowIdx = token[1]
        convertedExpression.concat(data[colIdx][rowIdx].toString());
      }
    })