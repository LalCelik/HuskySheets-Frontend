//this class is going to deal with fetching
//from a databse or local files
package com.valid.husksheets.model;

import org.springframework.stereotype.Service;
import com.valid.husksheets.model.Sheet;
import java.util.List;
import com.valid.husksheets.JSON.Argument;

@Service
public class SheetService {
    private int sheetIdCount = 1;

    //default height and width of a sheet
    //can be updated
    private int height = 5;
    private int width = 5;
    //should we hasmap to store?
    //defualt size of sheet?

    public boolean createSheet(String publisher, String sheetName,
     String message) {
        //if it fails put the error message in message
        //takes in publisher str which is the name of the client
        //takes in the sheet str which is the name of the sheet to create

        if (publisher == null || sheetName == null) {
        // If any parameter is null, set the error message and return false
        message = "Publisher or sheetName can't be null";
        return false;
        }
        
        //need to alter the value input to be the data to update
        Sheet newSheet = new Sheet(sheetIdCount, sheetName, publisher, height, width);
        //add to database track any issues
        sheetIdCount++;
        return true;
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