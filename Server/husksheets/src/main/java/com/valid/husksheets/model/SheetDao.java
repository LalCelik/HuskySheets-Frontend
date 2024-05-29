package com.valid.husksheets.model;

import java.io.IOException;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Data functionality for sheets
 * Made by Lal
 * 
 * 
 * Will reorganize these classes ignore the mess
 */
public class SheetDao {
    private final String SHEETS_FILE = "src/main/resources/sheets.json";
    private final Path sheetPath = Path.of(SHEETS_FILE);
    private final SheetSystemUtils systemUtils = new SheetSystemUtils();
    public SheetDao() {
        // SHEETS_FILE = "src/main/resources/sheets.json";
        // sheetPath = Path.of(SHEETS_FILE);
        // systemUtils = new SheetSystemUtils();
    }

    /**
     * Saves a sheet to the JSON file
     *
     * @param sheet the sheet to save
     * @return true if the sheet was successfully saved
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

    private boolean sheetExists(SheetSystem system, Sheet sheet) {
        boolean exists = false;
        for(Sheet s: system.getSheets()) {
            if(s != null) {
                if((s.getName().equals(sheet.getName()))) {
                    exists = true;
                    break;
                }
            }
        }
        return exists;
    }

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

}