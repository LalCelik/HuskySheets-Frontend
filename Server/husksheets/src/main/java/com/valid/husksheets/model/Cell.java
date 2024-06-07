//a single cell on a sheet
package com.valid.husksheets.model;

/**
 * Cell representation for Sheet
 * Owner: Lal
 */
public class Cell {
    private String input;

    //constructor

    /**
     * Instantiate an empty Cell
     */
    public Cell () {
        //should i make this empty?
        this.input = null; //all inputs start as empty
    }

    /**
     * Instantiate a Cell with given data
     * @param input data for the cell
     */
    public Cell (String input) {
        this.input = input; //all inputs start as empty
    }

    /**
     * Getter for the input of the cell
     * @return data of the cell
     */
    public String getInput() {
        return input;
    }

    /**
     * Setter for the input of the cell
     * @param newInput for the data we want to put in
     */
    public void setInput(String newInput) {
        this.input = newInput;
    }
}