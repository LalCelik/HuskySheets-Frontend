package husky_sheets.src;

import java.util.List;
import java.util.ArrayList;



public class FormulaParseJava {

  public double plus(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      return numA + numB;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot add strings");
    }
  }

  public double minus(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      return numA - numB;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot subtract strings");
    }
  }

  public double multiply(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      return numA * numB;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot multiply strings");
    }
  }

  public double divide(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numB == 0) {
        throw new IllegalArgumentException("Cannot divide by zero");
      }
      return numA / numB;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot divide strings");
    }
  }

  public int lessThan(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA < numB) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot compare strings using <");
    }
  }

  public int greaterThan(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA > numB) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot compare strings using >");
    }
  }

  public int equal(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA == numB) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      if (a.equals(b)) {
        return 1;
      }
      return 0;
    }
  }

  public int notEqual(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA != numB) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      if (a.equals(b)) {
        return 0;
      }
      return 1;
    }
  }

  public int and(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA != 0 && numB != 0) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot test with and operator");
    }
  }

  public int or(String a, String b) {
    try {
      double numA = Double.parseDouble(a);
      double numB = Double.parseDouble(b);
      if (numA == 1 || numB == 1) {
        return 1;
      }
      return 0;
    } catch (NumberFormatException nfe) {
      throw new IllegalArgumentException("Cannot test with or operator");
    }
  }

  // TODO colon operation
//  x : y, if x and y are Ref and x <= y, return the range of cells denoted; otherwise error.
//  CONCAT(e1 ... en) coerce all values to strings and concatenate them


  public String ifOperater(List<String> stringList) {
    if (stringList.size() == 3) {
      try {
        String first = stringList.get(0);
        String second = stringList.get(1);
        String third = stringList.get(2);
        double a = Double.parseDouble(first);
        if (a == 0) {
          return third;
        }
        return second;
      } catch (NumberFormatException nfe) {
        throw new IllegalArgumentException("e1 needs to be a number");
      }
    }
    throw new IllegalArgumentException("Need to enter 3 numbers");
  }

  public double sum(List<String> stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double output = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.add(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot sum non-numbers");
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      output += doubleList.get(j);
    }
    return output;
  }

  public double min(List<String> stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double minimum = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.add(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the minimum of non-numbers");
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      if (doubleList.get(j) < minimum) {
        minimum = doubleList.get(j);
      }
    }
    return minimum;
  }

  public double max(List<String> stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double maximum = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.add(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the maximum of non-numbers");
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      if (doubleList.get(j) > maximum) {
        maximum = doubleList.get(j);
      }
    }
    return maximum;
  }

  public double avg(List<String> stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double average = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.add(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the average of non-numbers");
      }
    }

    if (doubleList.size() == 0) {
      return 0;
    }

    for (int j = 0; j < doubleList.size(); j++) {
      average += doubleList.get(j);
    }
    average = average / doubleList.size();
    return average;
  }

  public String concat(){
    return "hello";
  }


  public String debug(String e) {
    return e;
  }

  public String copy(String first) {
    return first;
  }

}