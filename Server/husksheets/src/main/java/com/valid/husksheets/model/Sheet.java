//class for a sheet
package com.valid.husksheets.model;

<<<<<<< HEAD
import java.util.ArrayList;
=======
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
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
        this.updates = updates;
    }

    public List<Update> getUpdates() {
        return updates;
    }

    /**
     * Getter for the name
     * @return name of the sheet
     */
    public String getName() {
        return name;
    }

    public List<Update> getUpdate() {
        return updates;
    }

    /**
     * Getter for the publisher
     * @return publisher of the sheet
     */
    public String getPublisher() {
        return publisher;
    }

<<<<<<< HEAD

=======
     /**
     * Overrides equals
     * @return true if is equal
     */
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sheet sheet = (Sheet) o;
        return Objects.equals(name, sheet.name) && Objects.equals(publisher, sheet.publisher);
    }

<<<<<<< HEAD
=======
     /**
     * Overriding for the equals method
     */
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
    @Override
    public int hashCode() {
        return Objects.hash(name, publisher);
    }
<<<<<<< HEAD
=======

     /**
     * Gets the last update's id
     * @return the last update id
     */
    public int getLastUpdateId() {
        if (updates.isEmpty()) {
            return -1;
        }
        return updates.get(updates.size() - 1).getId();
    }

     /**
     * Adds an update to this sheet
     */
    public void addUpdate(Update update) {
        updates.add(update);
    }

     /**
     * Checks if this sheet is equal to given sheet
     * Based on the sheets name and publisher
     * @return true is it is equal
     */
    public boolean sheetEquals(Sheet other) {
        return (other.getName().equals(name)) && other.getPublisher().equals(publisher);
    }
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
}