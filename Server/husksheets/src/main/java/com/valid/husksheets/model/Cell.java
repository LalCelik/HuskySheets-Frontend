package com.valid.husksheets.model;

/**
 * A cell on a sheet.
 * Code was written by Lal
 */
public class Cell {

    /** 
     * The input in a cell
     */
    private String input;

    /**
     * Constructor
     * Initializes a null cell
     */
    public Cell () {
    //all inputs start as empty
        this.input = null;
    }

    /**
     * Constructor with an input value
     *
     * @param input inital input for this cell
     */
    public Cell (String input) {
        this.input = input; //all inputs start as empty
    }

     /**
     * Returns the inputted string in this cell
     *
     * @return the inputted string
     */
    public String getInput() {
        return input;
    }

    /**
     * Sets the input of this string
     *
     * @param input the new input
     */
    public void setInput(String input) {
        this.input = input;
    }
}