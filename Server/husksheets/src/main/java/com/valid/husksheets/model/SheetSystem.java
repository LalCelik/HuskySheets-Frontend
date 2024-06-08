package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;

/**
 * SheetSystem that connects to the DB
 * Owner: Lal
 */
public class SheetSystem {
    private List<Sheet> sheets;

    /**
     * Instantiate a new SheetSystem with empty list
     */
    public SheetSystem() {
        this.sheets = new ArrayList<>();
    }

    /**
     * Instantiate a new SheetSystem with the given list
     * @param newSheets List of Sheets that we want to input
     */
    public SheetSystem(List<Sheet> newSheets) {
        this.sheets = newSheets;
    }

    /**
     * Getter for the List of Sheets
     * @return List of Sheets of the in the System
     */
    public List<Sheet> getSheets() {
        return sheets;
    }

    /**
     * Setter for the List of Sheets
     * @param newSheets List of Sheets that we want to set
     */
    public void setSheets(List<Sheet> newSheets) {
        sheets = newSheets;
    }

    /**
     * Add given sheet to the system
     * @param sheet Sheet that we want to add
     */
    public void addSheet(Sheet sheet) {
        sheets.add(sheet);
    }

<<<<<<< HEAD
=======
    public boolean containsSheet(Sheet sheet) {
        boolean equal = false;
        for(Sheet s: sheets) {
            if(s.sheetEquals(sheet)) {
                equal = true;
                break;
            }
        }
        return equal;
    }

>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
    /**
     * Delete the given sheet to the system
     * @param sheet Sheet that we want to delete
     */
    public void deleteSheet(Sheet sheet) {
        sheets.remove(sheet);
    }

<<<<<<< HEAD
=======
    public boolean updateSystem(Sheet sheet, Update update) {
        for(Sheet s: sheets) {
            if(s != null) {
                if(s.sheetEquals(sheet)) {
                    s.addUpdate(update);
                    return true;
                }
            } else {
                return false;
            }
        }
        return false;
    }

>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
}