package com.valid.husksheets.model;

import java.io.IOException;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Data functionality for sheets
 * Owner: Lal
 * Will reorganize these classes ignore the mess
 */
public class SheetDao {
    private final String SHEETS_FILE = "src/main/resources/sheets.json";
    private final Path sheetPath = Path.of(SHEETS_FILE);
    private final SheetSystemUtils systemUtils = new SheetSystemUtils();

    /**
     * Instantiate the SheetDao object
     */
    public SheetDao() {
    }

    /**
     * Saves a sheet to the JSON file
     * @param sheet the sheet to save
     * @return true if the sheet was successfully saved
     * @throws IOException for any IO errors
     */
    public boolean saveSheet(Sheet sheet) throws IOException {

            if(!Files.exists(sheetPath)) {
                Files.createFile(sheetPath);
                SheetSystem sheetSystem = new SheetSystem();
                sheetSystem.addSheet(sheet);
                systemUtils.writeToFile(sheetSystem, SHEETS_FILE);
                return true;
            } else {
            SheetSystem sheetSystem = new SheetSystem();
            sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
            if (!sheetExists(sheetSystem, sheet)) {
                sheetSystem.addSheet(sheet);
                systemUtils.writeToFile(sheetSystem, SHEETS_FILE);
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * Checks if the sheet exists in the DB
     * @param system SheetSystem connected to a db
     * @param sheet Sheet to check
     * @return Boolean value of the result
     */
    private boolean sheetExists(SheetSystem system, Sheet sheet) {
        boolean exists = false;
        for(Sheet s: system.getSheets()) {
            if(s != null) {
                if((s.getName().equals(sheet.getName())) &&
                (s.getPublisher().equals(sheet.getPublisher()))) {
                    exists = true;
                    break;
                }
            }
        }
        return exists;
    }

    /**
     * Deletes the given sheet
     * @param sheet Sheet to delete
     * @return Boolean value of success
     * @throws IOException for any IO errors
     */
    public boolean deleteSheet(Sheet sheet) throws IOException {
        if(!Files.exists(sheetPath)) {
            return false;
        } else {
        SheetSystem sheetSystem = new SheetSystem();
        sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
        if (sheetExists(sheetSystem, sheet)) {
            sheetSystem.deleteSheet(sheet);
            systemUtils.writeToFile(sheetSystem, SHEETS_FILE);
            return true;
        } else {
            return false;
        }
    }
}

    /**
     * Get all sheets from the given publisher
     * @param publisher Publisher that we want to search
     * @return List of sheets of the given publisher
     * @throws IOException for any IO errors
     */
    public List<Sheet> getSheets(String publisher) throws IOException {
        SheetSystem sheetSystem = new SheetSystem();
        sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
        return publisherSheets(sheetSystem, publisher);
    }

    /**
     * Pulls List of Sheets from the SheetSystem
     * @param system SheetSystem connected to a DB
     * @param publisher Publisher that we want to search
     * @return List of sheets of the given publisher
     */
    private List<Sheet> publisherSheets(SheetSystem system, String publisher) {
        List<Sheet> list = new ArrayList<>();
        for(Sheet s: system.getSheets()) {
            if(s != null) {
                if((s.getPublisher().equals(publisher))) {
                    list.add(s);
                }
            }
        }
        return list;
    }

    public Sheet getSheet(String publisher, String name) throws IOException {
        SheetSystem sheetSystem = new SheetSystem();
        sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
        for(Sheet s: sheetSystem.getSheets()) {
            if(s != null) {
                if((s.getPublisher().equals(publisher)) && (s.getName().equals(name))) {
                    return s;
                }
            }
        }
        return null;
    }

    public String updateFileUpdate(Sheet sheet, Update newUpdate) {
        String str = "Hasn't updated";
        SheetSystemUtils sheetSystemUtils = new SheetSystemUtils();
        SheetSystem sheetSys = new SheetSystem();
        try {
         sheetSys = sheetSystemUtils.readFromFile(SHEETS_FILE);
        } catch (IOException e) {
            return "Error reading from file";
        }
        if (!sheetSys.updateSystem(sheet, newUpdate)) {
            str = "Issue Updating system";
        } else {
            str = "success";
        }
        try {
        sheetSystemUtils.writeToFile(sheetSys,SHEETS_FILE);
        } catch (IOException e) {
            return "Error reading from file"; 
        }
        return str;
    }
}