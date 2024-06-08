
export default class FormulaParseTS {

  public plus(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      return numA + numB;
    } catch (error) {
      throw new Error("Cannot add strings");
    }
  }

  public minus(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      return numA - numB;
    } catch (error) {
      throw new Error("Cannot subtract strings");
    }
  }

  public multiply(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      return numA * numB;
    } catch (error) {
      throw new Error("Cannot multiply strings");
    }
  }

  public divide(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numB === 0) {
        throw new Error("Cannot divide by zero");
      }
      return numA / numB;
    } catch (error) {
      throw new Error("Cannot divide strings");
    }
  }

  public lessThan(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA < numB) {
        return 1;
      }
      return 0;
    } catch (error) {
      throw new Error("Cannot compare strings using <");
    }
  }

  public greaterThan(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA > numB) {
        return 1;
      }
      return 0;
    } catch (error) {
      throw new Error("Cannot compare strings using >");
    }
  }

  public equal(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA === numB) {
        return 1;
      }
      return 0;
    } catch (error) {
      if (a === b) {
        return 1;
      }
      return 0;
    }
    throw new Error("Cannot test for equality");
  }

  public notEqual(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA !== numB) {
        return 1;
      }
      return 0;
    } catch (error) {
      if (a !== b) {
        return 1;
      }
      return 0;
    }
    throw new Error("Cannot test for inequality");
  }

  public and(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA !== 0 && numB !== 0) {
        return 1;
      }
      return 0;
    } catch (error) {
      throw new Error("Cannot test with and operator");
    }
  }

  public or(a: string, b: string): number {
    try {
      const numA: number = parseFloat(a);
      const numB: number = parseFloat(b);
      if (numA === 1 || numB === 1) {
        return 1;
      }
      return 0;
    } catch (error) {
      throw new Error("Cannot test with or operator");
    }
  }

  // Additional operations and methods can be added here

}