package com.valid.husksheets.model;

import java.io.IOException;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

/**
 * Data functionality for sheets
 * Owner: Lal
 * Will reorganize these classes ignore the mess
 */
@Repository
public class SheetDao {
    private final String SHEETS_FILE; // = "src/main/resources/sheets.json";
    private final SheetSystemUtils systemUtils; // = new SheetSystemUtils();

    /**
     * Instantiate the SheetDao object
     */
    public SheetDao(String path) {
         SHEETS_FILE = path;
         systemUtils = new SheetSystemUtils();
    }

    public SheetDao() {
        SHEETS_FILE =  "src/main/resources/sheets.json";
        systemUtils = new SheetSystemUtils();
    }

    /**
     * Saves a sheet to the JSON file
     * @param sheet the sheet to save
     * @return true if the sheet was successfully saved
     * @throws IOException for any IO errors
     */
    public boolean saveSheet(Sheet sheet) throws IOException {

            if(!Files.exists(Path.of(SHEETS_FILE))) {
                Files.createFile(Path.of(SHEETS_FILE));
                SheetSystem sheetSystem = new SheetSystem();
                sheetSystem.addSheet(sheet);
                systemUtils.writeToFile(sheetSystem, SHEETS_FILE);
                return true;
            } else {
            SheetSystem sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
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
                if ((s.getName().equals(sheet.getName())) &&
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
        if(!Files.exists(Path.of(SHEETS_FILE))) {
            return false;
        } else {
        SheetSystem sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
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
        SheetSystem sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
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

    /**
     * Gets a certain sheet from the sheet system based on the given publisher and name.
     *
     * @param publisher The publisher of the sheet to get
     * @param name The name of the sheet to get
     * @return returns Sheet if found and null if not found.
     */
    public Sheet getSheet(String publisher, String name) {
        SheetSystem sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
        for(Sheet s: sheetSystem.getSheets()) {
            if(s != null) {
                if((s.getPublisher().equals(publisher)) && (s.getName().equals(name))) {
                    return s;
                }
            }
        }
        return null;
    }

    /**
     * Updates the sheet system by adding a new Update to the given sheet
     *
     * @param sheet The sheet to update
     * @param newUpdate The new update to apply to the sheet
     * @return true if the update was successful
     */
    public boolean updateFile(Sheet sheet, Update newUpdate) {
        SheetSystemUtils sheetSystemUtils = new SheetSystemUtils();
        SheetSystem sheetSys = new SheetSystem();
        sheetSys = sheetSystemUtils.readFromFile(SHEETS_FILE);
        if(sheetSys == null) {
            return false;
        }
        if (sheetSys.updateSystem(sheet, newUpdate)) {
            try {
                sheetSystemUtils.writeToFile(sheetSys,SHEETS_FILE);
                return true;
            } catch (IOException e) {
                return false;
            }
        } else {
            return false;
        }
    }
}