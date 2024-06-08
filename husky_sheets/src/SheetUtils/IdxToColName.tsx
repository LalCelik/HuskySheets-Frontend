/**
 * Ownership: Ira
 * Convert a number to a letter
 * @param index index to convert to a letter value
 * @returns a letter
 */
export const generateColumnName = (index) => {
    let columnName = '';
    while (index > 0) {
      let remainder = index % 26;
      if (remainder === 0) {
        columnName = 'Z' + columnName;
        index = Math.floor(index / 26) - 1;
      } else {
        columnName = String.fromCharCode(64 + remainder) + columnName;
        index = Math.floor(index / 26);
      }
    }
    return columnName;
  };
