
public class FormulaParseJava {

  public double plus(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      return a + b;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot add strings");
    }
  }

  public double minus(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      return a - b;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot subtract strings");
    }
  }

  public double multiply(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      return a * b;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot multiply strings");
    }
  }

  public double divide(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (b == 0) {
        throw new IllegalArgumentException("Cannot divide by zero");
      }
      return a / b;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot divide strings");
    }
  }

  public int lessThan(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a < b) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot compare strings using <");
    }
  }

  public int greaterThan(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a > b) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot compare strings using >");
    }
  }

  public int equal(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a == b) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      if (a.equals(b)) {
        return 1;
      }
      return 0;
    }
    throw new IllegalArgumentException("Cannot test for equality")
  }

  public int notEqual(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a != b) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      if (a.equals(b)) {
        return 0;
      }
      return 1;
    }
    throw new IllegalArgumentException("Cannot test for inequality")
  }

  public int and(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a != 0 && b != 0) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot test with and operator")
    }
  }

  public int or(String a, String b) {
    try {
      double a = Double.parseDouble(a);
      double b = Double.parseDouble(b);
      if (a == 1 || b == 1) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot test with or operator")
    }
  }

  // TODO colon operation
//  x : y, if x and y are Ref and x <= y, return the range of cells denoted; otherwise error.

//  IF( e1, e2, e3 ) if e1 is not zero return the value of e2, if it is zero return e3's value; error if e1 is not a number
//  SUM( e1 ... en ) if all values are numbers then return their sum; otherwise error
//  MIN( e1 ... en ) if all values are numbers then return the smallest value; otherwise error
//  MAX( e1 ... en ) if all values are numbers then return the largest value; otherwise error
//  AVG( e1 ... en ) if all values are numbers then return their average; otherwise error
//  CONCAT( e1 ... en ) coerce all values to strings and concatenate them


//  public double debug(double e) {
//    return e;
//  }
//
//  public boolean validExpression(String exp) {
//
//  }

}