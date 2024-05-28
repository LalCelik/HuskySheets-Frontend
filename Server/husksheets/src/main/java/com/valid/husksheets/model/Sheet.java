package com.valid.husksheets.model;

/**
 * Represents a sheet that contains a 2d arrray of cells
 * Written by Lal
 */
public class Sheet {

    // Id of the sheet
    private int id;

    //name of the sheet
    private String name;

    //the grid of cells
    private Cell[][] grid;

    /**
     * Constructs a new Sheet an ID, name, publisher, height, and width.
     *
     * @param id       the Id of the sheet
     * @param name     the name of the sheet
     * @param publisher the user that created the sheet (NEED TO ADD THIS)
     * @param height   rows in grid
     * @param width    columns in grid
     */
    public Sheet(int id, String name, String publisher,int height, int width) {
        this.id = id;
        //this.publisher = publisher;
        this.name = name;
        this.grid = new Cell[height][width];

        for(int y=0; y < height; y++) {
            for(int x=0; x < width; x++) {
                grid[y][x] = new Cell();
            }
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int newId) {
        this.id = newId;
    }

    public String getName() {
        return name;
    }

    /**
     * Returns the cell at the specified row and column in the grid
     *
     * @param row the row of the cell
     * @param col the column of the cell
     * @return the cell at the given row and column
     * @throws IndexOutOfBoundsException out of range exception
     */
    public Cell getCell(int row, int col) {
        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            return grid[row][col];
        } else {
            throw new IndexOutOfBoundsException("Cell index out of range");
        }
    }
}