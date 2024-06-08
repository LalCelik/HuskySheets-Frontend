
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
//  CONCAT(e1 ... en) coerce all values to strings and concatenate them


  public int if(List stringList) {
    if (stringList.size() == 3) {
      try {
        String first = stringList.get(0);
        String second = stringList.get(1);
        String third = stringList.get(2);
        double a = Double.parseDouble(first);
        if (a == 0) {
          return String third;
        }
        return String second;
      } catch (NumberFormatException nfe) {
        throw new IllegalArgumentException("e1 needs to be a number")
      }
      throw new IllegalArgumentException("Need to enter 3 numbers")
    }
  }

  public double sum(List stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double output = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.append(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot sum non-numbers")
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      output += doubleList.get(j);
    }
    return output;
  }

  public double min(List stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double minimum = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.append(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the minimum of non-numbers")
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      if (doubleList.get(j) < minimum) {
        minimum = doubleList.get(j);
      }
    }
    return minimum;
  }

  public double max(List stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double maximum = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.append(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the maximum of non-numbers")
      }
    }
    for (int j = 0; j < doubleList.size(); j++) {
      if (doubleList.get(j) > maximum) {
        maximum = doubleList.get(j);
      }
    }
    return maximum;
  }

  public double avg(List stringList) {
    List<Double> doubleList = new ArrayList<Double>();
    double average = 0;
    for (int i = 0; i < stringList.size(); i++) {
      try {
        double num = Double.parseDouble(stringList.get(i));
        doubleList.append(num);
      } catch(NumberFormatException nfe) {
        throw new IllegalArgumentException("Cannot find the average of non-numbers")
      }
    }

    if (doubleList.size() == 0) {
      return 0;
    }

    for (int j = 0; j < doubleList.size(); j++) {
      average += doubleList.get(i);
    }
    average = average / doubleList.size();
    return average;
  }

  public String concat()




  public String debug(String e) {
    return e;
  }

}