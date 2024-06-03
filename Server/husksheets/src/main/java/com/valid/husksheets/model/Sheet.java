//class for a sheet
package com.valid.husksheets.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Sheet Object to represent Sheet in husksheets
 * Owner: Lal
 */
public class Sheet {
    private final String name;
    private final String publisher; //the user that created the sheet
    private final List<Update> updates; //2d array of cells

    /**
     * Instantiate new Sheet object with given inputs
     * @param id integer id of the cell
     * @param name name of the cell
     * @param publisher String representation of the publisher
     * @param height height of the cell in int
     * @param width width of the cell in int
     */
    public Sheet(String name, String publisher, List<Update> updates) {
        this.publisher = publisher;
        this.name = name;
        this.updates = new ArrayList<>();
    }

    /**
     * Getter for the name
     * @return name of the sheet
     */
    public String getName() {
        return name;
    }

    /**
     * Getter for the publisher
     * @return publisher of the sheet
     */
    public String getPublisher() {
        return publisher;
    }

    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sheet sheet = (Sheet) o;
        return Objects.equals(name, sheet.name) && Objects.equals(publisher, sheet.publisher);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, publisher);
    }
}