//class for a sheet
package com.valid.husksheets.model;

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
    public Sheet(int id, String name, String publisher,int height, int width) {
        this.id = id;
        this.publisher = publisher;
        this.name = name;
        this.grid = new Cell[height][width];

        //do I need to initialze this
        for(int y=0; y < height; y++) {
            for(int x=0; x < width; x++) {
                grid[y][x] = new Cell();
            }
        }
    }

    /**
     * Getter for the id
     * @return id of the sheet
     */
    public int getId() {
        return id;
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

    /**
     * Getter for the cell at the specific location
     * @param row row of the cell
     * @param col column of the cell
     * @return Cell at given location
     */
    public Cell getCell(int row, int col) {
        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            return grid[row][col];
        } else {
            throw new IndexOutOfBoundsException("Cell index out of range");
        }
    }

    // public void setCellValue(int row, int col, String value) {
    //     if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    //         grid[row][col].setValue(value);
    //     } else {
    //         throw new IndexOutOfBoundsException("Cell index out of range");
    //     }
    // }

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