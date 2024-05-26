//this class is going to deal with fetching
//from a databse or local files
package com.valid.husksheets.model;
import org.springframework.stereotype.Service;

import com.valid.husksheets.JSON.Argument;

import java.util.List;

@Service
public class SheetService {
    private int sheetIdCount = 1; 
    //should we hasmap to store?
    //defualt size of sheet?

    public boolean createSheet(String publisher, String message, List<Argument> value) {
        //if it fails put the error message in message
        //takes in publisher str which is the name of the client
        //takes in the sheet str which is the name of the sheet to create

        //need to alter the value input to be the data to update
        int height = 5;
        int width = 5;
        Sheet newSheet = new Sheet(sheetIdCount, null, publisher, height, width);

        //add to database track any issues
        sheetIdCount++;
        return false;
    }

    public boolean deleteSheet(String publisher, String sheet, String message, List value) {
        //if it fails put the error message in message
        //takes in publisher str which is the name of the client
        //takes in the sheet str which is the name of the sheet to delete
        
        //need to alter the value input to be the data to update
        return false;
    }
}