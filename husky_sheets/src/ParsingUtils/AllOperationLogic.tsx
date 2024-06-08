
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

  public sum(stringList: string[]): number {
    const doubleList: number[] = [];
    let output: number = 0;
    for (let i = 0; i < stringList.length; i++) {
      try {
        const num: number = parseFloat(stringList[i]);
        doubleList.push(num);
      } catch (error) {
        throw new Error("Cannot sum non-numbers");
      }
    }
    for (let j = 0; j < doubleList.length; j++) {
      output += doubleList[j];
    }
    return output;
  }

  public min(stringList: string[]): number {
    const doubleList: number[] = [];
    let minimum: number = Number.POSITIVE_INFINITY;
    for (let i = 0; i < stringList.length; i++) {
      try {
        const num: number = parseFloat(stringList[i]);
        doubleList.push(num);
      } catch (error) {
        throw new Error("Cannot find the minimum of non-numbers");
      }
    }
    for (let j = 0; j < doubleList.length; j++) {
      if (doubleList[j] < minimum) {
        minimum = doubleList[j];
      }
    }
    return minimum;
  }

  ////
  public max(stringList: string[]): number {
    const doubleList: number[] = [];
    let maximum: number = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < stringList.length; i++) {
      try {
        const num: number = parseFloat(stringList[i]);
        doubleList.push(num);
      } catch (error) {
        throw new Error("Cannot find the maximum of non-numbers");
      }
    }
    for (let j = 0; j < doubleList.length; j++) {
      if (doubleList[j] > maximum) {
        maximum = doubleList[j];
      }
    }
    return maximum;
  }

  public avg(stringList: string[]): number {
    const doubleList: number[] = [];
    let average: number = 0;
    for (let i = 0; i < stringList.length; i++) {
      try {
        const num: number = parseFloat(stringList[i]);
        doubleList.push(num);
      } catch (error) {
        throw new Error("Cannot find the average of non-numbers");
      }
    }

    if (doubleList.length === 0) {
      return 0;
    }

    for (let j = 0; j < doubleList.length; j++) {
      average += doubleList[j];
    }
    average = average / doubleList.length;
    return average;
  }


  public concat(stringList: string[]) {
    var final = ""
    for (let i = 0; i < stringList.length; i++) {
      final = final.concat(stringList[i]);
    }
    return final;
  }


  public debug(String e) {
    return e;
  }

}