//a single cell on a sheet
package com.valid.husksheets.model;

public class Cell {

    //the inputted str in that cell
    private String input;

    //constructor 
    public Cell () {
        //should i make this empty?
        this.input = null; //all inputs start as empty
    }

    public Cell (String input) {
        this.input = input; //all inputs start as empty
    }

    public String getInput() {
        return input;
    }

    public void setInput() {
        this.input = input;
    }
}