package com.valid.husksheets.model;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Files;
import com.google.gson.Gson;
import java.util.List;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;

/**
 * Data functionality for sheets
 * Made by Lal
 * 
 * 
 * Will reorganize these classes ignore the mess
 */
public class SheetDao {
    private final String SHEETS_FILE = "src/main/resources/sheets.json";
    private final SheetSystemUtils systemUtils = new SheetSystemUtils();
    public SheetDao() {
    }

    /**
     * Saves a sheet to the JSON file
     *
     * @param sheet the sheet to save
     * @return true if the sheet was successfully saved
     */
    public boolean saveSheetOld(Sheet sheet)  {
        try {
            SheetSystem sheetSystem = new SheetSystem(sheet);
            if (!sheetSystem.sheetExists(sheet)) {
                sheetSystem.addSheet(sheet);
            } else {
                return false;
            }
            String jsonOutput = new Gson().toJson(sheetSystem);
            Files.writeString(Path.of(SHEETS_FILE), jsonOutput);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean saveSheet(Sheet sheet) throws IOException {
            SheetSystem sheetSystem = new SheetSystem();
            sheetSystem = systemUtils.readFromFile(SHEETS_FILE);
            if (!sheetSystem.sheetExists(sheet)) {
                sheetSystem.addSheet(sheet);
                systemUtils.writeToFile(sheetSystem, SHEETS_FILE);
                return true;
            } else {
                return false;
            }
    }

    // public void writeToFile(SheetSystem sheetSystem) {
    //     try {
    //         String jsonOutput = new Gson().toJson(sheetSystem);
    //         Files.writeString(Path.of(SHEETS_FILE), jsonOutput);
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
    // }

}