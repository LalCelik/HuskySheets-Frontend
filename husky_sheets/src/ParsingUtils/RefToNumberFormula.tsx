import getCellsInFormula from "./GetRefs.tsx";
import splitString from "./StringToLetterAndNum.tsx";
import { columnNameToIndex } from "../SheetUtils/ColNameToIdx.tsx";

/**
 * Ownership: Ira
 * Converts a given string with cell refs into their numeric values
 * @param cellNamePattern used to identify cell refs in the string
 * @param dels other valid delimiters like operators
 * @param data actual data from the grid
 * @param refInputString string to parse
 * @returns a new string
 */

function RefToNumberFormula(cellNamePattern, dels, data, refInputString) {
    var newString = "";
    const tokens = getCellsInFormula(refInputString);
    for (let i = 0; i < tokens.length; i++) {
      if (dels.includes(tokens[i]) || (!isNaN(parseFloat(tokens[i])))) {
        newString = newString.concat(tokens[i]);
      }
      else if (cellNamePattern.test(tokens[i])) {
        var str = splitString(tokens[i]);
        var rowIdx = columnNameToIndex(str?.letter);
        var colIdx = str?.numeric;
        newString = newString.concat(data[colIdx][rowIdx].toString())
      }
    }
    return newString;
  }

  export default RefToNumberFormula;