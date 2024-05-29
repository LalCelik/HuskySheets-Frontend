package com.valid.husksheets.model;
import org.springframework.stereotype.Service;

/**
 * Provides services for sheets.
 */
@Service
public class SheetService {
    private int sheetIdCount = 1;
    private int height = 5;
    private int width = 5;
    private SheetDao sheetDao = new SheetDao();

    /**
     * Creates a new sheet with the given publisher and sheet name
     *
     * @param publisher the publisher of the sheet
     * @param sheetName the name of the sheet
     * @return a string indicating the result of creating a sheet
     */
    public String createSheet(String publisher, String sheetName) {
        String message ="Sheet hasn't been saved";
        Sheet newSheet = new Sheet(sheetIdCount, sheetName, publisher, height, width);
        try {
            boolean creationSuccess = sheetDao.saveSheet(newSheet);
            if(creationSuccess) {
                sheetIdCount++;
                message = "success";
            } else {
                message = "Sheet already exists. It couldn't be saved to database";
            }
        } catch (Exception e) {
            message = "Sheet couldn't be saved: " + e.getMessage();
        }
        return message;
    }

    public String deleteSheet(String publisher, String sheetName) {
        String message ="Sheet hasn't been deleted";
        Sheet newSheet = new Sheet(sheetIdCount, sheetName, publisher, height, width);
        try {
            boolean deleteSuccess = sheetDao.deleteSheet(newSheet);
            if(deleteSuccess) {
                sheetIdCount--;
                message = "success";
            } else {
                message = "Sheet doesn't exist";
            }
        } catch (Exception e) {
            message = "Sheet couldn't be saved: " + e.getMessage();
        }
        return message;
    }
}