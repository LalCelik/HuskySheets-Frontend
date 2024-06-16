package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * Provides services for sheets.
 * Owner: Lal
 */
@Service
public class SheetService {
    private final SheetDao sheetDao;

    /**
     * Initializes a new sheet system with given path
     * @param newPath Path of the Sheet file
     */
    public SheetService(String newPath) {
        sheetDao = new SheetDao(newPath);
    }

    /**
     * Initializes a new sheet system with default sheets file
     */
    public SheetService() {
        sheetDao  = new SheetDao("src/main/resources/sheets.json");
    }

    /**
     * Creates a new sheet with the given publisher and sheet name
     * Owner: Lal
     * @param publisher the publisher of the sheet
     * @param sheetName the name of the sheet
     * @param updates the updates of the sheet
     * @return a string indicating the result of creating a sheet
     */
    public boolean createSheet(String publisher, String sheetName, List<Update> updates) {
        Sheet newSheet = new Sheet(sheetName, publisher, updates);
        try {
            return sheetDao.saveSheet(newSheet);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Delete the given sheet
     * @param publisher Publisher of the sheet
     * @param sheetName Name of the sheet
     * @return boolean of whether it succeeded
     */
    public boolean deleteSheet(String publisher, String sheetName) {
        Sheet newSheet = new Sheet(sheetName, publisher, new ArrayList<>());
        try {
            return sheetDao.deleteSheet(newSheet);
        } catch (Exception e) {
            return false;
        }
    }
}