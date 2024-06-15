import '@testing-library/jest-dom';
import {generateColumnName} from './IdxToColName';

describe('generateColumnName function', () => {
  it('should return correct column names for various indices', () => {

    expect(generateColumnName(1)).toBe('A');
    expect(generateColumnName(26)).toBe('Z');
    expect(generateColumnName(27)).toBe('AA');
    expect(generateColumnName(52)).toBe('AZ');
    expect(generateColumnName(701)).toBe('ZY');


    expect(generateColumnName(0)).toBe('');

    expect(generateColumnName(1000)).toBe('ALL');
    expect(generateColumnName(18278)).toBe('ZZZ');
  });

});
