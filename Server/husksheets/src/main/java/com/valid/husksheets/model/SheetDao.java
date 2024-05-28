package com.valid.husksheets.model;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Files;
import com.google.gson.Gson;

/**
 * Data functionality for sheets
 * Made by Lal
 */
public class SheetDao {
    private final String SHEETS_FILE = "src/main/resources/sheets.json";
    public SheetDao() {
    }

    /**
     * Saves a sheet to the JSON file
     *
     * @param sheet the sheet to save
     * @return true if the sheet was successfully saved
     */
    public boolean saveSheet(Sheet sheet) {
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

}