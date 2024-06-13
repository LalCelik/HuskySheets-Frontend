import getCellsInFormula from "./GetRefs.tsx";
import splitString from "./StringToLetterAndNum.tsx";
import { columnNameToIndex } from "../SheetUtils/ColNameToIdx.tsx";
import FormulaParse from './FormulaParse.tsx';

/**
 * Ownership: Ira
 * Converts a given string with cell refs into their numeric values
 * @param cellNamePattern used to identify cell refs in the string
 * @param dels other valid delimiters like operators
 * @param data actual data from the grid
 * @param refInputString string to parse
 * @returns a new string
 */

function RefToNumberFormula(cellNamePattern, dels, data, refInputString, refList) {
    var newString = "";
    const tokens = getCellsInFormula(refInputString.toUpperCase());
    for (let i = 0; i < tokens.length; i++) {
      if (dels.includes(tokens[i]) || (!isNaN(parseFloat(tokens[i])))) {
        newString = newString.concat(tokens[i]);
      }
      else if (cellNamePattern.test(tokens[i])) {
        var str = splitString(tokens[i]);
        var colIdx = columnNameToIndex(str?.letter);
        var rowIdx = str?.numeric;
        if (data[rowIdx][colIdx].toString() != "") {
            if (refList.includes(`${rowIdx}-${colIdx}`)) {
                return "ERROR";
            }
            if (data[rowIdx][colIdx].toString()[0] === "=") {
                newString = newString.concat(FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, data[rowIdx][colIdx].toString(), `${rowIdx}-${colIdx}`)).value);
            } else {
                newString = newString.concat(data[rowIdx][colIdx].toString());
            }
        } else {
            newString = newString.concat('0');
        }
      }
    }
    return newString;
  }

  export default RefToNumberFormula;