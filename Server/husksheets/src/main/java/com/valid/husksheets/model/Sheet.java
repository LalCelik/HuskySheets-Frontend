//class for a sheet
package com.valid.husksheets.model;

import java.util.Objects;

public class Sheet {
    private int id;
    private String name;
    private String publisher; //the user that created the sheet
    private Cell[][] grid; //2d array of cells

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

    //getters and setters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPublisher() {
        return publisher;
    }

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