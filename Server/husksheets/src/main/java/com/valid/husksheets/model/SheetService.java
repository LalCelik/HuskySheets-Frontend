//this class is going to deal with fetching
//from a databse or local files
package com.valid.husksheets.model;

import org.springframework.stereotype.Service;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.model.SheetDao;
import java.util.List;
import com.valid.husksheets.JSON.Argument;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SheetService {
    private int sheetIdCount = 1;

    //default height and width of a sheet
    //can be updated
    private int height = 5;
    private int width = 5;

    // ObjectMapper for JSON serialization/deserialization
    private ObjectMapper objectMapper = new ObjectMapper();
    private SheetDao sheetDao = new SheetDao(objectMapper);
    //should we hasmap to store?
    //defualt size of sheet?

    public String createSheetSer(String publisher, String sheetName) {
        //if it fails put the error message in message
        //takes in publisher str which is the name of the client
        //takes in the sheet str which is the name of the sheet to create


        //this message feild isn't being updates correctly need to keep track of it
        //this didn't work
        String message ="No message recieved";
        //need to alter the value input to be the data to update
        Sheet newSheet = new Sheet(sheetIdCount, sheetName, publisher, height, width);
        //add to database track any issues

        try {
            boolean creationSuccess = sheetDao.saveSheet(newSheet);
            if(creationSuccess) {
                sheetIdCount++;
                message = "success";
            } else {
                message = "Sheet couldn't be saved";
            }
        } catch (Exception e) {
            message = "Sheet couldn't be saved: " + e.getMessage();
        }

        return message;

        // return "success";
    }

    public boolean deleteSheet(String publisher, String sheetName, String message) {
        if (publisher == null || sheetName == null) {
            // If any parameter is null, set the error message and return false
            message = "Publisher or sheetName can't be null";
            return false;
        }

        //do action to delete sheet
        return true;
    }
}