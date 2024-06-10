package com.valid.husksheets;
import com.valid.husksheets.JSON.Argument;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.controller.ApplicationController;
import org.springframework.security.core.Authentication;
import org.junit.jupiter.api.Test;
import java.io.IOException;

import com.valid.husksheets.model.SheetSystem;
import com.valid.husksheets.model.STATUS;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationControllerTest {
    private String path = "src/main/resources/sheetsTest.json";
    private SheetDao sheetDao = new SheetDao(path);
    private SheetService sheetService = new SheetService(path);
    private ApplicationController appControl = new ApplicationController(sheetDao, sheetService);
    private SheetSystem sheetSystem = new SheetSystem();
    private SheetSystemUtils utils = new SheetSystemUtils();


    private Argument existingSheetArg = new Argument("user1", "Example1", 0, "");

    @Test
    void createSheetTest() {
        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 1);
        assertEquals(sheetSystem.getSheets().get(0).getName(), "Example1");

        //Argument existingSheetArg = new Argument("user1", "Example1", 0, "");
        Argument argument4 = new Argument("user4", "name", 0, "");

        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "Illegal request: Can't create sheet for different publisher", null);
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password");
      
        //Add more tests here:
        //Trying to create a sheet for a different publisher
        assertEquals(appControl.createSheet(authentication, existingSheetArg), resultDiffPublisher);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), false);

        //Succesfully creating a sheet
        assertEquals(appControl.createSheet(authentication, argument4), resultSuccess);
        sheetSystem = utils.readFromFile(path);

        assertEquals(sheetSystem.getSheets().size(), 2);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), true);

        //reset the testing JSON
        try {
        utils.writeToFile(sheetSystemOrginal, path);
        } catch (IOException e) {
          throw new RuntimeException(e.getMessage());
        }
    }

    @Test
    void deleteSheetTest() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password");
        Argument argument4 = new Argument("user4", "name", 0, "");
        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        //Succesfully creating a sheet
        appControl.createSheet(authentication, argument4);
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 2);

        //Argument argumentExisting = new Argument("user1", "Example1", 0, "");
        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "You don't have access to this request", null);
      
        //Trying to delete a sheet for a different publisher
        assertEquals(appControl.deleteSheet(authentication, existingSheetArg), resultDiffPublisher);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user1", new ArrayList<>())), false);

        //Trying to delete a sheet with null publisher
        assertEquals(appControl.deleteSheet(authentication, new Argument(null, "name", 0, "")), new Result(false, "Publisher or sheetName can't be null", null));
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "null", new ArrayList<>())), false);
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 2);

        //Trying to delete a sheet that doesn't exist
        assertEquals(appControl.deleteSheet(authentication, new Argument("user4", "DNE", 0, "")),
        new Result(false, "Couldn't be deleted", null));
        assertEquals(sheetSystem.getSheets().size(), 2);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), true);

        //Successfully deleting a sheet
        assertEquals(appControl.deleteSheet(authentication, argument4),
        new Result(true, "Sheet has been deleted", null));
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(),1);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), false);
    }

    @Test
    void getSheetsTest() {
        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        //Authenticate with user1 for this test
        Authentication authentication = new UsernamePasswordAuthenticationToken("user1", "password");
        Argument argument4 = new Argument("user1", "Sheet1", 0, "");
        //Creating a sheet as an example
        appControl.createSheet(authentication, argument4);
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 2);

        List<Argument> listArgs = new ArrayList<>();
        Argument ExArg = new Argument("user1", "Example1", null, null);
        Argument newArg = new Argument("user1", "Sheet1", null, null);
        listArgs.add(ExArg);
        listArgs.add(newArg);

        //User isn't in system
        assertEquals(appControl.getSheets(new Argument("user555", "SheetName", 0, "")), new Result(false,
        "This Publisher doesn't have any sheets in system or doesn't exist", null));
        
        //succesfully 
        assertEquals(appControl.getSheets(new Argument("user1", "name", 0, "")), new Result(true,
         "Outputting sheets in the system:", listArgs));

        //reset the testing JSON
        try {
        utils.writeToFile(sheetSystemOrginal, path);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Test
    void getUpdatesForPublishedTest() {
    SheetSystem sheetSystemOrginal = utils.readFromFile(path);

    Authentication authentication = new UsernamePasswordAuthenticationToken("user2", "password");
    Authentication authentication1 = new UsernamePasswordAuthenticationToken("user1", "password");
    //Argument sheet0 = new Argument("user1", "Example1", 0, "");
    Argument sheet1 = new Argument("user1", "Example1", 1, "");
    Argument sheet = new Argument("user1", "Example1", 1, "UPDATE ADDED ");
    
    //No sheet found
    assertEquals(appControl.getUpdatesForPublished(authentication, existingSheetArg),
     new Result(false, "You don't have access to this request", null));
    
    List<Argument> list = new ArrayList<>();
    list.add(sheet);
    List<Argument> listNone = new ArrayList<>();
    listNone.add(sheet1);

    Result noUpdate = new Result(true, "Getting updates: No updates found", listNone);
    Result update = new Result(true, "Getting updates", list);

    //No Updates found
    assertEquals(appControl.getUpdatesForPublished(authentication1, sheet), noUpdate);

    Argument sheetUpdate = new Argument("user1", "Example1", 1, "UPDATE ADDED ");
    appControl.updateSubscription(authentication, sheetUpdate);

    //success
    assertEquals(appControl.getUpdatesForPublished(authentication1, existingSheetArg), update);

    //reset the testing JSON
    try {
        utils.writeToFile(sheetSystemOrginal, path);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Test
    void updatePublishedTest() {
        //Argument argument = new Argument("user1",  "Example1",0,  "");
        Argument argument2 = new Argument("user2",  "Example2",0,  "");
        Argument argument3 = new Argument("user1",  "Example2",0,  "");
        Authentication authentication = new UsernamePasswordAuthenticationToken("user1", "password");

        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        sheetSystem = sheetSystemOrginal;
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        // No access to sheet
        assertEquals(appControl.updatePublished(argument2, authentication),
         new Result(false, "You don't have access to this request", null));
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        // No such sheet
        assertEquals(appControl.updatePublished(argument3, authentication),
         new Result(false, "There is no such sheet, couldn't update", null));
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        //success
        assertEquals(appControl.updatePublished(existingSheetArg, authentication),
         new Result(true, "Update published", null));
         sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getAllUpdates().size(), 2);
        assertEquals(sheetSystem.getAllUpdates().get(1).getStatus(), STATUS.PUBLISHED);

        //reset the testing JSON
        try {
            utils.writeToFile(sheetSystemOrginal, path);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
    }

    @Test
    void updateSubscriptionTest() {

        Argument argument = new Argument("user2",  "Example1",0,  "");
        Argument argument2 = new Argument("user1",  "Example1",0,  "");
        Argument argument3 = new Argument("user1",  "Example2",0,  "");
        Authentication authentication = new UsernamePasswordAuthenticationToken("user2", "password");

        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        sheetSystem = sheetSystemOrginal;
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        // No access to sheet
        assertEquals(appControl.updateSubscription(authentication, argument),
        new Result(false, "You don't have access to this request. You are the publisher.", null));
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        // No such sheet
        assertEquals(appControl.updateSubscription(authentication, argument3),
         new Result(false, "There is no such sheet, couldn't update", null));
        assertEquals(sheetSystem.getAllUpdates().size(), 1);

        //success
        assertEquals(appControl.updateSubscription(authentication, argument2),
         new Result(true, "Update published", null));
        
        sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getAllUpdates().size(), 2);
        assertEquals(sheetSystem.getAllUpdates().get(1).getStatus(), STATUS.REQUESTED);

        //reset the testing JSON
        try {
            utils.writeToFile(sheetSystemOrginal, path);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
    }
}
