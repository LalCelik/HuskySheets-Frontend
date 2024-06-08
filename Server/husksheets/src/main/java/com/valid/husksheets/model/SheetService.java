package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import java.io.IOException;


/**
 * Provides services for sheets.
 * Owner: Lal
 */
@Service
public class SheetService {
    private String path;
    private SheetDao sheetDao;;

    public SheetService(String newPath) {
        path = newPath;
        sheetDao = new SheetDao(newPath);
    }

    public SheetService() {
        path = "/src/main/resources/sheets.json";
        sheetDao  = new SheetDao();
    }

    /**
     * Creates a new sheet with the given publisher and sheet name
     * Owner: Lal
     * @param publisher the publisher of the sheet
     * @param sheetName the name of the sheet
     * @return a string indicating the result of creating a sheet
     */
    public boolean createSheet(String publisher, String sheetName, List<Update> updates) {
        Sheet newSheet = new Sheet(sheetName, publisher, updates);
        try {
        boolean success = sheetDao.saveSheet(newSheet);
        if (success) {
            return true;
        } else {
            return false;
        }
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * Delete the given sheet
     * @param publisher Publisher of the sheet
     * @param sheetName Name of the sheet
     * @return String of the result message
     */
    public boolean deleteSheet(String publisher, String sheetName) {
        Sheet newSheet = new Sheet(sheetName, publisher, new ArrayList<>());
        try {
            if(sheetDao.deleteSheet(newSheet)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.getMessage();
            return false;
        }
    }
}