package com.valid.husksheets;
import com.valid.husksheets.model.User;
import com.valid.husksheets.JSON.Argument;
import com.valid.husksheets.model.UserSystem;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.controller.ApplicationController;
import org.springframework.security.core.Authentication;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;

import com.google.gson.Gson;
import com.valid.husksheets.model.SheetSystem;
import com.valid.husksheets.model.Update;
import com.valid.husksheets.model.Sheet;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
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
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService);
    SheetSystem sheetSystem = new SheetSystem();
    SheetSystemUtils utils = new SheetSystemUtils();

    @Test
    void createSheetTest() {
        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        SheetSystem sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 1);
        assertEquals(sheetSystem.getSheets().get(0).getName(), "Example1");

        Argument argumentExisting = new Argument("user1", "Example1", 0, "");
        Argument argument4 = new Argument("user4", "name", 0, "");

        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "Illegal request: Can't create sheet for different publisher", null);
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password");
      
        //Trying to create a sheet for a different publisher
        assertEquals(appControl.createSheet(authentication, argumentExisting), resultDiffPublisher);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user1", new ArrayList<>())), false);

        //Trying to create a sheet with null publisher
        assertEquals(appControl.createSheet(authentication, new Argument(null, "name", 0, "")), new Result(false, "Publisher or sheetName can't be null", null));
        assertEquals(sheetSystem.containsSheet(new Sheet("name", null, new ArrayList<>())), false);

        //Trying to create a sheet that already exists
        assertEquals(appControl.createSheet(authentication, new Argument("user4", "Example1", 0, "")),
         new Result(false, "Sheet already exists. It couldn't be saved to database", null));
        assertEquals(sheetSystem.containsSheet(new Sheet("name", null, new ArrayList<>())), false);

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
        SheetSystem sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 2);

        Argument argumentExisting = new Argument("user1", "Example1", 0, "");
        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "You don't have access to this request", null);
      
        //Trying to delete a sheet for a different publisher
        assertEquals(appControl.deleteSheet(authentication, argumentExisting), resultDiffPublisher);
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
        
    }
}
