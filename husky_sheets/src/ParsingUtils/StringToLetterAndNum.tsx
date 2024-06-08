/**
 * Ownership: Ira
 * Splits a cell ref into its letter and numeric counterparts for 
 * convenient indexing.
 * @param input cell ref
 * @returns a map
 */

function splitString(input) {
    const regexPattern = /^([A-Z]+)(\d+)$/i;
    const match = input.match(regexPattern);
    
    if (match) {
        const letterPart = match[1];
        const numericPart = match[2];
        return {
            letter: letterPart.toUpperCase(), 
            numeric: parseInt(numericPart)
        };
    } else {
        return null;
    }
  }

  export default splitString;