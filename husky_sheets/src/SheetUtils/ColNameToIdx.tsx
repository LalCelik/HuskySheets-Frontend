/**
 * Ownership: Ira
 * convert column name to a numeric index
 * @param columnName name of column
 * @returns numeric index
 */
export const columnNameToIndex = (columnName) => {
    let index = 0;
    for (let i = 0; i < columnName.length; i++) {
      index = index * 26 + columnName.charCodeAt(i) - 64;
    }
    return index; // Convert to 0-based index
  };

